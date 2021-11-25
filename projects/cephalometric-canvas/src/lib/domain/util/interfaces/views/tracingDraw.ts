import { IBezierPoints } from '../curveManipulation';

export interface ITracingDraw {
    /**
     * Clear the canvas.
     */
    clearCanvas(): void;

    /**
     * Draw a single curve on the canvas.
     * @param curvePoints
     */
    drawCurve(curvePoints: number[][]): void;

    /**
     * Draw all control points in a given curve
     * @param {IBezierPoints} curvePoints
     */
    drawPointCircle(curvePoints: IBezierPoints): void;

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
    drawCurveBox(boxDimensions: number[]): void;
}
