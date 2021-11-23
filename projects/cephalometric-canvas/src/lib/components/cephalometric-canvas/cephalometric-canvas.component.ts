import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CephalometricCanvasService } from '../../cephalometric-canvas.service';
import OdontoradiosisKeeper from '../../domain/models/odontoradiosisKeeper';
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
        const bezierCanvas = canvasController.getCanvas('bezier');
        const context = canvasController.getContext('bezier');
        context.translate(bezierCanvas.width / 2, bezierCanvas.height / 2);*/

        if (this.infoKeeper.isMouseDown && this.infoKeeper.isCurveFunction) {
            /* do drag things */
            canvasController.canvasCursor = 'move';

            const curveName = UsefulMethods.normalizeTracingName(
                this.infoKeeper.selectedOptions.curve
            );
            const referenceCanvas = canvasController.getCanvas('landmarks');
            const referenceContext = canvasController.getContext('landmarks');
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
                    /*still need to fix problem when rescale with top points*/
                    let scaleX =
                        currentPosition.x / this.infoKeeper.mousePosition.x;
                    if (boxVertexInfo.index < 2) {
                        scaleX =
                            this.infoKeeper.mousePosition.x / currentPosition.x;
                    }
                    let scaleY =
                        currentPosition.y / this.infoKeeper.mousePosition.y;
                    if (boxVertexInfo.index % 2 === 0) {
                        scaleY =
                            this.infoKeeper.mousePosition.y / currentPosition.y;
                    }
                    tracingController.rescaleBezier(curveName, scaleX, scaleY);
                } else if (this.infoKeeper.isOnCurvePoints != null) {
                    const curvePoints = this.infoKeeper
                        .isOnCurvePoints[0] as number[];
                    curvePoints[this.infoKeeper.isOnCurvePoints[1] as number] -=
                        this.infoKeeper.mousePosition.x - currentPosition.x;
                    curvePoints[this.infoKeeper.isOnCurvePoints[2] as number] -=
                        this.infoKeeper.mousePosition.y - currentPosition.y;
                } else if (this.infoKeeper.isInsideBox) {
                    tracingController.translateBezier(
                        curveName,
                        this.infoKeeper.mousePosition.x - currentPosition.x,
                        this.infoKeeper.mousePosition.y - currentPosition.y
                    );
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
                tracingController.drawCurveBox(curveName, true);
                tracingController.drawPointCircle(curveName);
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
        const currentCurve = this.infoKeeper.selectedOptions.curve;
        const curveName = UsefulMethods.normalizeTracingName(currentCurve);
        const tracingController = this.canvasService.tracingController;
        const canvasOdontoradiosis = this.canvasService.cephalometricCanvas;
        if (currentCurve.length <= 0 || currentCurve === 'Selecione') {
            this.infoKeeper.isCurveFunction = false;
            const landmarkName = this.infoKeeper.selectedOptions.landmark;
            this.canvasService.controller.markLandmarkPoint(landmarkName, {
                x: event.clientX,
                y: event.clientY,
            });
        } else if (tracingController.curveExists(curveName)) {
            this.infoKeeper.isCurveFunction = true;
            const points = tracingController.getBoxDimensions(curveName);
            const relativeMouse = this.scaleManager.getMousePos(
                canvasOdontoradiosis.getCanvas('bezier'),
                { x: event.clientX, y: event.clientY }
            );
            this.infoKeeper.isInsideBox =
                relativeMouse.x >= points[0] &&
                relativeMouse.x <= points[0] + points[2] &&
                relativeMouse.y >= points[1] &&
                relativeMouse.y <= points[1] + points[3];
            this.infoKeeper.isOnBoxVertex =
                tracingController.verifyMouseOnBoxVertex(
                    relativeMouse,
                    curveName
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
