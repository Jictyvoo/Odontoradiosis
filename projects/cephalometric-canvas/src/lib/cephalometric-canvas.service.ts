import { Injectable } from '@angular/core';
import ImageEffects from './domain/controllers/imageEffects';
import MainController from './domain/controllers/mainController';
import TracingController from './domain/controllers/subcontrollers/tracingController';
import SemiautomaticLandmarks from './domain/features/semiautomatic_landmark/init';
import aJson from './domain/features/semiautomatic_landmark/routines/a.ldmk.json';
import bJson from './domain/features/semiautomatic_landmark/routines/b.ldmk.json';
import condilioJson from './domain/features/semiautomatic_landmark/routines/condilio.ldmk.json';
import enaJson from './domain/features/semiautomatic_landmark/routines/ena.ldmk.json';
import enpJson from './domain/features/semiautomatic_landmark/routines/enp.ldmk.json';
import fissuraPterigoMaxilarJson from './domain/features/semiautomatic_landmark/routines/fissuraPterigoMaxilar.ldmk.json';
import gnatioJson from './domain/features/semiautomatic_landmark/routines/gnatio.ldmk.json';
import gonioJson from './domain/features/semiautomatic_landmark/routines/gonio.ldmk.json';
import mentoJson from './domain/features/semiautomatic_landmark/routines/mento.ldmk.json';
import nasioJson from './domain/features/semiautomatic_landmark/routines/nasio.ldmk.json';
import orbitaleJson from './domain/features/semiautomatic_landmark/routines/orbitale.ldmk.json';
import palatoMoleJson from './domain/features/semiautomatic_landmark/routines/palatoMole.ldmk.json';
import pogonioJson from './domain/features/semiautomatic_landmark/routines/pogonio.ldmk.json';
import pogonioMoleJson from './domain/features/semiautomatic_landmark/routines/pogonioMole.ldmk.json';
import porioJson from './domain/features/semiautomatic_landmark/routines/porio.ldmk.json';
import proNasalJson from './domain/features/semiautomatic_landmark/routines/proNasal.ldmk.json';
import pterigoideJson from './domain/features/semiautomatic_landmark/routines/pterigoide.ldmk.json';
import selaJson from './domain/features/semiautomatic_landmark/routines/sela.ldmk.json';
import OdontoradiosisKeeper from './domain/models/odontoradiosisKeeper';
import {
    ICanvasElements,
    ICanvasImage,
    IExportableData,
} from './domain/util/interfaces/canvasManipulation';
import { IEffectValues } from './domain/util/interfaces/interfaces';
import {
    EStorageKey,
    ILocalRepository,
} from './domain/util/interfaces/repositories';
import { ICanvasDraw } from './domain/util/interfaces/views/canvasDraw';
import ScaleManager from './domain/util/scaleManager';
import { LocalRepositoryImpl } from './infra/repositories/localStorage.repository';
import CanvasOdontoradiosisImpl from './infra/views/canvasImpl';

@Injectable({
    providedIn: 'root',
})
export class CephalometricCanvasService {
    private mainController!: MainController;
    private canvasOdontoradiosis!: ICanvasDraw;
    private imageEffects!: ImageEffects;
    private imageInfo: ICanvasImage;
    private localRepository: ILocalRepository;
    private semiautomaticLandmarks?: SemiautomaticLandmarks;

    constructor(
        private infoKeeper: OdontoradiosisKeeper,
        private scaleManager: ScaleManager
    ) {
        this.localRepository = new LocalRepositoryImpl();

        const imageData = this.localRepository.get<string>(
            EStorageKey.IMAGE_DATA
        );
        this.imageInfo = {
            imageData: imageData ?? '',
            isLoaded: false,
            isFromStorage: !!imageData,
        };
        this.semiautomaticLandmarks = undefined;
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

    public openImageOnCanvas(imageData: string): void {
        const self = this;

        // Create closure to load elements after the image is loaded
        this.canvasOdontoradiosis.openImage(imageData, function (): void {
            if (self.imageInfo.isFromStorage) {
                self.mainController.loadAll();
            } else {
                self.mainController.loadJsonCurve('', true);
                self.mainController.loadJsonLandmarks('', true);
                self.mainController.saveAll();
            }

            self.mainController.tracingController.drawAllCurves();
            self.mainController.landmarksController.redrawLandmarks();
        });
        this.imageEffects.reset();
    }

    public loadImage(imageData: string): void {
        this.imageInfo.imageData = imageData;
        this.imageInfo.isFromStorage = false;
        this.semiautomaticLandmarks = undefined;
        // save the image data on local storage
        this.localRepository.set(EStorageKey.IMAGE_DATA, imageData);
        if (this.imageInfo.isLoaded) {
            this.openImageOnCanvas(imageData);
        }
    }

    public loadExportedData(exportedData: IExportableData): void {
        this.localRepository.set(EStorageKey.LANDMARKS, exportedData.landmarks);
        this.localRepository.set(
            EStorageKey.BEZIER_CURVES,
            exportedData.curves
        );
        this.loadImage(exportedData.imageData);
        this.imageInfo.isFromStorage = true;
    }

    public exportCephalometricData(): IExportableData {
        return {
            imageData: this.imageInfo.imageData,
            landmarks: this.mainController.landmarksController.landmarks,
            curves: this.mainController.tracingController.curvePoints,
        };
    }

    /**
     * Adding the semiautomatic landmark indentification feature
     * @returns
     */
    public markSemiautomatic(): void {
        const semiautomaticLandmarks =
            this.semiautomaticLandmarks ??
            new SemiautomaticLandmarks(
                [
                    aJson,
                    bJson,
                    enaJson,
                    gnatioJson,
                    nasioJson,
                    selaJson,
                    palatoMoleJson,
                    porioJson,
                    enpJson,
                    pogonioJson,
                    mentoJson,
                    gonioJson,
                    pterigoideJson,
                    orbitaleJson,
                    proNasalJson,
                    condilioJson,
                    pogonioMoleJson,
                    fissuraPterigoMaxilarJson,
                ],
                this.tracingController,
                this.mainController.landmarksController
            );
        if (semiautomaticLandmarks.start()) {
            this.mainController.landmarksController.saveLandmarks();
        }
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
}
