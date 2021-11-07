import { IBezierCurves } from '../interfaces';

export interface ITracingDraw {
    /**
     * Bezier curves setter
     * @param {IBezierCurves} curves
     */
    setAllCurves(curves: IBezierCurves): void;

    /**
     * Draw all curves
     */
    drawAllCurves(): void;

    /**
     * Draw all control points in a given curve
     * @param {string} curveName
     */
    drawPointCircle(curveName: string): void;

    /**
     *
     * @param {CanvasRenderingContext2D} context
     * @param {array} boxDimensions
     */
    drawBoxVertex(
        context: CanvasRenderingContext2D,
        boxDimensions: number[]
    ): void;

    /**
     *
     * @param {string} currentCurve
     * @param {array} boxDimensions
     */
    drawCurveBox(currentCurve: string, boxDimensions: number[]): void;
}
