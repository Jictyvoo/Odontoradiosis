import { Injectable } from '@angular/core';
import ImageEffects from './controllers/ImageEffects';
import MainController from './controllers/MainController';
import LandmarksController from './controllers/subcontrollers/LandmarksController';
import TracingController from './controllers/subcontrollers/TracingController';
import EventsOdontoradiosis from './events/EventsController';
import SemiautomaticLandmarks from './features/semiautomatic_landmark/init';
import * as aJson from './features/semiautomatic_landmark/routines/a.ldmk.json';
import * as enaJson from './features/semiautomatic_landmark/routines/ena.ldmk.json';
import * as gnatioJson from './features/semiautomatic_landmark/routines/gnatio.ldmk.json';
import * as nasioJson from './features/semiautomatic_landmark/routines/nasio.ldmk.json';
import * as selaJson from './features/semiautomatic_landmark/routines/sela.ldmk.json';
import OdontoradiosisKeeper from './models/OdontoradiosisKeeper';
import ScaleManager from './util/ScaleManager';
import CanvasOdontoradiosis from './views/Canvas';

@Injectable({
    providedIn: 'root',
})
export class CephalometricCanvasService {
    private mainController: MainController;
    private infoKeeper: OdontoradiosisKeeper;
    private scaleManager: ScaleManager;
    private canvasOdontoradiosis: CanvasOdontoradiosis;
    private imageEffects: ImageEffects;

    constructor() {
        this.scaleManager = new ScaleManager();
        this.infoKeeper = new OdontoradiosisKeeper();

        this.canvasOdontoradiosis = new CanvasOdontoradiosis(
            document.getElementById('stack-canvas') as HTMLElement,
            this.scaleManager,
            { image: 0, bezier: 1, landmarks: 2 }
        );

        this.imageEffects = new ImageEffects(this.canvasOdontoradiosis);
        this.mainController = new MainController(
            {
                image: '',
                curves: '/public/js/bezier_curves.json',
                landmarks: 'landmarks_url(temporary by file loaded)',
                referenceImages: 'reference_images_url',
            },
            this.canvasOdontoradiosis,
            this.scaleManager,
            this.infoKeeper
        );
    }

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
        // semiautomaticLandmarks.generateButtonEvent();
    }

    public applyEvents(): void {
        const eventsController = new EventsOdontoradiosis(
            this.mainController,
            this.infoKeeper,
            this.imageEffects
        );
        eventsController.applyAllEvents();
    }

    public openImage(path: string = '', id: number = -1): void {
        this.mainController.tracingController.setBezierPoints();
        this.mainController.setUrl('image', path);
        const self = this;
        this.canvasOdontoradiosis.openImage(path, function () {
            self.mainController.loadJsonCurve(id);
            self.mainController.loadJsonLandmarks(id);
        });
        this.imageEffects.reset();
    }
}
