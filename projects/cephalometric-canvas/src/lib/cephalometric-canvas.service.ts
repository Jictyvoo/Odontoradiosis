import { Injectable } from '@angular/core';
import LandmarksController from './controllers/subcontrollers/LandmarksController';
import TracingController from './controllers/subcontrollers/TracingController';
import SemiautomaticLandmarks from './features/semiautomatic_landmark/init';
import * as aJson from './features/semiautomatic_landmark/routines/a.ldmk.json';
import * as enaJson from './features/semiautomatic_landmark/routines/ena.ldmk.json';
import * as gnatioJson from './features/semiautomatic_landmark/routines/gnatio.ldmk.json';
import * as nasioJson from './features/semiautomatic_landmark/routines/nasio.ldmk.json';
import * as selaJson from './features/semiautomatic_landmark/routines/sela.ldmk.json';

@Injectable({
    providedIn: 'root',
})
export class CephalometricCanvasService {
    constructor() {}

    /**
     * Adding the semiautomatic landmark indentification feature
     * @param tracingController
     * @param landmarksController
     * @returns
     */
    public static newSemiautomaticLandmark(
        tracingController: TracingController,
        landmarksController: LandmarksController
    ): SemiautomaticLandmarks {
        return new SemiautomaticLandmarks(
            [aJson, enaJson, gnatioJson, nasioJson, selaJson],
            tracingController,
            landmarksController
        );
    }
}
