import { default as CanvasOdontoradiosis } from '../../views/Canvas';
import { ILandmark, ILandmarkArray } from '../../models/Interfaces';

class LandmarksController {
	public landmarks: ILandmarkArray;
	public canvas: CanvasOdontoradiosis;

	/**
	 *
	 * @param {CanvasOdontoradiosis} canvasOdontoradiosis
	 */
	constructor(canvasOdontoradiosis: CanvasOdontoradiosis) {
		this.landmarks = {};
		this.canvas = canvasOdontoradiosis;
	}

	/**
	 * @returns {ILandmarkArray} this.landmarks
	 */
	getLandmarks(): ILandmarkArray {
		return this.landmarks;
	}

	/**
	 * Lardmarks setter
	 * @param {ILandmarkArray} newLandmarks
	 */
	setLandmarks(newLandmarks: ILandmarkArray): void {
		this.landmarks = newLandmarks;
	}

	/**
	 * Set a single landmark value
	 * @param {string} name
	 * @param {ILandmark} value
	 */
	setLandmark(name: string, value: ILandmark = { X: 0, Y: 0 }): void {
		this.landmarks[name] = value;
	}

	/**
	 * Verify if landmark exists. If not and toCreate is true, it'll create
	 * @param {string} name
	 * @param {boolean} toCreate
	 * @returns {ILandmark}
	 */
	verifyLandmark(name: string, toCreate = false): ILandmark {
		if (!this.landmarks[name] && toCreate) {
			this.landmarks[name] = { X: 0, Y: 0 };
		}
		return this.landmarks[name];
	}

	/**
	 * Save all landmarks in a hidden form
	 */
	saveLandmarks(): void {
		const data_json = JSON.stringify(this.landmarks);
		const hiddenForm = document.getElementById(
			'saved_points'
		) as HTMLInputElement;
		hiddenForm.setAttribute('value', data_json);
	}

	/**
	 * Draw a landmark with its name
	 * @param {CanvasRenderingContext2D} canvasContext
	 * @param {string} landmarkName
	 */
	drawLandmark(
		canvasContext: CanvasRenderingContext2D,
		landmarkName: string
	): void {
		const locations = this.landmarks[landmarkName];
		const context = canvasContext;
		const readyToShowName = landmarkName.match(/\(.+\)/);
		if (readyToShowName) {
			this.canvas.drawCircleCtx(
				'landmarks',
				locations.X,
				locations.Y,
				this.canvas.scaleManager.pointRadius,
				1,
				'red',
				'#330005'
			);
			context.beginPath();
			context.fillStyle = 'red';
			context.font = this.canvas.scaleManager.nameScale + 'px Arial';
			context.fillText(
				readyToShowName.toString(),
				Math.floor(
					locations.X - this.canvas.scaleManager.textRelativePosition.x
				),
				Math.floor(
					locations.Y + this.canvas.scaleManager.textRelativePosition.y
				)
			);
			context.fill();
			context.lineWidth = 1;
			context.strokeStyle = '#330005';
			context.stroke();
		}
	}

	/**
	 * Redraw all landmarks
	 */
	redrawLandmarks(): void {
		const landmarksCanvas = this.canvas.getCanvas('landmarks');
		const context = landmarksCanvas.getContext(
			'2d'
		) as CanvasRenderingContext2D;
		context.clearRect(0, 0, landmarksCanvas.width, landmarksCanvas.height);
		const self = this;
		Object.keys(this.landmarks).forEach(function(element, _index, _array) {
			self.drawLandmark.call(self, context, element);
		});
	}
}

export default LandmarksController;
