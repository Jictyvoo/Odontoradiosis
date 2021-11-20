import { ElementRef, OnInit } from '@angular/core';
import { CephalometricCanvasService } from '../../cephalometric-canvas.service';
import OdontoradiosisKeeper from '../../domain/models/odontoradiosisKeeper';
import ScaleManager from '../../domain/util/scaleManager';
import * as i0 from "@angular/core";
export declare class CephalometricCanvasComponent implements OnInit {
    private canvasService;
    private infoKeeper;
    private scaleManager;
    stackCanvasElement: ElementRef<HTMLElement>;
    canvasImageElement: ElementRef<HTMLCanvasElement>;
    canvasBezierElement: ElementRef<HTMLCanvasElement>;
    canvasLandmarksElement: ElementRef<HTMLCanvasElement>;
    constructor(canvasService: CephalometricCanvasService, infoKeeper: OdontoradiosisKeeper, scaleManager: ScaleManager);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    onMouseMove(event: PointerEvent): void;
    /**
     * Receive a event and manage when to select curve or landmark functions
     * @param event
     */
    onMouseDown(event: PointerEvent): void;
    onMouseUp(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CephalometricCanvasComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CephalometricCanvasComponent, "lib-cephalometric-canvas", never, {}, {}, never, never>;
}
