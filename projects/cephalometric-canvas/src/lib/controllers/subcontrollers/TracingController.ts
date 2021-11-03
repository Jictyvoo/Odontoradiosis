import * as deafultBezierCurves from '../../models/bezier_curves.json';
import {
    IBezierCurves,
    ICurvePointLocation,
    IPointBidimensional,
} from '../../models/Interfaces';
import { default as AnatomicalTracing } from '../../views/AnatomicalTracing';
import { default as CanvasOdontoradiosis } from '../../views/Canvas';

class TracingController {
    public canvasOdontoradiosis: CanvasOdontoradiosis;
    public anatomicalTracing: AnatomicalTracing;
    public bezierPoints: IBezierCurves;
    public currentBoxPoints: number[];

    /**
     * Constructor
     * @param {CanvasOdontoradiosis} canvasOdontoradiosis
     */
    constructor(canvasOdontoradiosis: CanvasOdontoradiosis) {
        this.canvasOdontoradiosis = canvasOdontoradiosis;
        this.anatomicalTracing = new AnatomicalTracing(canvasOdontoradiosis);
        this.bezierPoints = deafultBezierCurves;
        this.currentBoxPoints = [0, 0, 0, 0];
    }

    /**
     * Bezier points setter
     * @param {IBezierCurves} points
     */
    setBezierPoints(points: IBezierCurves = deafultBezierCurves): void {
        this.bezierPoints = points;
        this.anatomicalTracing.setAllCurves(points);
    }

    /**
     * Verify if curve exists
     * @param {string} curveId
     * @returns {boolean}
     */
    curveExists(curveId: string = ''): boolean {
        return this.bezierPoints[curveId] != null;
    }

    /**
     * Verify if curve exists and returns it or null
     * @param {string} curveId
     */
    getCurve(curveId: string = ''): number[][] | null {
        if (this.curveExists(curveId)) {
            return this.bezierPoints[curveId];
        }
        return null;
    }

    /**
     * Save all bezier curves in a hidden form
     */
    saveBezierCurve() {
        const curvesJson = JSON.stringify(this.bezierPoints);
        const hiddenForm = document.getElementById(
            'bezier_curves'
        ) as HTMLInputElement;
        hiddenForm.setAttribute('value', curvesJson);
    }

    /**
     * Returns all points in a curve box
     * @param {string} curveName
     * @param {boolean} recalculate
     */
    getBoxPoints(curveName: string, recalculate: boolean) {
        if (this.currentBoxPoints != null && !recalculate) {
            return this.currentBoxPoints;
        }
        let minX = Number.POSITIVE_INFINITY,
            minY = Number.POSITIVE_INFINITY;
        let maxX = Number.NEGATIVE_INFINITY,
            maxY = Number.NEGATIVE_INFINITY;
        this.bezierPoints[curveName].forEach(function (
            element: number[],
            _index: number,
            _array: number[][]
        ) {
            element.forEach(function (
                point: number,
                position: number,
                _arr: number[]
            ) {
                if (position % 2 !== 0) {
                    minY = Math.min(minY, point);
                    maxY = Math.max(maxY, point);
                } else {
                    minX = Math.min(minX, point);
                    maxX = Math.max(maxX, point);
                }
            });
        });
        this.currentBoxPoints = [minX, minY, maxX, maxY];
        return this.currentBoxPoints;
    }

    /**
     * Returns an array with box dimensions of a specific curve
     * @param {string} curveName
     * @param {number} borderSize
     * @param {boolean} recalculate
     */
    getBoxDimensions(
        curveName: string,
        borderSize: number = 20,
        recalculate: boolean = false
    ): number[] {
        const points = this.getBoxPoints(curveName, recalculate);
        const minX = points[0],
            minY = points[1];
        const maxX = points[2],
            maxY = points[3];
        const width = maxX - minX,
            height = maxY - minY;
        return [
            minX - borderSize,
            minY - borderSize,
            width + borderSize * 2,
            height + borderSize * 2,
        ];
    }

    /**
     * Call AnatomicalTracing method to draw bezierCurves
     */
    drawAllCurves(): void {
        this.anatomicalTracing.drawAllCurves();
        this.saveBezierCurve();
    }

    /**
     * Draw Curve box
     * @param {string} currentCurve
     * @param {boolean} recalculate
     */
    drawCurveBox(currentCurve: string, recalculate: boolean): void {
        this.anatomicalTracing.drawCurveBox(
            currentCurve,
            this.getBoxDimensions(currentCurve, 20, recalculate)
        );
    }

    /**
     * Draw all control points in a given curve
     * @param {string} curveName
     */
    drawPointCircle(curveName: string): void {
        this.anatomicalTracing.drawPointCircle(curveName);
    }

    /**
     * Returns a object containing a boolean if is on a boxVertex, and it index
     * @param {*} relativeMouse
     * @param {string} curveName
     * @returns {object} { isOn: isOn, index: vertexIndex }
     */
    verifyMouseOnBoxVertex(
        relativeMouse: IPointBidimensional,
        curveName: string
    ): { isOn: boolean; index: number } {
        const boxVertex = this.getBoxDimensions(curveName, 20, true);
        let isOn = false;
        let vertexIndex = 0;
        const pointRadius = this.canvasOdontoradiosis.scaleManager.pointRadius;
        [
            [boxVertex[0], boxVertex[1]],
            [boxVertex[0], boxVertex[1] + boxVertex[3]],
            [boxVertex[0] + boxVertex[2], boxVertex[1]],
            [boxVertex[0] + boxVertex[2], boxVertex[1] + boxVertex[3]],
        ].forEach(function (element, index, _array) {
            if (
                relativeMouse.x >= element[0] - pointRadius &&
                relativeMouse.x <= element[0] + pointRadius &&
                relativeMouse.y >= element[1] - pointRadius &&
                relativeMouse.y <= element[1] + pointRadius
            ) {
                isOn = true;
                vertexIndex = index;
            }
        });
        return { isOn: isOn, index: vertexIndex };
    }

    /**
     * Returns the current position of the mouse if it is on a curve point
     * @param {*} relativeMouse
     * @param {string} curveName
     * @returns {array} [element, subindex, subindex + 1]
     */
    verifyMouseOnCurvePoint(
        relativeMouse: IPointBidimensional,
        curveName: string
    ): ICurvePointLocation | null {
        const pointRadius = this.canvasOdontoradiosis.scaleManager.pointRadius;
        for (
            let index = 0;
            index < this.bezierPoints[curveName].length;
            index++
        ) {
            const element = this.bezierPoints[curveName][index];
            for (let subindex = 0; subindex < element.length; subindex += 2) {
                if (
                    relativeMouse.x >= element[subindex] - pointRadius &&
                    relativeMouse.x <= element[subindex] + pointRadius &&
                    relativeMouse.y >= element[subindex + 1] - pointRadius &&
                    relativeMouse.y <= element[subindex + 1] + pointRadius
                ) {
                    return [element, subindex, subindex + 1];
                }
            }
        }
        return null;
    }

    /**
     * Iterate all curves and changes it value
     * @param {string} curveName
     * @param {function} callback_1
     * @param {funtion} callback_2
     * @param {boolean} _recalculate
     */
    runPointsAndChange(
        curveName: string,
        callback_1: any,
        callback_2: any,
        _recalculate: boolean
    ): void {
        if (this.bezierPoints[curveName] != null) {
            this.bezierPoints[curveName].forEach(function (
                points: number[],
                _index: number,
                _array: number[][]
            ) {
                points.forEach(function (
                    _point: number,
                    position: number,
                    _arr: number[]
                ) {
                    if (position % 2 === 0) {
                        points[position] = callback_1(
                            points[position],
                            points[position + 1]
                        );
                    } else {
                        points[position] = callback_2(
                            points[position],
                            points[position - 1]
                        );
                    }
                });
            });
            //this.anatomicalTracing.setAllCurves(this.bezierPoints);
        }
    }

    /**
     * Translate a curve
     * @param {string} curveName
     * @param {float} amountX
     * @param {float} amountY
     */
    translateBezier(curveName: string, amountX: number, amountY: number): void {
        this.currentBoxPoints[0] -= amountX;
        this.currentBoxPoints[1] -= amountY;
        this.currentBoxPoints[2] -= amountX;
        this.currentBoxPoints[3] -= amountY;
        this.runPointsAndChange(
            curveName,
            function (pointX: number) {
                return pointX - amountX;
            },
            function (pointY: number) {
                return pointY - amountY;
            },
            true
        );
    }

    /**
     * Rotate a bezier curve
     * @param {string} curveName
     * @param {float} angle
     */
    rotateBezier(curveName: string, angle: number): void {
        this.runPointsAndChange(
            curveName,
            function (pointX: number, pointY: number) {
                return pointX * Math.cos(angle) - pointY * Math.sin(angle);
            },
            function (pointY: number, pointX: number) {
                return pointX * Math.sin(angle) + pointY * Math.cos(angle);
            },
            true
        );
    }

    /**
     * Reescale all bezier curves, based on scales given
     * @param {string} curveName
     * @param {float} scaleX
     * @param {float} scaleY
     */
    rescaleBezier(curveName: string, scaleX: number, scaleY: number): void {
        this.runPointsAndChange(
            curveName,
            function (pointX: number) {
                return pointX * scaleX;
            },
            function (pointY: number) {
                return pointY * scaleY;
            },
            true
        );
    }
}

export default TracingController;
