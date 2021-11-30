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
import {
    EStorageKey,
    ILocalRepository,
} from '../../util/interfaces/repositories';
import { ICanvasDraw } from '../../util/interfaces/views/canvasDraw';
import { ITracingDraw } from '../../util/interfaces/views/tracingDraw';
import UsefulMethods from '../../util/usefulMethods';
import { AbstractBezierController } from './abstractBezierController';

class TracingController extends AbstractBezierController {
    public canvasOdontoradiosis: ICanvasDraw;
    public anatomicalTracing: ITracingDraw;
    public bezierPoints: ITracingList;
    private localRepository: ILocalRepository;

    /**
     * Constructor
     * @param {ICanvasDraw} canvasOdontoradiosis
     */
    constructor(canvasOdontoradiosis: ICanvasDraw) {
        super();
        this.canvasOdontoradiosis = canvasOdontoradiosis;

        // Create AnatomicalTracing and set this curvePoints
        this.anatomicalTracing = new AnatomicalTracingImpl(
            canvasOdontoradiosis
        );
        this.localRepository = new LocalRepositoryImpl();

        let bezierCurves = Cloneable.deepCopy(deafultBezierCurves);
        this.bezierPoints =
            TracingController.bezierPoints2TracingList(bezierCurves);
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

    protected getTracing(curveName: string): AnatomicalTracingCurve | null {
        if (this.curveExists(curveName)) {
            return this.bezierPoints[curveName];
        }
        return null;
    }

    /**
     * Save all bezier curves in a given repository
     */
    saveBezierCurve(): void {
        const curvesJson = JSON.stringify(
            TracingController.tracingList2BezierPoints(this.bezierPoints)
        );
        this.localRepository.set(EStorageKey.BEZIER_CURVES, curvesJson);
    }

    /**
     * Load bezier curves from repository
     */
    loadBezierCurves(jsonContent: string = ''): boolean {
        let decodedCurves: IBezierCurves = {};
        if (jsonContent && jsonContent.length > 0) {
            decodedCurves = JSON.parse(jsonContent);
        } else {
            decodedCurves =
                this.localRepository.get<IBezierCurves>(
                    EStorageKey.BEZIER_CURVES
                ) ?? {};
        }

        // Save parsed curves in bezierPoints
        if (Object.keys(decodedCurves).length > 0) {
            this.setBezierPoints(decodedCurves);
            return true;
        }
        return false;
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
    public drawCurveBox(currentCurve: string, recalculate: boolean): void {
        const tracing = this.getTracing(currentCurve);
        if (tracing) {
            this.anatomicalTracing.drawCurveBox(
                tracing.getBoxDimensions(20, recalculate)
            );
        }
    }

    private getMaxMinAllCurves(recalculate: boolean): IPointBidimensional[] {
        // get the max and min points of all curves
        const maxPoints: IPointBidimensional = {
            x: Number.NEGATIVE_INFINITY,
            y: Number.NEGATIVE_INFINITY,
        };
        const minPoints: IPointBidimensional = {
            x: Number.POSITIVE_INFINITY,
            y: Number.POSITIVE_INFINITY,
        };
        for (const curveElement of Object.values(this.bezierPoints)) {
            const maxMinPoints = curveElement.getMaxMinPoints(recalculate);
            // Override max point
            maxPoints.x = Math.max(maxMinPoints[1].x, maxPoints.x);
            maxPoints.y = Math.max(maxMinPoints[1].y, maxPoints.y);

            // Override min point
            minPoints.x = Math.min(maxMinPoints[0].x, minPoints.x);
            minPoints.y = Math.min(maxMinPoints[0].y, minPoints.y);
        }
        return [minPoints, maxPoints];
    }

    public drawEntireCurveBox(recalculate: boolean) {
        const points = this.getMaxMinAllCurves(recalculate);
        const boxDimensions = UsefulMethods.calculateBoxDimensions(points);
        this.anatomicalTracing.drawCurveBox(boxDimensions);
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
        curveName: string,
        isAllCurves: boolean = false
    ): { isOn: boolean; index: number } {
        let isOn = false;
        let vertexIndex = 0;

        const tracing = this.getTracing(curveName);
        const boxVertex: number[] =
            tracing?.getBoxDimensions(20, true) ?? isAllCurves
                ? UsefulMethods.calculateBoxDimensions(
                      this.getMaxMinAllCurves(true)
                  )
                : [];
        if (boxVertex.length <= 0) {
            return { isOn, index: vertexIndex };
        }

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
        curveName: string,
        isAllCurves: boolean = false
    ): boolean {
        let points: number[] = [];
        if (isAllCurves) {
            const maxMin = this.getMaxMinAllCurves(true);
            points = UsefulMethods.calculateBoxDimensions(maxMin);
        }

        const tracing = this.getTracing(curveName);
        if (tracing) {
            points = tracing.getBoxDimensions();
        }

        // Verify if mouse is inside the box only has valid points
        if (points.length >= 4) {
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
        const tracing = this.getTracing(curveName);
        if (!tracing) {
            return null;
        }
        for (let index = 0; index < tracing.length ?? 0; index++) {
            const element = tracing.points[index];
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

    rescaleAllCurves(scales: IPointBidimensional) {
        for (const curveName of Object.keys(this.bezierPoints)) {
            this.rescaleBezier(curveName, scales.x, scales.y);
        }
    }

    translateAllCurves(movement: IPointBidimensional) {
        for (const curveName of Object.keys(this.bezierPoints)) {
            this.translateBezier(curveName, movement.x, movement.y);
        }
    }
}

export default TracingController;
