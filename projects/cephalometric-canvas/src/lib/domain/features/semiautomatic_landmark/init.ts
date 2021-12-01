import { default as LandmarksController } from '../../controllers/subcontrollers/landmarksController';
import { default as TracingController } from '../../controllers/subcontrollers/tracingController';
import { AnatomicalTracingCurve } from '../../models/tracingCurve';
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
            // Initialize access to curves, to make sure that the routine only accesses the curves it needs
            const accessedCurves = new Map<string, AnatomicalTracingCurve>();
            for (const curveName of currentRoutine.accessed_curves) {
                const tracing = this.tracingController.getTracing(curveName);
                if (tracing) {
                    accessedCurves.set(curveName, tracing);
                }
            }

            const executor = new RoutineExecutor(
                accessedCurves,
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
