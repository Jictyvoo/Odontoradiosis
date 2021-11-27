import { LocalRepositoryImpl } from '../../../infra/repositories/localStorage.repository';
import { default as AnatomicalTracingImpl } from '../../../infra/views/anatomicalTracing';
import deafultBezierCurves from '../../models/bezier_curves.json';
import { AnatomicalTracingCurve } from '../../models/tracingCurve';
import { Cloneable } from '../../util/deepClone';
import {
    IBezierCurves,
    ICurvePointLocation,
    ITracingList,
} from '../../util/interfaces/curveManipulation';
import { IPointBidimensional } from '../../util/interfaces/interfaces';
import { ILocalRepository } from '../../util/interfaces/repositories';
import { ICanvasDraw } from '../../util/interfaces/views/canvasDraw';
import { ITracingDraw } from '../../util/interfaces/views/tracingDraw';

class TracingController {
    public canvasOdontoradiosis: ICanvasDraw;
    public anatomicalTracing: ITracingDraw;
    public bezierPoints: ITracingList;
    public currentBoxPoints: number[];
    private localRepository: ILocalRepository;

    /**
     * Constructor
     * @param {ICanvasDraw} canvasOdontoradiosis
     */
    constructor(canvasOdontoradiosis: ICanvasDraw) {
        this.canvasOdontoradiosis = canvasOdontoradiosis;

        // Create AnatomicalTracing and set this curvePoints
        this.anatomicalTracing = new AnatomicalTracingImpl(
            canvasOdontoradiosis
        );
        this.localRepository = new LocalRepositoryImpl();

        let bezierCurves = Cloneable.deepCopy(deafultBezierCurves);
        const storedCurves = this.localRepository.get<string>('bezier_curves');
        if (storedCurves) {
            bezierCurves = JSON.parse(storedCurves);
        }
        this.bezierPoints =
            TracingController.bezierPoints2TracingList(bezierCurves);

        this.currentBoxPoints = [0, 0, 0, 0];
    }

    protected static bezierPoints2TracingList(
        bezierPoints: IBezierCurves
    ): ITracingList {
        const tracingList: ITracingList = {};

        for (const entry of Object.entries(bezierPoints)) {
            tracingList[entry[0]] = new AnatomicalTracingCurve(
                entry[0],
                entry[1]
            );
        }

        return tracingList;
    }

    protected static tracingList2BezierPoints(
        tracingList: ITracingList
    ): IBezierCurves {
        const bezierPoints: IBezierCurves = {};
        for (const entry of Object.entries(tracingList)) {
            bezierPoints[entry[0]] = entry[1].points;
        }
        return bezierPoints;
    }

    /**
     * Bezier points setter
     * @param {IBezierCurves} points
     */
    public setBezierPoints(
        points: IBezierCurves = Cloneable.deepCopy(deafultBezierCurves)
    ): void {
        this.bezierPoints = TracingController.bezierPoints2TracingList(points);
    }

    /**
     * Verify if curve exists
     * @param {string} curveId
     * @returns {boolean}
     */
    public curveExists(curveId: string = ''): boolean {
        const allCurves = Object.keys(this.bezierPoints);
        return allCurves.includes(curveId);
    }

    public get curvePoints(): IBezierCurves {
        return TracingController.tracingList2BezierPoints(this.bezierPoints);
    }

    /**
     * Verify if curve exists and returns it or null
     * @param {string} curveId
     */
    public getCurvePoints(curveId: string = ''): number[][] | null {
        if (this.curveExists(curveId)) {
            return this.bezierPoints[curveId].points;
        }
        return null;
    }

    private getTracing(curveName: string): AnatomicalTracingCurve | null {
        if (this.curveExists(curveName)) {
            return this.bezierPoints[curveName];
        }
        return null;
    }

    /**
     * Save all bezier curves in a hidden form
     */
    saveBezierCurve() {
        const curvesJson = JSON.stringify(
            TracingController.tracingList2BezierPoints(this.bezierPoints)
        );
        this.localRepository.set('bezier_curves', curvesJson);
    }

    /**
     * Call AnatomicalTracing method to draw bezierCurves
     */
    drawAllCurves(): void {
        this.anatomicalTracing.clearCanvas();
        for (const entry of Object.entries(this.bezierPoints)) {
            const element = entry[1];
            this.anatomicalTracing.drawCurve(element.points);
        }
    }

    /**
     * Draw Curve box
     * @param {string} currentCurve
     * @param {boolean} recalculate
     */
    drawCurveBox(currentCurve: string, recalculate: boolean): void {
        const tracing = this.getTracing(currentCurve);
        if (tracing) {
            this.anatomicalTracing.drawCurveBox(
                tracing.getBoxDimensions(20, recalculate)
            );
        }
    }

    /**
     * Draw all control points in a given curve
     * @param {string} curveName
     */
    drawPointCircle(curveName: string): void {
        const tracing = this.getTracing(curveName);
        if (tracing) {
            this.anatomicalTracing.drawPointCircle(tracing.points);
        }
    }

    /**
     * Returns a object containing a boolean if is on a boxVertex, and it index
     * @param {*} relativeMouse
     * @param {string} curveName
     * @returns {object} { isOn: isOn, index: vertexIndex }
     */
    public verifyMouseOnBoxVertex(
        relativeMouse: IPointBidimensional,
        curveName: string
    ): { isOn: boolean; index: number } {
        let isOn = false;
        let vertexIndex = 0;

        const tracing = this.getTracing(curveName);
        if (!tracing) {
            return { isOn, index: vertexIndex };
        }

        const boxVertex = tracing.getBoxDimensions(20, true);
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
     * Returns a boolean informing if the mouse is inside the box that contains the curve
     * @param {IPointBidimensional} relativeMouse
     * @param {string} curveName
     * @returns {boolean}
     */
    public verifyMouseInBox(
        relativeMouse: IPointBidimensional,
        curveName: string
    ): boolean {
        const tracing = this.getTracing(curveName);
        if (tracing) {
            const points = tracing.getBoxDimensions();
            return (
                relativeMouse.x >= points[0] &&
                relativeMouse.x <= points[0] + points[2] &&
                relativeMouse.y >= points[1] &&
                relativeMouse.y <= points[1] + points[3]
            );
        }
        return false;
    }

    /**
     * Returns the current position of the mouse if it is on a curve point
     * @param {IPointBidimensional} relativeMouse
     * @param {string} curveName
     * @returns {array} [element, subindex, subindex + 1]
     */
    public verifyMouseOnCurvePoint(
        relativeMouse: IPointBidimensional,
        curveName: string
    ): ICurvePointLocation | null {
        const pointRadius = this.canvasOdontoradiosis.scales.pointRadius;
        for (
            let index = 0;
            index < this.bezierPoints[curveName].length;
            index++
        ) {
            const element = this.bezierPoints[curveName].points[index];
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
        this.getTracing(curveName)?.updatePoints(
            function (pointX: number) {
                return pointX - amountX;
            },
            function (pointY: number) {
                return pointY - amountY;
            },
            false
        );
    }

    /**
     * Rotate a bezier curve
     * @param {string} curveName
     * @param {float} angle
     */
    rotateBezier(curveName: string, angle: number): void {
        this.getTracing(curveName)?.updatePoints(
            function (pointX: number, pointY: number) {
                return pointX * Math.cos(angle) - pointY * Math.sin(angle);
            },
            function (pointY: number, pointX: number) {
                return pointX * Math.sin(angle) + pointY * Math.cos(angle);
            }
        );
    }

    /**
     * Reescale all bezier curves, based on scales given
     * @param {string} curveName
     * @param {float} scaleX
     * @param {float} scaleY
     */
    rescaleBezier(curveName: string, scaleX: number, scaleY: number): void {
        this.getTracing(curveName)?.updatePoints(
            function (pointX: number) {
                return pointX * scaleX;
            },
            function (pointY: number) {
                return pointY * scaleY;
            }
        );
    }
}

export default TracingController;
