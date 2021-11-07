import { Injectable } from '@angular/core';
import ImageEffects from './domain/controllers/imageEffects';
import MainController from './domain/controllers/mainController';
import LandmarksController from './domain/controllers/subcontrollers/landmarksController';
import TracingController from './domain/controllers/subcontrollers/tracingController';
import SemiautomaticLandmarks from './domain/features/semiautomatic_landmark/init';
import aJson from './domain/features/semiautomatic_landmark/routines/a.ldmk.json';
import enaJson from './domain/features/semiautomatic_landmark/routines/ena.ldmk.json';
import gnatioJson from './domain/features/semiautomatic_landmark/routines/gnatio.ldmk.json';
import nasioJson from './domain/features/semiautomatic_landmark/routines/nasio.ldmk.json';
import selaJson from './domain/features/semiautomatic_landmark/routines/sela.ldmk.json';
import OdontoradiosisKeeper from './domain/models/odontoradiosisKeeper';
import { IEffectValues } from './domain/util/interfaces/interfaces';
import { ICanvasDraw } from './domain/util/interfaces/views/canvasDraw';
import ScaleManager from './domain/util/scaleManager';
import CanvasOdontoradiosisImpl from './infra/views/canvasImpl';

@Injectable({
    providedIn: 'root',
})
export class CephalometricCanvasService {
    private mainController!: MainController;
    private canvasOdontoradiosis!: ICanvasDraw;
    private imageEffects!: ImageEffects;

    constructor(
        private infoKeeper: OdontoradiosisKeeper,
        private scaleManager: ScaleManager
    ) {}

    public init(): void {
        this.canvasOdontoradiosis = new CanvasOdontoradiosisImpl(
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

    public get effectsManager(): ImageEffects {
        return this.imageEffects;
    }

    public get defaultEffectValues(): IEffectValues {
        return ImageEffects.defaultValues;
    }

    public get tracingController(): TracingController {
        return this.mainController.tracingController;
    }

    public get cephalometricCanvas(): ICanvasDraw {
        return this.mainController.canvasOdontoradiosis;
    }

    public get controller(): MainController {
        return this.mainController;
    }

    public openImage(path: string = '', id: number = -1): void {
        this.mainController.tracingController.setBezierPoints();
        this.mainController.setUrl('image', path);
        const self = this;
        this.canvasOdontoradiosis.openImage(path, function () {
            self.mainController.loadJsonCurve('');
            self.mainController.loadJsonLandmarks(id);
        });
        this.imageEffects.reset();
    }
}
