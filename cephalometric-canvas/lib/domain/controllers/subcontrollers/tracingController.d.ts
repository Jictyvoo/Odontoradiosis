import { IBezierCurves, ICurvePointLocation, IPointBidimensional } from '../../util/interfaces/interfaces';
import { ICanvasDraw } from '../../util/interfaces/views/canvasDraw';
import { ITracingDraw } from '../../util/interfaces/views/tracingDraw';
declare class TracingController {
    canvasOdontoradiosis: ICanvasDraw;
    anatomicalTracing: ITracingDraw;
    bezierPoints: IBezierCurves;
    currentBoxPoints: number[];
    private localRepository;
    /**
     * Constructor
     * @param {ICanvasDraw} canvasOdontoradiosis
     */
    constructor(canvasOdontoradiosis: ICanvasDraw);
    /**
     * Bezier points setter
     * @param {IBezierCurves} points
     */
    setBezierPoints(points?: IBezierCurves): void;
    /**
     * Verify if curve exists
     * @param {string} curveId
     * @returns {boolean}
     */
    curveExists(curveId?: string): boolean;
    /**
     * Verify if curve exists and returns it or null
     * @param {string} curveId
     */
    getCurve(curveId?: string): number[][] | null;
    /**
     * Save all bezier curves in a hidden form
     */
    saveBezierCurve(): void;
    /**
     * Returns all points in a curve box
     * @param {string} curveName
     * @param {boolean} recalculate
     */
    getBoxPoints(curveName: string, recalculate: boolean): number[];
    /**
     * Returns an array with box dimensions of a specific curve
     * @param {string} curveName
     * @param {number} borderSize
     * @param {boolean} recalculate
     */
    getBoxDimensions(curveName: string, borderSize?: number, recalculate?: boolean): number[];
    /**
     * Call AnatomicalTracing method to draw bezierCurves
     */
    drawAllCurves(): void;
    /**
     * Draw Curve box
     * @param {string} currentCurve
     * @param {boolean} recalculate
     */
    drawCurveBox(currentCurve: string, recalculate: boolean): void;
    /**
     * Draw all control points in a given curve
     * @param {string} curveName
     */
    drawPointCircle(curveName: string): void;
    /**
     * Returns a object containing a boolean if is on a boxVertex, and it index
     * @param {*} relativeMouse
     * @param {string} curveName
     * @returns {object} { isOn: isOn, index: vertexIndex }
     */
    verifyMouseOnBoxVertex(relativeMouse: IPointBidimensional, curveName: string): {
        isOn: boolean;
        index: number;
    };
    /**
     * Returns the current position of the mouse if it is on a curve point
     * @param {IPointBidimensional} relativeMouse
     * @param {string} curveName
     * @returns {array} [element, subindex, subindex + 1]
     */
    verifyMouseOnCurvePoint(relativeMouse: IPointBidimensional, curveName: string): ICurvePointLocation | null;
    /**
     * Iterate all curves and changes it value
     * @param {string} curveName
     * @param {function} callback_1
     * @param {funtion} callback_2
     * @param {boolean} _recalculate
     */
    runPointsAndChange(curveName: string, callback_1: any, callback_2: any, _recalculate?: boolean): void;
    /**
     * Translate a curve
     * @param {string} curveName
     * @param {float} amountX
     * @param {float} amountY
     */
    translateBezier(curveName: string, amountX: number, amountY: number): void;
    /**
     * Rotate a bezier curve
     * @param {string} curveName
     * @param {float} angle
     */
    rotateBezier(curveName: string, angle: number): void;
    /**
     * Reescale all bezier curves, based on scales given
     * @param {string} curveName
     * @param {float} scaleX
     * @param {float} scaleY
     */
    rescaleBezier(curveName: string, scaleX: number, scaleY: number): void;
}
export default TracingController;
