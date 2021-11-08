import { IBezierCurves } from '../../domain/util/interfaces/interfaces';
import { ICanvasDraw } from '../../domain/util/interfaces/views/canvasDraw';
import { ITracingDraw } from '../../domain/util/interfaces/views/tracingDraw';

class AnatomicalTracingImpl implements ITracingDraw {
    public canvas: ICanvasDraw;
    public allCurves: IBezierCurves;
    private static color = Object.freeze({ fill: 'green', stroke: '#00e379' });

    /**
     * Constructor
     * @param {ICanvasDraw} canvas
     */
    constructor(canvas: ICanvasDraw) {
        this.canvas = canvas;
        this.allCurves = {};
    }

    /**
     * Bezier curves setter
     * @param {IBezierCurves} curves
     */
    setAllCurves(curves: IBezierCurves): void {
        this.allCurves = curves;
    }

    private drawCurve(curvePoints: number[][]): void {
        for (let position = 0; position < curvePoints.length; position += 1) {
            const points = curvePoints[position];
            if (position === 0) {
                this.canvas.drawBezier(
                    this.canvas.getContext('bezier'),
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
                    this.canvas.getContext('bezier'),
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
     * Draw all curves
     */
    drawAllCurves(): void {
        this.canvas.clearCanvas('bezier');
        for (const entry of Object.entries(this.allCurves)) {
            const element = entry[1];
            this.drawCurve(element);
        }
    }

    /**
     * Draw all control points in a given curve
     * @param {string} curveName
     */
    drawPointCircle(curveName: string): void {
        if (this.allCurves[curveName] != null) {
            const context = this.canvas.getContext('bezier');
            //context.beginPath();
            for (
                let index = 0;
                index < this.allCurves[curveName].length;
                index++
            ) {
                const element = this.allCurves[curveName][index];
                for (
                    let subindex = 1;
                    subindex < element.length;
                    subindex += 2
                ) {
                    this.canvas.drawCircle(
                        context,
                        element[subindex - 1],
                        element[subindex]
                    );
                }
            }
        }
    }

    /**
     *
     * @param {CanvasRenderingContext2D} context
     * @param {array} boxDimensions
     */
    drawBoxVertex(
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
    drawCurveBox(currentCurve: string, boxDimensions: number[]): void {
        if (currentCurve != null) {
            const context = this.canvas.getContext('bezier');
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
}

export default AnatomicalTracingImpl;
