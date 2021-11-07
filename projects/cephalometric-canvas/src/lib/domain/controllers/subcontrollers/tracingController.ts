import { LocalRepositoryImpl } from '../../../infra/repositories/localStorage.repository';
import { default as AnatomicalTracingImpl } from '../../../infra/views/anatomicalTracing';
import * as deafultBezierCurves from '../../models/bezier_curves.json';
import {
    IBezierCurves,
    ICurvePointLocation,
    IPointBidimensional,
} from '../../models/interfaces';
import { ILocalRepository } from '../../util/interfaces/repositories';
import { ICanvasDraw } from '../../util/interfaces/views/canvasDraw';
import { ITracingDraw } from '../../util/interfaces/views/tracingDraw';

class TracingController {
    public canvasOdontoradiosis: ICanvasDraw;
    public anatomicalTracing: ITracingDraw;
    public bezierPoints: IBezierCurves;
    public currentBoxPoints: number[];
    private localRepository: ILocalRepository;

    /**
     * Constructor
     * @param {ICanvasDraw} canvasOdontoradiosis
     */
    constructor(canvasOdontoradiosis: ICanvasDraw) {
        this.canvasOdontoradiosis = canvasOdontoradiosis;
        this.anatomicalTracing = new AnatomicalTracingImpl(
            canvasOdontoradiosis
        );
        this.bezierPoints = deafultBezierCurves;
        this.currentBoxPoints = [0, 0, 0, 0];
        this.localRepository = new LocalRepositoryImpl();
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
        this.localRepository.set('bezier_curves', curvesJson);
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
        for (let element of this.bezierPoints[curveName]) {
            for (let position = 0; position < element.length; position++) {
                const point = element[position];
                if (position % 2 !== 0) {
                    minY = Math.min(minY, point);
                    maxY = Math.max(maxY, point);
                } else {
                    minX = Math.min(minX, point);
                    maxX = Math.max(maxX, point);
                }
            }
        }
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
        const minPoint: IPointBidimensional = {
            x: points[0],
            y: points[1],
        };
        const maxPoint: IPointBidimensional = {
            x: points[2],
            y: points[3],
        };

        const width = maxPoint.x - minPoint.x,
            height = maxPoint.y - minPoint.y;
        return [
            minPoint.x - borderSize,
            minPoint.y - borderSize,
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
        const pointRadius = this.canvasOdontoradiosis.scales.pointRadius;
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
     * @param {IPointBidimensional} relativeMouse
     * @param {string} curveName
     * @returns {array} [element, subindex, subindex + 1]
     */
    verifyMouseOnCurvePoint(
        relativeMouse: IPointBidimensional,
        curveName: string
    ): ICurvePointLocation | null {
        const pointRadius = this.canvasOdontoradiosis.scales.pointRadius;
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
        _recalculate: boolean = false
    ): void {
        if (this.bezierPoints[curveName] != null) {
            for (let points of this.bezierPoints[curveName]) {
                for (let position = 0; position < points.length; position++) {
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
                }
            }
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
