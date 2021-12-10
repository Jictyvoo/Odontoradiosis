import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CephalometricCanvasService } from '../../cephalometric-canvas.service';
import OdontoradiosisKeeper from '../../domain/models/odontoradiosisKeeper';
import { ICanvasLayers } from '../../domain/util/interfaces/canvasManipulation';
import { IPointBidimensional } from '../../domain/util/interfaces/interfaces';
import ScaleManager from '../../domain/util/scaleManager';
import UsefulMethods from '../../domain/util/usefulMethods';

@Component({
    selector: 'lib-cephalometric-canvas',
    templateUrl: './cephalometric-canvas.component.html',
    styleUrls: ['./cephalometric-canvas.component.scss'],
})
export class CephalometricCanvasComponent implements OnInit {
    @ViewChild('stackCanvas')
    stackCanvasElement!: ElementRef<HTMLElement>;

    @ViewChild('canvasImage')
    canvasImageElement!: ElementRef<HTMLCanvasElement>;

    @ViewChild('canvasBezier')
    canvasBezierElement!: ElementRef<HTMLCanvasElement>;

    @ViewChild('canvasLandmarks')
    canvasLandmarksElement!: ElementRef<HTMLCanvasElement>;

    constructor(
        private canvasService: CephalometricCanvasService,
        private infoKeeper: OdontoradiosisKeeper,
        private scaleManager: ScaleManager
    ) {}

    ngOnInit(): void {}

    ngAfterViewInit(): void {
        this.canvasService.init(this.stackCanvasElement.nativeElement, {
            image: this.canvasImageElement.nativeElement,
            bezier: this.canvasBezierElement.nativeElement,
            landmarks: this.canvasLandmarksElement.nativeElement,
        });
    }

    onMouseMove(event: PointerEvent): void {
        event.preventDefault();
        event.stopPropagation(); // tell the browser we're handling this event

        const canvasController = this.canvasService.cephalometricCanvas;
        const tracingController = this.canvasService.tracingController;

        /* For some reason the code below for context translate exists. This is bugging clear the canvas.
        const bezierCanvas = canvasController.getCanvas(ICanvasLayers.ANATOMICAL_TRACING);
        const context = canvasController.getContext(ICanvasLayers.ANATOMICAL_TRACING);
        context.translate(bezierCanvas.width / 2, bezierCanvas.height / 2);*/

        if (this.infoKeeper.isMouseDown && this.infoKeeper.isCurveFunction) {
            /* do drag things */
            canvasController.canvasCursor = 'move';

            const curveName = this.infoKeeper.selectedOptions.curve;
            const referenceCanvas = canvasController.getCanvas(
                ICanvasLayers.LANDMARKS
            );
            const referenceContext = canvasController.getContext(
                ICanvasLayers.LANDMARKS
            );
            const referenceRect = referenceCanvas.getBoundingClientRect();

            const currentPosition: IPointBidimensional = {
                x: this.scaleManager.dynamicCanvasScale(
                    event.clientX,
                    true,
                    referenceContext,
                    referenceRect
                ),
                y: this.scaleManager.dynamicCanvasScale(
                    event.clientY,
                    false,
                    referenceContext,
                    referenceRect
                ),
            };

            if (this.infoKeeper.mousePosition.disabled) {
                this.infoKeeper.mousePosition.x = currentPosition.x;
                this.infoKeeper.mousePosition.y = currentPosition.y;
                this.infoKeeper.mousePosition.disabled = false;
            } else {
                const boxVertexInfo = this.infoKeeper.isOnBoxVertex;
                if (boxVertexInfo.isOn) {
                    const scales: IPointBidimensional = {
                        x: currentPosition.x / this.infoKeeper.mousePosition.x,
                        y: currentPosition.y / this.infoKeeper.mousePosition.y,
                    };
                    if (boxVertexInfo.index < 2) {
                        scales.x =
                            this.infoKeeper.mousePosition.x / currentPosition.x;
                    }
                    if (boxVertexInfo.index % 2 === 0) {
                        scales.y =
                            this.infoKeeper.mousePosition.y / currentPosition.y;
                    }

                    // TODO: Make scales be attached with one of the points. This way maybe the edge selected can follow the mouse.
                    if (this.infoKeeper.selectedOptions.isAllCurves) {
                        tracingController.rescaleAllCurves(scales);
                    } else {
                        tracingController.rescaleBezier(
                            curveName,
                            scales.x,
                            scales.y
                        );
                    }
                } else if (this.infoKeeper.isOnCurvePoints != null) {
                    const curvePoints = this.infoKeeper.isOnCurvePoints.element;
                    curvePoints[this.infoKeeper.isOnCurvePoints.x] -=
                        this.infoKeeper.mousePosition.x - currentPosition.x;
                    curvePoints[this.infoKeeper.isOnCurvePoints.y] -=
                        this.infoKeeper.mousePosition.y - currentPosition.y;
                } else if (this.infoKeeper.isInsideBox) {
                    const movement: IPointBidimensional = {
                        x: this.infoKeeper.mousePosition.x - currentPosition.x,
                        y: this.infoKeeper.mousePosition.y - currentPosition.y,
                    };
                    if (this.infoKeeper.selectedOptions.isAllCurves) {
                        tracingController.translateAllCurves(movement);
                    } else {
                        tracingController.translateBezier(
                            curveName,
                            movement.x,
                            movement.y
                        );
                    }
                } else {
                    let angle = UsefulMethods.calculateAngle(
                        currentPosition,
                        this.infoKeeper.mousePosition
                    );
                    if (!isNaN(angle)) {
                        angle *= UsefulMethods.highLowAngle(
                            this.infoKeeper.mousePosition,
                            {
                                x: currentPosition.x,
                                y: currentPosition.y,
                            }
                        );
                        tracingController.rotateBezier(curveName, angle);
                    }
                }
                this.infoKeeper.mousePosition.x = currentPosition.x;
                this.infoKeeper.mousePosition.y = currentPosition.y;
                this.infoKeeper.mousePosition.disabled = false;
                tracingController.drawAllCurves();
                if (this.infoKeeper.selectedOptions.isAllCurves) {
                    tracingController.drawEntireCurveBox(true);
                } else {
                    tracingController.drawCurveBox(curveName, true);
                    tracingController.drawPointCircle(curveName);
                }
            }
        } else if (this.infoKeeper.isCurveFunction) {
            canvasController.canvasCursor = 'crosshair';
        }
    }

    /**
     * Receive a event and manage when to select curve or landmark functions
     * @param event
     */
    onMouseDown(event: PointerEvent): void {
        this.infoKeeper.isMouseDown = true;

        // Start handling the mouse position
        const curveName = this.infoKeeper.selectedOptions.curve;
        const tracingController = this.canvasService.tracingController;
        const canvasOdontoradiosis = this.canvasService.cephalometricCanvas;
        if (curveName.length <= 0 || curveName === 'selecione') {
            this.infoKeeper.isCurveFunction = false;
            const landmarkName = this.infoKeeper.selectedOptions.landmark;
            this.canvasService.controller.markLandmarkPoint(landmarkName, {
                x: event.clientX,
                y: event.clientY,
            });
        } else if (
            tracingController.curveExists(curveName) ||
            this.infoKeeper.selectedOptions.isAllCurves
        ) {
            this.infoKeeper.isCurveFunction = true;
            const relativeMouse = this.scaleManager.getMousePos(
                canvasOdontoradiosis.getCanvas(
                    ICanvasLayers.ANATOMICAL_TRACING
                ),
                { x: event.clientX, y: event.clientY }
            );
            this.infoKeeper.isInsideBox = tracingController.verifyMouseInBox(
                relativeMouse,
                curveName,
                this.infoKeeper.selectedOptions.isAllCurves
            );

            this.infoKeeper.isOnBoxVertex =
                tracingController.verifyMouseOnBoxVertex(
                    relativeMouse,
                    curveName,
                    this.infoKeeper.selectedOptions.isAllCurves
                );
            this.infoKeeper.isOnCurvePoints =
                tracingController.verifyMouseOnCurvePoint(
                    relativeMouse,
                    curveName
                );
        }
    }

    onMouseUp(): void {
        this.infoKeeper.isMouseDown = false;
        this.infoKeeper.isInsideBox = false;
        this.infoKeeper.isOnBoxVertex = { isOn: false, index: 0 };
        this.infoKeeper.isOnCurvePoints = null;

        /*this.infoKeeper.mousePosition.x = null;
        this.infoKeeper.mousePosition.y = null;*/
        this.infoKeeper.mousePosition.disabled = true;
        const tracingController = this.canvasService.tracingController;
        tracingController.saveBezierCurve();
    }
}
