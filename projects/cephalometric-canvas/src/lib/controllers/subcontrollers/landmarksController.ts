import { ILandmark, ILandmarkArray } from '../../models/interfaces';
import { ILocalRepository } from '../../util/repositories/interface';
import { LocalRepositoryImpl } from '../../util/repositories/localStorage.repository';
import { default as CanvasOdontoradiosis } from '../../views/canvas';

class LandmarksController {
    public landmarks: ILandmarkArray;
    public canvas: CanvasOdontoradiosis;
    private localRepository: ILocalRepository;
    private static color = { fill: 'red', stroke: '#330005' };

    /**
     *
     * @param {CanvasOdontoradiosis} canvasOdontoradiosis
     */
    constructor(canvasOdontoradiosis: CanvasOdontoradiosis) {
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
                'landmarks',
                locations.x,
                locations.y,
                this.canvas.scaleManager.pointRadius,
                1,
                LandmarksController.color.fill,
                LandmarksController.color.stroke
            );
            context.beginPath();
            context.fillStyle = LandmarksController.color.fill;
            context.font = this.canvas.scaleManager.nameScale + 'px Arial';
            context.fillText(
                readyToShowName.toString(),
                Math.floor(
                    locations.x -
                        this.canvas.scaleManager.textRelativePosition.x
                ),
                Math.floor(
                    locations.y +
                        this.canvas.scaleManager.textRelativePosition.y
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
        const landmarksCanvas = this.canvas.getCanvas('landmarks');
        const context = landmarksCanvas.getContext(
            '2d'
        ) as CanvasRenderingContext2D;
        context.clearRect(0, 0, landmarksCanvas.width, landmarksCanvas.height);
        const self = this;
        Object.keys(this.landmarks).forEach(function (element, _index, _array) {
            self.drawLandmark.call(self, context, element);
        });
    }
}

export default LandmarksController;
