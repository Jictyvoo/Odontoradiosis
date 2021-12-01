import { default as LandmarksController } from '../../controllers/subcontrollers/landmarksController';
import { default as TracingController } from '../../controllers/subcontrollers/tracingController';
import { RoutineExecutor } from './controllers/routine_executor';
import { IRoutineDescription } from './interfaces';

class SemiautomaticLandmarks {
    public routinesDescription: IRoutineDescription[];
    public tracingController: TracingController;
    public landmarksController: LandmarksController;

    /**
     *
     * @param {array} routinesDescription Have all json data informing all routines
     * @param {TracingController} tracingController
     * @param {LandmarksController} landmarksController
     */
    constructor(
        routinesDescription: IRoutineDescription[],
        tracingController: TracingController,
        landmarksController: LandmarksController
    ) {
        this.routinesDescription = routinesDescription;
        this.tracingController = tracingController;
        this.landmarksController = landmarksController;
    }

    /**
     * Start all routines
     */
    public start(): boolean {
        for (const currentRoutine of this.routinesDescription) {
            const executor = new RoutineExecutor(
                this.tracingController,
                this.landmarksController,
                currentRoutine
            );
            executor.start();
        }
        this.landmarksController.redrawLandmarks();
        return true;
    }
}

export default SemiautomaticLandmarks;
