import { LocalRepositoryImpl } from '../../../infra/repositories/localStorage.repository';
import { ICanvasLayers } from '../../util/interfaces/canvasManipulation';
import {
    ILandmark,
    ILandmarkArray,
} from '../../util/interfaces/landmarkManipulation';
import {
    EStorageKey,
    ILocalRepository,
} from '../../util/interfaces/repositories';
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
        this.canvas = canvasOdontoradiosis;
        this.localRepository = new LocalRepositoryImpl();

        this.landmarks = {};
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
     * Save all landmarks in the given repository
     */
    saveLandmarks(): void {
        this.localRepository.set(EStorageKey.LANDMARKS, this.landmarks);
    }

    /**
     * Load landmarks from local storage
     */
    loadLandmarks(jsonContent: string = ''): boolean {
        let decodedLandmarks: ILandmarkArray = {};
        if (jsonContent && jsonContent.length > 0) {
            decodedLandmarks = JSON.parse(jsonContent);
        } else {
            decodedLandmarks =
                this.localRepository.get<ILandmarkArray>(
                    EStorageKey.LANDMARKS
                ) ?? {};
        }

        // Make sure object is really valid
        if (Object.keys(decodedLandmarks).length > 0) {
            const validLandmarks: ILandmarkArray = {};
            for (const landmark of Object.entries(decodedLandmarks)) {
                const landmarkName = landmark[0];
                const landmarkPosition = landmark[1];

                if (typeof landmarkPosition == 'object') {
                    validLandmarks[landmarkName] = {
                        x: (landmarkPosition as any)?.x,
                        y: (landmarkPosition as any)?.y,
                    };
                }
            }
            this.setLandmarks(validLandmarks);

            return true;
        }
        return false;
    }

    /**
     * Draw a landmark with its name
     * @param {CanvasRenderingContext2D} canvasContext
     * @param {string} landmarkName
     */
    drawLandmark(landmarkName: string): void {
        const locations = this.landmarks[landmarkName];
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
            this.canvas.drawText(
                ICanvasLayers.LANDMARKS,
                Math.floor(
                    locations.x - this.canvas.scales.textRelativePosition.x
                ),
                Math.floor(
                    locations.y + this.canvas.scales.textRelativePosition.y
                ),
                readyToShowName.toString(),
                1,
                LandmarksController.color.fill,
                LandmarksController.color.stroke
            );
        }
    }

    /**
     * Redraw all landmarks
     */
    redrawLandmarks(): void {
        this.canvas.clearCanvas(ICanvasLayers.LANDMARKS);
        for (const element of Object.keys(this.landmarks)) {
            this.drawLandmark(element);
        }
    }
}

export default LandmarksController;
