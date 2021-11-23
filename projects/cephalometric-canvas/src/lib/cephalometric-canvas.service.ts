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
import {
    ICanvasElements,
    ICanvasImage,
} from './domain/util/interfaces/canvasManipulation';
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
    private imageInfo: ICanvasImage;

    constructor(
        private infoKeeper: OdontoradiosisKeeper,
        private scaleManager: ScaleManager
    ) {
        this.imageInfo = { imageData: '', isLoaded: false };
    }

    public init(
        stackCanvas: HTMLElement,
        canvasElements?: ICanvasElements
    ): void {
        this.canvasOdontoradiosis = new CanvasOdontoradiosisImpl(
            stackCanvas,
            this.scaleManager,
            { image: 0, bezier: 1, landmarks: 2 }
        );

        if (canvasElements) {
            for (const canvasEntry of Object.entries(canvasElements)) {
                this.canvasOdontoradiosis.addCanvasElement(
                    canvasEntry[0],
                    canvasEntry[1]
                );
            }
        }

        this.imageEffects = new ImageEffects(this.canvasOdontoradiosis);
        this.mainController = new MainController(
            this.canvasOdontoradiosis,
            this.scaleManager,
            this.infoKeeper
        );

        // After the initialization of the canvas, the loaded image is displayed
        if (this.imageInfo.imageData.length > 0) {
            this.openImageOnCanvas(this.imageInfo.imageData);
            this.imageInfo.isLoaded = true;
        }
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

    public get isImageOpened(): boolean {
        return this.imageInfo.imageData.length > 0;
    }

    public openImageOnCanvas(imageData: string): void {
        this.mainController.tracingController.setBezierPoints();
        const self = this;
        this.canvasOdontoradiosis.openImage(imageData, function () {
            self.mainController.loadJsonCurve('');
            self.mainController.loadJsonLandmarks('');
        });
        this.imageEffects.reset();
    }

    public loadImage(imageData: string): void {
        this.imageInfo.imageData = imageData;
        if (this.imageInfo.isLoaded) {
            this.openImageOnCanvas(imageData);
        }
    }
}
