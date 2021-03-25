import { default as CanvasOdontoradiosis } from '../views/Canvas';
import { default as ScaleManager } from '../util/ScaleManager';
import { default as UsefulMethods } from '../util/UsefulMethods';
import { default as TracingController } from './subcontrollers/TracingController';
import { default as LandmarksController } from './subcontrollers/LandmarksController';
import { default as OdontoradiosisKepper } from '../models/OdontoradiosisKeeper';
import { IStringMap } from '../models/Interfaces';

class MainController {
	public urls: IStringMap;
	public canvasOdontoradiosis: CanvasOdontoradiosis;
	public scaleManager: ScaleManager;
	public tracingController: TracingController;
	public landmarksController: LandmarksController;
	public infoKeeper: OdontoradiosisKepper;
	public width!: number;
	public height!: number;

	/**
	 * Constructor
	 * @param {array} urls
	 * @param {CanvasOdontoradiosis} canvasOdontoradiosis
	 * @param {ScaleManager} scaleManager
	 * @param {OdontoradiosisKepper} infoKeeper
	 */
	constructor(
		urls: IStringMap,
		canvasOdontoradiosis: CanvasOdontoradiosis,
		scaleManager: ScaleManager,
		infoKeeper: OdontoradiosisKepper
	) {
		this.urls = urls;
		this.canvasOdontoradiosis = canvasOdontoradiosis;
		this.scaleManager = scaleManager;
		this.tracingController = new TracingController(canvasOdontoradiosis);
		this.landmarksController = new LandmarksController(canvasOdontoradiosis);
		this.infoKeeper = infoKeeper;
	}

	/**
	 * @param {string} id
	 * @returns {string}
	 */
	getUrl(id: string): string {
		return this.urls[id];
	}

	/**
	 * Set the address of url with given id
	 * @param {string} id
	 * @param {string} address
	 */
	setUrl(id: string, address: string): void {
		this.urls[id] = address;
	}

	/**
	 * Loads json file with landmarks location
	 * @param {int} id image id
	 */
	loadJsonLandmarks(id: number): void {
		if (id && id > 0) {
			const landmarkJson = this.urls['landmarks'].replace(
				'%REPLACE%',
				id.toString()
			);
			const selfLandmarksController = this.landmarksController;
			fetch(landmarkJson)
				.then((response) => {
					return response.json();
				})
				.then((data) => {
					selfLandmarksController.setLandmarks.call(
						selfLandmarksController,
						data
					);
				})
				.then(() => {
					selfLandmarksController.redrawLandmarks.call(selfLandmarksController);
				});
		}
	}

	/**
	 * Loads json file with bezier anatomical tracing points
	 * @param {int} id image id
	 */
	loadJsonCurve(id: number): void {
		if (id && id > 0) {
			const curveJson = this.urls['curves'].replace('%REPLACE%', id.toString());
			const selfTracingController = this.tracingController;
			selfTracingController.drawAllCurves.call(selfTracingController);
			fetch(curveJson)
				.then((response) => {
					return response.json();
				})
				.then((data) => {
					selfTracingController.setBezierPoints.call(
						selfTracingController,
						data
					);
				})
				.then(() => {
					selfTracingController.drawAllCurves.call(selfTracingController);
				});
		}
	}

	/**
	 * Adapt reference landmarks
	 */
	referenceLandmarks(): void {
		const pointSelect = document.getElementById(
			'pointsId'
		) as HTMLSelectElement;
		const selectedIndex = pointSelect.selectedIndex;
		const currentPoint = pointSelect.options[selectedIndex].text;
		const imagePaths: IStringMap = {};
		imagePaths['Sela (S)'] = 'selaTurcica.png';
		imagePaths['Násio (N)'] = 'nasio.png';
		imagePaths['Espinha nasal anterior (ENA)'] = 'ENA.png';
		imagePaths['Espinha nasal posterior (ENP)'] = 'ENP.png';
		imagePaths['Ponto subespinhal (A)'] = 'A.png';
		imagePaths['Ponto pupramental (B)'] = 'B.png';
		imagePaths['Pogônio (Pog)'] = 'pogonio.png';
		imagePaths['Gnátio (Gn)'] = 'Gnatio.png';
		imagePaths['Mento (Me)'] = 'mento.png';
		imagePaths['Condílio (Co)'] = 'condilio.png';
		imagePaths['Pró-nasal (Pn)'] = 'proNasal.png';
		imagePaths['Pogônio Mole (Pg)'] = 'pogonioMole.png';
		imagePaths['Palato Mole (pm)'] = 'palatoMole.png';
		imagePaths['Gônio (Go)'] = '';
		imagePaths['Órbitário (Or)'] = '';
		imagePaths['Pório (Po)'] = '';
		imagePaths['Ponta do Nariz (PtN)'] = '';
		imagePaths['Fossa Ptérigo Maxilar (Fpm)'] = '';
		imagePaths['Pterigóide (Pt)'] = '';
		if (currentPoint !== 'Selecione' && imagePaths[currentPoint]) {
			const img = new Image();
			const referenceCanvas = document.getElementById(
				'referenceLandmark'
			) as HTMLCanvasElement;
			if (referenceCanvas.getContext) {
				const context = referenceCanvas.getContext(
					'2d'
				) as CanvasRenderingContext2D;
				img.onload = function() {
					context.canvas.width = img.width; //maybe don't work
					context.canvas.height = img.height;
					const canvasReferenceElement = document.getElementById(
						'canvas-reference'
					) as HTMLCanvasElement;
					canvasReferenceElement.setAttribute(
						'style',
						'height: ' +
							context.canvas.height +
							'px' +
							'width: ' +
							context.canvas.width +
							'px'
					);
					context.drawImage(
						img,
						0,
						0,
						context.canvas.width,
						context.canvas.height
					); //draw background image
					context.fillStyle = 'rgba(1, 1, 1, 0)'; //draw a box over the top
				};
			}
			img.src = this.urls['referenceImages'] + imagePaths[currentPoint];
		}
	}

	/**
	 * Change or set point location on current mouse position
	 * @param {MouseEvent} event
	 */
	markLandmarkPoint(event: MouseEvent): void {
		const landmarkSelect = document.getElementById(
			'pointsId'
		) as HTMLSelectElement;
		const selectedIndex = landmarkSelect.selectedIndex;
		const currentPoint = landmarkSelect.options[selectedIndex].text;
		if (currentPoint !== 'Selecione') {
			const landmarkCanvas = this.canvasOdontoradiosis.getCanvas('landmarks');
			const currentLandmark = this.landmarksController.verifyLandmark(
				currentPoint,
				true
			);
			const currentMousePosition = this.scaleManager.getMousePos(
				landmarkCanvas,
				event
			);
			currentLandmark.X = currentMousePosition.x;
			currentLandmark.Y = currentMousePosition.y;

			this.landmarksController.saveLandmarks();
			this.landmarksController.redrawLandmarks();
		}
	}

	/**
	 *
	 * @param {MouseEvent} event
	 */
	manageMouseMove(event: MouseEvent): void {
		event.preventDefault();
		event.stopPropagation(); // tell the browser we're handling this event
		const canvas = document.getElementById('bezier') as HTMLCanvasElement;
		const context = canvas.getContext('2d') as CanvasRenderingContext2D;
		context.translate(canvas.width / 2, canvas.height / 2);
		if (this.infoKeeper.isMouseDown && this.infoKeeper.isCurveFunction) {
			/* do drag things */
			this.canvasOdontoradiosis.getCanvas('bezier').style.cursor = 'move';
			const curveSelectObj = document.getElementById(
				'curvesId'
			) as HTMLSelectElement;
			const selectedIndex = curveSelectObj.selectedIndex;
			const curveName = UsefulMethods.normalizeTracingName(
				curveSelectObj.options[selectedIndex].text
			);
			const referenceCanvas = this.canvasOdontoradiosis.getCanvas('landmarks');
			const referenceContext = referenceCanvas.getContext(
				'2d'
			) as CanvasRenderingContext2D;
			const refrenceRect = referenceCanvas.getBoundingClientRect();
			if (this.infoKeeper.mousePosition.disabled) {
				this.infoKeeper.mousePosition.x = this.scaleManager.dynamicCanvasScale(
					event.clientX,
					true,
					referenceContext,
					refrenceRect
				);
				this.infoKeeper.mousePosition.y = this.scaleManager.dynamicCanvasScale(
					event.clientY,
					false,
					referenceContext,
					refrenceRect
				);
				this.infoKeeper.mousePosition.disabled = false;
			} else {
				const currentPosition = {
					x: this.scaleManager.dynamicCanvasScale(
						event.clientX,
						true,
						referenceContext,
						refrenceRect
					),
					y: this.scaleManager.dynamicCanvasScale(
						event.clientY,
						false,
						referenceContext,
						refrenceRect
					),
				};
				const boxVertexInfo = this.infoKeeper.isOnBoxVertex;
				if (boxVertexInfo.isOn) {
					/*still need to fix problem when rescale with top points*/
					let scaleX = currentPosition.x / this.infoKeeper.mousePosition.x;
					if (boxVertexInfo.index < 2) {
						scaleX = this.infoKeeper.mousePosition.x / currentPosition.x;
					}
					let scaleY = currentPosition.y / this.infoKeeper.mousePosition.y;
					if (boxVertexInfo.index % 2 === 0) {
						scaleY = this.infoKeeper.mousePosition.y / currentPosition.y;
					}
					this.tracingController.rescaleBezier(curveName, scaleX, scaleY);
				} else if (this.infoKeeper.isOnCurvePoints != null) {
					this.infoKeeper.isOnCurvePoints[0][
						this.infoKeeper.isOnCurvePoints[1] as number
					] -= this.infoKeeper.mousePosition.x - currentPosition.x;
					this.infoKeeper.isOnCurvePoints[0][
						this.infoKeeper.isOnCurvePoints[2] as number
					] -= this.infoKeeper.mousePosition.y - currentPosition.y;
				} else if (this.infoKeeper.isInsideBox) {
					this.tracingController.translateBezier(
						curveName,
						this.infoKeeper.mousePosition.x - currentPosition.x,
						this.infoKeeper.mousePosition.y - currentPosition.y
					);
				} else {
					let angle = UsefulMethods.calculateAngle(
						currentPosition,
						this.infoKeeper.mousePosition
					);
					if (!isNaN(angle)) {
						angle *= UsefulMethods.highLowAngle(this.infoKeeper.mousePosition, {
							x: currentPosition.x,
							y: currentPosition.y,
						});
						this.tracingController.rotateBezier(curveName, angle);
					}
				}
				this.infoKeeper.mousePosition.x = currentPosition.x;
				this.infoKeeper.mousePosition.y = currentPosition.y;
				this.infoKeeper.mousePosition.disabled = false;
				this.tracingController.drawAllCurves();
				this.tracingController.drawCurveBox(curveName, true);
				this.tracingController.drawPointCircle(curveName);
				this.tracingController.saveBezierCurve();
			}
		} else if (this.infoKeeper.isCurveFunction) {
			this.canvasOdontoradiosis.getCanvas('bezier').style.cursor = 'crosshair';
		}
	}

	/**
	 * Receive a event and manage when to select curve or landmark functions
	 * @param {MouseEvent} event
	 */
	manageMouseDown(event: MouseEvent): void {
		const curveSelect = document.getElementById(
			'curvesId'
		) as HTMLSelectElement;
		const selectedIndex = curveSelect.selectedIndex;
		const currentCurve = curveSelect.options[selectedIndex].text;
		const curveName = UsefulMethods.normalizeTracingName(currentCurve);
		if (currentCurve === 'Selecione') {
			this.infoKeeper.isCurveFunction = false;
			this.markLandmarkPoint(event);
		} else if (this.tracingController.curveExists(curveName)) {
			this.infoKeeper.isCurveFunction = true;
			const points = this.tracingController.getBoxDimensions(curveName);
			const relativeMouse = this.scaleManager.getMousePos(
				this.canvasOdontoradiosis.getCanvas('bezier'),
				event
			);
			this.infoKeeper.isInsideBox =
				relativeMouse.x >= points[0] &&
				relativeMouse.x <= points[0] + points[2] &&
				relativeMouse.y >= points[1] &&
				relativeMouse.y <= points[1] + points[3];
			this.infoKeeper.isOnBoxVertex = this.tracingController.verifyMouseOnBoxVertex(
				relativeMouse,
				curveName
			);
			this.infoKeeper.isOnCurvePoints = this.tracingController.verifyMouseOnCurvePoint(
				relativeMouse,
				curveName
			);
		}
	}
}

export default MainController;
