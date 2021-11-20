import { default as OdontoradiosisKepper } from '../models/odontoradiosisKeeper';
import { IPointBidimensional } from '../util/interfaces/interfaces';
import { ICanvasDraw } from '../util/interfaces/views/canvasDraw';
import { default as ScaleManager } from '../util/scaleManager';
import { default as LandmarksController } from './subcontrollers/landmarksController';
import { default as TracingController } from './subcontrollers/tracingController';
declare class MainController {
    canvasOdontoradiosis: ICanvasDraw;
    scaleManager: ScaleManager;
    tracingController: TracingController;
    landmarksController: LandmarksController;
    infoKeeper: OdontoradiosisKepper;
    /**
     * Constructor
     * @param {ICanvasDraw} canvasOdontoradiosis
     * @param {ScaleManager} scaleManager
     * @param {OdontoradiosisKepper} infoKeeper
     */
    constructor(canvasOdontoradiosis: ICanvasDraw, scaleManager: ScaleManager, infoKeeper: OdontoradiosisKepper);
    /**
     * Loads json file with landmarks location
     * @param {int} id image id
     */
    loadJsonLandmarks(jsonContent: string): void;
    /**
     * Loads json file with bezier anatomical tracing points
     * @param {string} jsonContent image id
     */
    loadJsonCurve(jsonContent: string): void;
    /**
     * Adapt reference landmarks
     */
    referenceLandmarks(): void;
    /**
     * Change or set point location on current mouse position
     * @param {IPointBidimensional} point
     */
    markLandmarkPoint(landmarkName: string, point: IPointBidimensional): void;
}
export default MainController;
