import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSlider } from '@angular/material/slider';
import {
    CephalometricCanvasService,
    OdontoradiosisKeeper,
    UsefulMethods,
} from 'cephalometric-canvas';
import { SidenavService } from 'src/services/sidenav.service';
import { AvailableEffects } from 'src/util/canvas-manipulation';
import { default as supportedCephalometric } from 'src/util/supported-cephalometric';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
    supportedCurves: string[];

    supportedPoints: string[];

    @ViewChild('sidenav')
    public sidenav!: MatSidenav;

    @ViewChild('selectedCurve')
    public selectedCurve!: MatSelect;

    /* All sidebar sliders */
    @ViewChild('effectContrastSlider')
    public effectContrastSlider!: MatSlider;

    @ViewChild('effectBrightnessSlider')
    public effectBrightnessSlider!: MatSlider;

    @ViewChild('effectInvertSlider')
    public effectInvertSlider!: MatSlider;

    @ViewChild('effectGrayscaleSlider')
    public effectGrayscaleSlider!: MatSlider;

    constructor(
        private sidenavService: SidenavService,
        private canvasService: CephalometricCanvasService,
        private infoKeeper: OdontoradiosisKeeper
    ) {
        this.supportedCurves = supportedCephalometric.supportedCurves;
        this.supportedPoints = supportedCephalometric.supportedPoints;
    }

    ngOnInit(): void {}

    ngAfterViewInit(): void {
        this.sidenavService.setSidenav(this.sidenav);
    }

    public undone(): void {
        const effectsManager = this.canvasService.effectsManager;
        effectsManager.reset();
        this.effectContrastSlider.value = effectsManager.contrast;
        this.effectBrightnessSlider.value = effectsManager.brightness;
        this.effectInvertSlider.value = effectsManager.invert;
        this.effectGrayscaleSlider.value = effectsManager.grayscale;
    }

    /**
     * Add Curve canvas event listener
     * @param curveName
     */
    public curveSelect(curveName: string): void {
        const tracingController = this.canvasService.tracingController;
        const canvasOdontoradiosis = this.canvasService.cephalometricCanvas;
        this.infoKeeper.selectedOptions.curve = '';
        tracingController.drawAllCurves();
        if (curveName !== 'Selecione') {
            const currentCurve = UsefulMethods.normalizeTracingName(curveName);
            if (tracingController.curveExists(currentCurve)) {
                tracingController.drawCurveBox.call(
                    tracingController,
                    currentCurve,
                    true
                );
                tracingController.drawPointCircle.call(
                    tracingController,
                    currentCurve
                );
                canvasOdontoradiosis.canvasCursor = 'move';
                this.infoKeeper.selectedOptions.curve = currentCurve;
            }
        } else {
            canvasOdontoradiosis.canvasCursor = 'crosshair';
        }
    }

    public landmarkSelect(landmarkName: string): void {
        const tracingController = this.canvasService.tracingController;
        const canvasOdontoradiosis = this.canvasService.cephalometricCanvas;
        this.infoKeeper.selectedOptions.landmark = landmarkName;
        if (!this.selectedCurve.empty) {
            this.selectedCurve.writeValue('');
            this.infoKeeper.selectedOptions.curve = '';
            tracingController.drawAllCurves();
            canvasOdontoradiosis.canvasCursor = 'crosshair';
        }
        //self.mainController.referenceLandmarks.call(self.mainController);
    }

    /**
     * Apply the effect to the canvas image only if the effect is enabled
     * @param effect
     * @param value
     */
    applyEffects(effect: string, value: number | null): void {
        const effectsManager = this.canvasService.effectsManager;
        switch (effect) {
            case AvailableEffects.GRAYSCALE:
                effectsManager.grayscale = value ?? 0;
                break;
            case AvailableEffects.INVERT:
                effectsManager.invert = value ?? 0;
                break;
            case AvailableEffects.BRIGHTNESS:
                effectsManager.brightness = value ?? 0;
                break;
            case AvailableEffects.CONTRAST:
                effectsManager.contrast = value ?? 0;
                break;
            default:
                effectsManager.grayscale = value ?? 0;
                break;
        }
        effectsManager.updateFilterValues();
    }

    get contrastValue(): number {
        return this.canvasService.defaultEffectValues.contrast;
    }

    get brightnessValue(): number {
        return this.canvasService.defaultEffectValues.brightness;
    }
}
