import { ICanvasLayers } from '../../domain/util/interfaces/canvasManipulation';
import { IBezierPoints } from '../../domain/util/interfaces/curveManipulation';
import { ICanvasDraw } from '../../domain/util/interfaces/views/canvasDraw';
import { ITracingDraw } from '../../domain/util/interfaces/views/tracingDraw';

class AnatomicalTracingImpl implements ITracingDraw {
    public canvas: ICanvasDraw;
    private static color = Object.freeze({ fill: 'green', stroke: '#00e379' });

    /**
     * Constructor
     * @param {ICanvasDraw} canvas
     */
    constructor(canvas: ICanvasDraw) {
        this.canvas = canvas;
    }

    public drawCurve(curvePoints: number[][]): void {
        const bezierContext = this.canvas.getContext(
            ICanvasLayers.ANATOMICAL_TRACING
        );
        for (let position = 0; position < curvePoints.length; position += 1) {
            const points = curvePoints[position];
            if (position === 0) {
                this.canvas.drawBezier(
                    bezierContext,
                    points[0],
                    points[1],
                    points[2],
                    points[3],
                    points[4],
                    points[5],
                    points[6],
                    points[7],
                    AnatomicalTracingImpl.color.stroke
                );
            } else {
                const temporary = curvePoints[position - 1];
                this.canvas.drawBezier(
                    bezierContext,
                    temporary[temporary.length - 2],
                    temporary[temporary.length - 1],
                    points[0],
                    points[1],
                    points[2],
                    points[3],
                    points[4],
                    points[5],
                    AnatomicalTracingImpl.color.stroke
                );
            }
        }
    }

    /**
     * Clear the canvas
     */
    public clearCanvas(): void {
        this.canvas.clearCanvas(ICanvasLayers.ANATOMICAL_TRACING);
    }

    /**
     * Draw all control points in a given curve
     * @param {IBezierPoints} curvePoints
     */
    public drawPointCircle(curvePoints: IBezierPoints): void {
        const context = this.canvas.getContext(
            ICanvasLayers.ANATOMICAL_TRACING
        );
        //context.beginPath();
        for (let index = 0; index < curvePoints.length; index++) {
            const element = curvePoints[index];
            for (let subindex = 1; subindex < element.length; subindex += 2) {
                this.canvas.drawCircle(
                    context,
                    element[subindex - 1],
                    element[subindex]
                );
            }
        }
    }

    /**
     *
     * @param {CanvasRenderingContext2D} context
     * @param {array} boxDimensions
     */
    public drawBoxVertex(
        context: CanvasRenderingContext2D,
        boxDimensions: number[]
    ): void {
        const selfCanvas = this.canvas;
        [
            [boxDimensions[0], boxDimensions[1]],
            [boxDimensions[0], boxDimensions[1] + boxDimensions[3]],
            [boxDimensions[0] + boxDimensions[2], boxDimensions[1]],
            [
                boxDimensions[0] + boxDimensions[2],
                boxDimensions[1] + boxDimensions[3],
            ],
        ].forEach(function (
            element: number[],
            _index: number,
            _array: number[][]
        ) {
            selfCanvas.drawCircle.call(
                selfCanvas,
                context,
                element[0],
                element[1]
            );
        });
    }

    /**
     *
     * @param {string} currentCurve
     * @param {array} boxDimensions
     */
    public drawCurveBox(boxDimensions: number[]): void {
        const context = this.canvas.getContext(
            ICanvasLayers.ANATOMICAL_TRACING
        );
        context.beginPath();
        context.lineWidth = this.canvas.scales.lineWidth;
        context.rect(
            boxDimensions[0],
            boxDimensions[1],
            boxDimensions[2],
            boxDimensions[3]
        );
        context.stroke();
        this.drawBoxVertex(context, boxDimensions);
    }
}

export default AnatomicalTracingImpl;
