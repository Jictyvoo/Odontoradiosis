import ImageEffects from './domain/controllers/imageEffects';
import MainController from './domain/controllers/mainController';
import LandmarksController from './domain/controllers/subcontrollers/landmarksController';
import TracingController from './domain/controllers/subcontrollers/tracingController';
import SemiautomaticLandmarks from './domain/features/semiautomatic_landmark/init';
import OdontoradiosisKeeper from './domain/models/odontoradiosisKeeper';
import { IEffectValues } from './domain/util/interfaces/interfaces';
import { ICanvasDraw } from './domain/util/interfaces/views/canvasDraw';
import ScaleManager from './domain/util/scaleManager';
import * as i0 from "@angular/core";
export declare class CephalometricCanvasService {
    private infoKeeper;
    private scaleManager;
    private mainController;
    private canvasOdontoradiosis;
    private imageEffects;
    private imageLoaded;
    constructor(infoKeeper: OdontoradiosisKeeper, scaleManager: ScaleManager);
    init(stackCanvas: HTMLElement): void;
    /**
     * Adding the semiautomatic landmark indentification feature
     * @param tracingController
     * @param landmarksController
     * @returns
     */
    static newSemiautomaticLandmark(tracingController: TracingController, landmarksController: LandmarksController): SemiautomaticLandmarks;
    get effectsManager(): ImageEffects;
    get defaultEffectValues(): IEffectValues;
    get tracingController(): TracingController;
    get cephalometricCanvas(): ICanvasDraw;
    get controller(): MainController;
    get isImageOpened(): boolean;
    openImage(imageData: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CephalometricCanvasService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CephalometricCanvasService>;
}
