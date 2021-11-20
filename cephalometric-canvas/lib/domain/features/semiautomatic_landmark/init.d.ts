import { default as LandmarksController } from '../../controllers/subcontrollers/landmarksController';
import { default as TracingController } from '../../controllers/subcontrollers/tracingController';
import { IRoutineHelpVar, IRoutinesSemiautomatic } from '../../util/interfaces/interfaces.js';
import { IRoutineDescription, ISymbolTable } from './interfaces';
declare class SemiautomaticLandmarks {
    routinesDescription: IRoutinesSemiautomatic[];
    tracingController: TracingController;
    landmarksController: LandmarksController;
    symbolTable: ISymbolTable;
    helpVariables: IRoutineHelpVar;
    preFunctions: {
        [key: string]: any;
    };
    /**
     *
     * @param {array} routinesDescription Have all json data informing all routines
     * @param {TracingController} tracingController
     * @param {LandmarksController} landmarksController
     */
    constructor(routinesDescription: IRoutineDescription[], tracingController: TracingController, landmarksController: LandmarksController);
    generateButtonEvent(): void;
    /**
     * Start all routines
     */
    start(): boolean;
}
export default SemiautomaticLandmarks;
