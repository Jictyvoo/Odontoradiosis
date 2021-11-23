import { LocalRepositoryImpl } from '../../../infra/repositories/localStorage.repository';
import { ICanvasLayers } from '../../util/interfaces/canvasManipulation';
import { ILandmark, ILandmarkArray } from '../../util/interfaces/interfaces';
import { ILocalRepository } from '../../util/interfaces/repositories';
import { ICanvasDraw } from '../../util/interfaces/views/canvasDraw';

class LandmarksController {
    public landmarks: ILandmarkArray;
    public canvas: ICanvasDraw;
    private localRepository: ILocalRepository;
    private static color = Object.freeze({ fill: 'red', stroke: '#330005' });

    /**
     *
     * @param {ICanvasDraw} canvasOdontoradiosis
     */
    constructor(canvasOdontoradiosis: ICanvasDraw) {
        this.landmarks = {};
        this.canvas = canvasOdontoradiosis;
        this.localRepository = new LocalRepositoryImpl();
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
    setLandmark(name: string, value: ILandmark = { x: 0, y: 0 }): void {
        this.landmarks[name] = value;
    }

    /**
     * Verify if landmark exists. If not and toCreate is true, it'll create
     * @param {string} name
     * @param {boolean} toCreate
     * @returns {ILandmark}
     */
    verifyLandmark(name: string, toCreate: boolean = false): ILandmark {
        if (!this.landmarks[name] && toCreate) {
            this.landmarks[name] = { x: 0, y: 0 };
        }
        return this.landmarks[name];
    }

    /**
     * Save all landmarks in a hidden form
     */
    saveLandmarks(): void {
        const data_json = JSON.stringify(this.landmarks);
        this.localRepository.set('saved_points', data_json);
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
                ICanvasLayers.LANDMARKS,
                locations.x,
                locations.y,
                this.canvas.scales.pointRadius,
                1,
                LandmarksController.color.fill,
                LandmarksController.color.stroke
            );
            context.beginPath();
            context.fillStyle = LandmarksController.color.fill;
            context.font = this.canvas.scales.nameScale + 'px Arial';
            context.fillText(
                readyToShowName.toString(),
                Math.floor(
                    locations.x - this.canvas.scales.textRelativePosition.x
                ),
                Math.floor(
                    locations.y + this.canvas.scales.textRelativePosition.y
                )
            );
            context.fill();
            context.lineWidth = 1;
            context.strokeStyle = LandmarksController.color.stroke;
            context.stroke();
        }
    }

    /**
     * Redraw all landmarks
     */
    redrawLandmarks(): void {
        const landmarksCanvas = this.canvas.getCanvas(ICanvasLayers.LANDMARKS);
        const context = landmarksCanvas.getContext('2d');
        if (context) {
            /*context.clearRect(
                0,
                0,
                landmarksCanvas.width,
                landmarksCanvas.height
            );*/
            this.canvas.clearCanvas(ICanvasLayers.LANDMARKS);
            for (const element of Object.keys(this.landmarks)) {
                this.drawLandmark(context, element);
            }
        }
    }
}

export default LandmarksController;
