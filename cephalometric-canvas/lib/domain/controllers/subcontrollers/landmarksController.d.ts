import { ILandmark, ILandmarkArray } from '../../util/interfaces/interfaces';
import { ICanvasDraw } from '../../util/interfaces/views/canvasDraw';
declare class LandmarksController {
    landmarks: ILandmarkArray;
    canvas: ICanvasDraw;
    private localRepository;
    private static color;
    /**
     *
     * @param {ICanvasDraw} canvasOdontoradiosis
     */
    constructor(canvasOdontoradiosis: ICanvasDraw);
    /**
     * @returns {ILandmarkArray} this.landmarks
     */
    getLandmarks(): ILandmarkArray;
    /**
     * Lardmarks setter
     * @param {ILandmarkArray} newLandmarks
     */
    setLandmarks(newLandmarks: ILandmarkArray): void;
    /**
     * Set a single landmark value
     * @param {string} name
     * @param {ILandmark} value
     */
    setLandmark(name: string, value?: ILandmark): void;
    /**
     * Verify if landmark exists. If not and toCreate is true, it'll create
     * @param {string} name
     * @param {boolean} toCreate
     * @returns {ILandmark}
     */
    verifyLandmark(name: string, toCreate?: boolean): ILandmark;
    /**
     * Save all landmarks in a hidden form
     */
    saveLandmarks(): void;
    /**
     * Draw a landmark with its name
     * @param {CanvasRenderingContext2D} canvasContext
     * @param {string} landmarkName
     */
    drawLandmark(canvasContext: CanvasRenderingContext2D, landmarkName: string): void;
    /**
     * Redraw all landmarks
     */
    redrawLandmarks(): void;
}
export default LandmarksController;
