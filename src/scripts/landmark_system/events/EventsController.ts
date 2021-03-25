import { default as MainController } from '../controllers/MainController';
import { default as ImageEffects } from '../controllers/ImageEffects';
import { default as OdontoradiosisKeeper } from '../models/OdontoradiosisKeeper';
import { default as UsefulMethods } from '../util/UsefulMethods';

class EventsOdontoradiosis {
	public mainController: MainController;
	public infoKeeper: OdontoradiosisKeeper;
	public imageEffects: ImageEffects;

	/**
	 * Constructor
	 * @param {MainController} mainController
	 * @param {OdontoradiosisKeeper} infoKeeper
	 * @param {ImageEffects} imageEffects
	 */
	constructor(
		mainController: MainController,
		infoKeeper: OdontoradiosisKeeper,
		imageEffects: ImageEffects
	) {
		this.mainController = mainController;
		this.infoKeeper = infoKeeper;
		this.imageEffects = imageEffects;

		const stackCanvasElement = document.getElementById(
			'stack-canvas'
		) as HTMLElement;

		stackCanvasElement.onmousedown = function(event) {
			mainController.manageMouseDown.call(mainController, event);
		};
		stackCanvasElement.onmousemove = function(event) {
			mainController.manageMouseMove.call(mainController, event);
		};
		const tracingController = this.mainController.tracingController;
		const landmarkSelect = document.getElementById(
			'pointsId'
		) as HTMLSelectElement;
		landmarkSelect.onchange = function() {
			const curveSelect = document.getElementById(
				'curvesId'
			) as HTMLSelectElement;
			if (curveSelect.selectedIndex != 0) {
				curveSelect.selectedIndex = 0;
				tracingController.drawAllCurves();
				mainController.canvasOdontoradiosis.stackCanvas.style.cursor =
					'crosshair';
			}
			mainController.referenceLandmarks.call(mainController);
		};
	}

	/**
	 * Adds all effects events
	 */
	addEffectsEvent(): void {
		const elements = ['contrast', 'brightness', 'invert', 'grayscale'];
		//document.getElementsByTagName('input');
		const selfImageEffects = this.imageEffects;
		for (let i = 0; i < elements.length; i++) {
			const effectInputElement = document.getElementById(
				elements[i]
			) as HTMLInputElement;
			effectInputElement.addEventListener('input', function() {
				selfImageEffects.onChangeValue.call(selfImageEffects);
			});
		}
		const undoneInput = document.getElementById(
			'undone-effects'
		) as HTMLInputElement;
		undoneInput.onclick = function() {
			selfImageEffects.reset.call(selfImageEffects);
		};
	}

	/**
	 * Add canvas events
	 */
	addCanvasInputEvents(): void {
		const curveSelect = document.getElementById(
			'curvesId'
		) as HTMLSelectElement;
		const tracingController = this.mainController.tracingController;
		const stackCanvas = this.mainController.canvasOdontoradiosis.stackCanvas;
		curveSelect.addEventListener('input', function() {
			const selectedIndex = curveSelect.selectedIndex;
			const currentSelection = curveSelect.options[selectedIndex].text;
			tracingController.drawAllCurves();
			if (currentSelection !== 'Selecione') {
				const currentCurve = UsefulMethods.normalizeTracingName(
					currentSelection
				);
				if (tracingController.curveExists(currentCurve)) {
					tracingController.drawCurveBox.call(
						tracingController,
						currentCurve,
						true
					);
					tracingController.drawPointCircle.call(
						tracingController,
						currentCurve
					);
					stackCanvas.style.cursor = 'move';
				}
			} else {
				stackCanvas.style.cursor = 'crosshair';
			}
		});
	}

	/**
	 * Add onmousedown and onmouseup events
	 */
	generateMouseEvents(): void {
		const currentObject = this;
		const odontoradiosisKeeper = this.infoKeeper;
		document.onmousedown = function() {
			const hiddenForm = document.getElementById(
				'current_image'
			) as HTMLInputElement;
			const splicedSource = currentObject.mainController
				.getUrl('image')
				.split('/');
			hiddenForm.setAttribute(
				'value',
				splicedSource[splicedSource.length - 2] +
					'/' +
					splicedSource[splicedSource.length - 1]
			);
			odontoradiosisKeeper.isMouseDown = true;
		};
		document.onmouseup = function() {
			odontoradiosisKeeper.isMouseDown = false;
			odontoradiosisKeeper.isInsideBox = false;
			odontoradiosisKeeper.isOnBoxVertex = { isOn: false, index: 0 };
			odontoradiosisKeeper.isOnCurvePoints = null;

			/*odontoradiosisKeeper.mousePosition.x = null;
      odontoradiosisKeeper.mousePosition.y = null;*/
			odontoradiosisKeeper.mousePosition.disabled = true;
		};
	}

	/**
	 * Apply all events functions
	 */
	applyAllEvents(): void {
		this.addEffectsEvent();
		this.addCanvasInputEvents();
		this.generateMouseEvents();
	}
}

export default EventsOdontoradiosis;
