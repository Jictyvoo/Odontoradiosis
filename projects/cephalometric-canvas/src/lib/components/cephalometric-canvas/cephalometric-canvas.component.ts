import { Component, OnInit } from '@angular/core';
import { CephalometricCanvasService } from '../../cephalometric-canvas.service';
import OdontoradiosisKeeper from '../../models/odontoradiosisKeeper';
import ScaleManager from '../../util/scaleManager';
import UsefulMethods from '../../util/usefulMethods';

@Component({
    selector: 'lib-cephalometric-canvas',
    templateUrl: './cephalometric-canvas.component.html',
    styleUrls: ['./cephalometric-canvas.component.scss'],
})
export class CephalometricCanvasComponent implements OnInit {
    constructor(
        private canvasService: CephalometricCanvasService,
        private infoKeeper: OdontoradiosisKeeper,
        private scaleManager: ScaleManager
    ) {}

    ngOnInit(): void {}

    ngAfterViewInit(): void {
        this.canvasService.init();
    }

    onMouseMove(event: PointerEvent): void {
        // mainController.manageMouseMove.call(mainController, event);
    }

    /**
     * Receive a event and manage when to select curve or landmark functions
     * @param event
     */
    onMouseDown(event: PointerEvent): void {
        // Save the current state of the canvas
        /*const splicedSource = currentObject.mainController.getUrl('image').split('/');
        hiddenForm.setAttribute('value',splicedSource[splicedSource.length - 2]+'/' +splicedSource[splicedSource.length - 1]);*/
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
    }
}
