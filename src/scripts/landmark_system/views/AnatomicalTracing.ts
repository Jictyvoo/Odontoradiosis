import { default as CanvasOdontoradiosis } from './Canvas';
import { IBezierCurves } from '../models/Interfaces';

class AnatomicalTracing {
	public canvas: CanvasOdontoradiosis;
	public allCurves: IBezierCurves;

	/**
	 * Constructor
	 * @param {CanvasOdontoradiosis} canvas
	 */
	constructor(canvas: CanvasOdontoradiosis) {
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

	/**
	 * Draw all curves
	 */
	drawAllCurves(): void {
		this.canvas.clearCanvas('bezier');
		const selfCanvas = this.canvas;
		const selfCurves = this.allCurves;
		Object.keys(this.allCurves).forEach(function(element, _index, _array) {
			selfCurves[element].forEach(function(points, position, _arr) {
				if (position === 0) {
					selfCanvas.drawBezier.call(
						selfCanvas,
						selfCanvas.getContext.call(selfCanvas, 'bezier'),
						points[0],
						points[1],
						points[2],
						points[3],
						points[4],
						points[5],
						points[6],
						points[7],
						'#00e379'
					);
				} else {
					const temporary = selfCurves[element][position - 1];
					selfCanvas.drawBezier.call(
						selfCanvas,
						selfCanvas.getContext.call(selfCanvas, 'bezier'),
						temporary[temporary.length - 2],
						temporary[temporary.length - 1],
						points[0],
						points[1],
						points[2],
						points[3],
						points[4],
						points[5],
						'#00e379'
					);
				}
			});
		});
	}

	/**
	 * Draw all control points in a given curve
	 * @param {string} curveName
	 */
	drawPointCircle(curveName: string): void {
		if (this.allCurves[curveName] != null) {
			const context = this.canvas.getContext('bezier');
			//context.beginPath();
			for (let index = 0; index < this.allCurves[curveName].length; index++) {
				const element = this.allCurves[curveName][index];
				for (let subindex = 1; subindex < element.length; subindex += 2) {
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
		].forEach(function(element: number[], _index: number, _array: number[][]) {
			selfCanvas.drawCircle.call(selfCanvas, context, element[0], element[1]);
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
			context.lineWidth = this.canvas.scaleManager.lineWidth;
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

export default AnatomicalTracing;
