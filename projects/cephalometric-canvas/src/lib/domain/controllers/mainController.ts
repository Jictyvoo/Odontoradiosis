import { default as OdontoradiosisKeeper } from '../models/odontoradiosisKeeper';
import { ICanvasLayers } from '../util/interfaces/canvasManipulation';
import { IPointBidimensional, IStringMap } from '../util/interfaces/interfaces';
import { ICanvasDraw } from '../util/interfaces/views/canvasDraw';
import { default as ScaleManager } from '../util/scaleManager';
import { default as LandmarksController } from './subcontrollers/landmarksController';
import { default as TracingController } from './subcontrollers/tracingController';

class MainController {
    public canvasOdontoradiosis: ICanvasDraw;
    public scaleManager: ScaleManager;
    public tracingController: TracingController;
    public landmarksController: LandmarksController;
    public infoKeeper: OdontoradiosisKeeper;

    /**
     * Constructor
     * @param {ICanvasDraw} canvasOdontoradiosis
     * @param {ScaleManager} scaleManager
     * @param {OdontoradiosisKeeper} infoKeeper
     */
    constructor(
        canvasOdontoradiosis: ICanvasDraw,
        scaleManager: ScaleManager,
        infoKeeper: OdontoradiosisKeeper
    ) {
        this.canvasOdontoradiosis = canvasOdontoradiosis;
        this.scaleManager = scaleManager;
        this.tracingController = new TracingController(canvasOdontoradiosis);
        this.landmarksController = new LandmarksController(
            canvasOdontoradiosis
        );
        this.infoKeeper = infoKeeper;
    }

    /**
     * Loads json file with landmarks location
     * @param {int} id image id
     */
    public loadJsonLandmarks(
        jsonContent: string,
        override: boolean = true
    ): void {
        if (override) {
            // Load landmarks from default empty
            this.landmarksController.setLandmarks({});
        } else if (jsonContent.length > 0) {
            // Load landmarks from json file
            this.landmarksController.loadLandmarks(jsonContent);
        }
    }

    /**
     * Loads json file with bezier anatomical tracing points
     * @param {string} jsonContent image id
     */
    public loadJsonCurve(jsonContent: string, override: boolean = true): void {
        if (override) {
            // Load JsonCurves from default json file
            this.tracingController.setBezierPoints();
        } else if (jsonContent.length > 0) {
            this.tracingController.loadBezierCurves(jsonContent);
        }
    }

    public saveAll(): void {
        this.landmarksController.saveLandmarks();
        this.tracingController.saveBezierCurve();
    }

    /**
     * Load landmarks and anatomical tracing points from storage or default
     */
    public loadAll(): void {
        if (!this.landmarksController.loadLandmarks()) {
            console.error('Landmarks not found');
            this.loadJsonLandmarks('', true);
        }
        if (!this.tracingController.loadBezierCurves()) {
            console.error('Tracing not found');
            this.loadJsonCurve('', true);
        }
    }

    /**
     * Adapt reference landmarks
     */
    referenceLandmarks(): void {
        const currentLandmark = this.infoKeeper.selectedOptions.landmark;
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
        if (currentLandmark !== 'Selecione' && imagePaths[currentLandmark]) {
            const img = new Image();
            const referenceCanvas = document.getElementById(
                'referenceLandmark'
            ) as HTMLCanvasElement;
            if (referenceCanvas.getContext) {
                const context = referenceCanvas.getContext(
                    '2d'
                ) as CanvasRenderingContext2D;
                img.onload = function () {
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
            /*img.src =
                this.urls['referenceImages'] + imagePaths[currentLandmark];*/
        }
    }

    /**
     * Change or set point location on current mouse position
     * @param {IPointBidimensional} point
     */
    markLandmarkPoint(landmarkName: string, point: IPointBidimensional): void {
        if (landmarkName.length > 0 && landmarkName !== 'Selecione') {
            const landmarkCanvas = this.canvasOdontoradiosis.getCanvas(
                ICanvasLayers.LANDMARKS
            );
            const currentLandmark = this.landmarksController.verifyLandmark(
                landmarkName,
                true
            );
            const currentMousePosition = this.scaleManager.getMousePos(
                landmarkCanvas,
                point
            );
            currentLandmark.x = currentMousePosition.x;
            currentLandmark.y = currentMousePosition.y;

            this.landmarksController.saveLandmarks();
            this.landmarksController.redrawLandmarks();
        }
    }
}

export default MainController;
