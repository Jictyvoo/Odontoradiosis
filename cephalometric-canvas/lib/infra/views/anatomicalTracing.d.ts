import { IBezierCurves } from '../../domain/util/interfaces/interfaces';
import { ICanvasDraw } from '../../domain/util/interfaces/views/canvasDraw';
import { ITracingDraw } from '../../domain/util/interfaces/views/tracingDraw';
declare class AnatomicalTracingImpl implements ITracingDraw {
    canvas: ICanvasDraw;
    allCurves: IBezierCurves;
    private static color;
    /**
     * Constructor
     * @param {ICanvasDraw} canvas
     */
    constructor(canvas: ICanvasDraw);
    /**
     * Bezier curves setter
     * @param {IBezierCurves} curves
     */
    setAllCurves(curves: IBezierCurves): void;
    private drawCurve;
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
    drawBoxVertex(context: CanvasRenderingContext2D, boxDimensions: number[]): void;
    /**
     *
     * @param {string} currentCurve
     * @param {array} boxDimensions
     */
    drawCurveBox(currentCurve: string, boxDimensions: number[]): void;
}
export default AnatomicalTracingImpl;
