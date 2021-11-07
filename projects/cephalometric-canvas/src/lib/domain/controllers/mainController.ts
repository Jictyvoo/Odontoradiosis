import { default as OdontoradiosisKepper } from '../models/odontoradiosisKeeper';
import { IPointBidimensional, IStringMap } from '../util/interfaces/interfaces';
import { ICanvasDraw } from '../util/interfaces/views/canvasDraw';
import { default as ScaleManager } from '../util/scaleManager';
import { default as LandmarksController } from './subcontrollers/landmarksController';
import { default as TracingController } from './subcontrollers/tracingController';

class MainController {
    public urls: IStringMap;
    public canvasOdontoradiosis: ICanvasDraw;
    public scaleManager: ScaleManager;
    public tracingController: TracingController;
    public landmarksController: LandmarksController;
    public infoKeeper: OdontoradiosisKepper;

    /**
     * Constructor
     * @param {array} urls
     * @param {ICanvasDraw} canvasOdontoradiosis
     * @param {ScaleManager} scaleManager
     * @param {OdontoradiosisKepper} infoKeeper
     */
    constructor(
        urls: IStringMap,
        canvasOdontoradiosis: ICanvasDraw,
        scaleManager: ScaleManager,
        infoKeeper: OdontoradiosisKepper
    ) {
        this.urls = urls;
        this.canvasOdontoradiosis = canvasOdontoradiosis;
        this.scaleManager = scaleManager;
        this.tracingController = new TracingController(canvasOdontoradiosis);
        this.landmarksController = new LandmarksController(
            canvasOdontoradiosis
        );
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
        if (id > 0) {
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
                    selfLandmarksController.redrawLandmarks.call(
                        selfLandmarksController
                    );
                });
        }
    }

    /**
     * Loads json file with bezier anatomical tracing points
     * @param {string} jsonContent image id
     */
    loadJsonCurve(jsonContent: string): void {
        // Load JsonCurves from default json file
        this.tracingController.setBezierPoints();
        if (jsonContent.length > 0) {
            // Load from uploaded json file
            // TODO: implement
            this.tracingController.setBezierPoints(JSON.parse(jsonContent));
        }
        this.tracingController.drawAllCurves();
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
            img.src = this.urls['referenceImages'] + imagePaths[currentPoint];
        }
    }

    /**
     * Change or set point location on current mouse position
     * @param {IPointBidimensional} point
     */
    markLandmarkPoint(landmarkName: string, point: IPointBidimensional): void {
        if (landmarkName.length > 0 && landmarkName !== 'Selecione') {
            const landmarkCanvas =
                this.canvasOdontoradiosis.getCanvas('landmarks');
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