import { default as LandmarksController } from './subcontrollers/landmarksController';
import { default as TracingController } from './subcontrollers/tracingController';
class MainController {
    /**
     * Constructor
     * @param {ICanvasDraw} canvasOdontoradiosis
     * @param {ScaleManager} scaleManager
     * @param {OdontoradiosisKepper} infoKeeper
     */
    constructor(canvasOdontoradiosis, scaleManager, infoKeeper) {
        this.canvasOdontoradiosis = canvasOdontoradiosis;
        this.scaleManager = scaleManager;
        this.tracingController = new TracingController(canvasOdontoradiosis);
        this.landmarksController = new LandmarksController(canvasOdontoradiosis);
        this.infoKeeper = infoKeeper;
    }
    /**
     * Loads json file with landmarks location
     * @param {int} id image id
     */
    loadJsonLandmarks(jsonContent) {
        if (jsonContent.length > 0) {
            const decodedLandmarks = JSON.parse(jsonContent);
            const validLandmarks = {};
            for (const landmark of Object.entries(decodedLandmarks)) {
                const landmarkName = landmark[0];
                const landmarkPosition = landmark[1];
                if (typeof landmarkPosition == 'object') {
                    validLandmarks[landmarkName] = {
                        x: landmarkPosition?.x,
                        y: landmarkPosition?.y,
                    };
                }
            }
            this.landmarksController.setLandmarks(validLandmarks);
            this.landmarksController.redrawLandmarks();
        }
    }
    /**
     * Loads json file with bezier anatomical tracing points
     * @param {string} jsonContent image id
     */
    loadJsonCurve(jsonContent) {
        // Load JsonCurves from default json file
        this.tracingController.setBezierPoints();
        if (jsonContent.length > 0) {
            // Load from uploaded json file
            // TODO: implement
            this.tracingController.setBezierPoints(JSON.parse(jsonContent));
        }
        this.tracingController.drawAllCurves();
    }
    /**
     * Adapt reference landmarks
     */
    referenceLandmarks() {
        const currentLandmark = this.infoKeeper.selectedOptions.landmark;
        const imagePaths = {};
        imagePaths['Sela (S)'] = 'selaTurcica.png';
        imagePaths['Násio (N)'] = 'nasio.png';
        imagePaths['Espinha nasal anterior (ENA)'] = 'ENA.png';
        imagePaths['Espinha nasal posterior (ENP)'] = 'ENP.png';
        imagePaths['Ponto subespinhal (A)'] = 'A.png';
        imagePaths['Ponto pupramental (B)'] = 'B.png';
        imagePaths['Pogônio (Pog)'] = 'pogonio.png';
        imagePaths['Gnátio (Gn)'] = 'Gnatio.png';
        imagePaths['Mento (Me)'] = 'mento.png';
        imagePaths['Condílio (Co)'] = 'condilio.png';
        imagePaths['Pró-nasal (Pn)'] = 'proNasal.png';
        imagePaths['Pogônio Mole (Pg)'] = 'pogonioMole.png';
        imagePaths['Palato Mole (pm)'] = 'palatoMole.png';
        imagePaths['Gônio (Go)'] = '';
        imagePaths['Órbitário (Or)'] = '';
        imagePaths['Pório (Po)'] = '';
        imagePaths['Ponta do Nariz (PtN)'] = '';
        imagePaths['Fossa Ptérigo Maxilar (Fpm)'] = '';
        imagePaths['Pterigóide (Pt)'] = '';
        if (currentLandmark !== 'Selecione' && imagePaths[currentLandmark]) {
            const img = new Image();
            const referenceCanvas = document.getElementById('referenceLandmark');
            if (referenceCanvas.getContext) {
                const context = referenceCanvas.getContext('2d');
                img.onload = function () {
                    context.canvas.width = img.width; //maybe don't work
                    context.canvas.height = img.height;
                    const canvasReferenceElement = document.getElementById('canvas-reference');
                    canvasReferenceElement.setAttribute('style', 'height: ' +
                        context.canvas.height +
                        'px' +
                        'width: ' +
                        context.canvas.width +
                        'px');
                    context.drawImage(img, 0, 0, context.canvas.width, context.canvas.height); //draw background image
                    context.fillStyle = 'rgba(1, 1, 1, 0)'; //draw a box over the top
                };
            }
            /*img.src =
                this.urls['referenceImages'] + imagePaths[currentLandmark];*/
        }
    }
    /**
     * Change or set point location on current mouse position
     * @param {IPointBidimensional} point
     */
    markLandmarkPoint(landmarkName, point) {
        if (landmarkName.length > 0 && landmarkName !== 'Selecione') {
            const landmarkCanvas = this.canvasOdontoradiosis.getCanvas('landmarks');
            const currentLandmark = this.landmarksController.verifyLandmark(landmarkName, true);
            const currentMousePosition = this.scaleManager.getMousePos(landmarkCanvas, point);
            currentLandmark.x = currentMousePosition.x;
            currentLandmark.y = currentMousePosition.y;
            this.landmarksController.saveLandmarks();
            this.landmarksController.redrawLandmarks();
        }
    }
}
export default MainController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbkNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jZXBoYWxvbWV0cmljLWNhbnZhcy9zcmMvbGliL2RvbWFpbi9jb250cm9sbGVycy9tYWluQ29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFRQSxPQUFPLEVBQUUsT0FBTyxJQUFJLG1CQUFtQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDdEYsT0FBTyxFQUFFLE9BQU8sSUFBSSxpQkFBaUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBRWxGLE1BQU0sY0FBYztJQU9oQjs7Ozs7T0FLRztJQUNILFlBQ0ksb0JBQWlDLEVBQ2pDLFlBQTBCLEVBQzFCLFVBQWdDO1FBRWhDLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxvQkFBb0IsQ0FBQztRQUNqRCxJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztRQUNqQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxpQkFBaUIsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQ3JFLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLG1CQUFtQixDQUM5QyxvQkFBb0IsQ0FDdkIsQ0FBQztRQUNGLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO0lBQ2pDLENBQUM7SUFFRDs7O09BR0c7SUFDSSxpQkFBaUIsQ0FBQyxXQUFtQjtRQUN4QyxJQUFJLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ3hCLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUVqRCxNQUFNLGNBQWMsR0FBbUIsRUFBRSxDQUFDO1lBQzFDLEtBQUssTUFBTSxRQUFRLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO2dCQUNyRCxNQUFNLFlBQVksR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pDLE1B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Q1IsQ0FBQztZQUNGLGVBQWUsQ0FBQyxDQUFDLEdBQUcsb0JBQW9CLENBQUMsQ0FBQyxDQUFDO1lBQzNDLGVBQWUsQ0FBQyxDQUFDLEdBQUcsb0JBQW9CLENBQUMsQ0FBQyxDQUFDO1lBRTNDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUN6QyxJQUFJLENBQUMsbUJBQW1CLENBQUMsZUFBZSxFQUFFLENBQUM7U0FDOUM7SUFDTCxDQUFDO0NBQ0o7QUFFRCxlQUFlLGNBQWMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGRlZmF1bHQgYXMgT2RvbnRvcmFkaW9zaXNLZXBwZXIgfSBmcm9tICcuLi9tb2RlbHMvb2RvbnRvcmFkaW9zaXNLZWVwZXInO1xyXG5pbXBvcnQge1xyXG4gICAgSUxhbmRtYXJrQXJyYXksXHJcbiAgICBJUG9pbnRCaWRpbWVuc2lvbmFsLFxyXG4gICAgSVN0cmluZ01hcCxcclxufSBmcm9tICcuLi91dGlsL2ludGVyZmFjZXMvaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7IElDYW52YXNEcmF3IH0gZnJvbSAnLi4vdXRpbC9pbnRlcmZhY2VzL3ZpZXdzL2NhbnZhc0RyYXcnO1xyXG5pbXBvcnQgeyBkZWZhdWx0IGFzIFNjYWxlTWFuYWdlciB9IGZyb20gJy4uL3V0aWwvc2NhbGVNYW5hZ2VyJztcclxuaW1wb3J0IHsgZGVmYXVsdCBhcyBMYW5kbWFya3NDb250cm9sbGVyIH0gZnJvbSAnLi9zdWJjb250cm9sbGVycy9sYW5kbWFya3NDb250cm9sbGVyJztcclxuaW1wb3J0IHsgZGVmYXVsdCBhcyBUcmFjaW5nQ29udHJvbGxlciB9IGZyb20gJy4vc3ViY29udHJvbGxlcnMvdHJhY2luZ0NvbnRyb2xsZXInO1xyXG5cclxuY2xhc3MgTWFpbkNvbnRyb2xsZXIge1xyXG4gICAgcHVibGljIGNhbnZhc09kb250b3JhZGlvc2lzOiBJQ2FudmFzRHJhdztcclxuICAgIHB1YmxpYyBzY2FsZU1hbmFnZXI6IFNjYWxlTWFuYWdlcjtcclxuICAgIHB1YmxpYyB0cmFjaW5nQ29udHJvbGxlcjogVHJhY2luZ0NvbnRyb2xsZXI7XHJcbiAgICBwdWJsaWMgbGFuZG1hcmtzQ29udHJvbGxlcjogTGFuZG1hcmtzQ29udHJvbGxlcjtcclxuICAgIHB1YmxpYyBpbmZvS2VlcGVyOiBPZG9udG9yYWRpb3Npc0tlcHBlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbnN0cnVjdG9yXHJcbiAgICAgKiBAcGFyYW0ge0lDYW52YXNEcmF3fSBjYW52YXNPZG9udG9yYWRpb3Npc1xyXG4gICAgICogQHBhcmFtIHtTY2FsZU1hbmFnZXJ9IHNjYWxlTWFuYWdlclxyXG4gICAgICogQHBhcmFtIHtPZG9udG9yYWRpb3Npc0tlcHBlcn0gaW5mb0tlZXBlclxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBjYW52YXNPZG9udG9yYWRpb3NpczogSUNhbnZhc0RyYXcsXHJcbiAgICAgICAgc2NhbGVNYW5hZ2VyOiBTY2FsZU1hbmFnZXIsXHJcbiAgICAgICAgaW5mb0tlZXBlcjogT2RvbnRvcmFkaW9zaXNLZXBwZXJcclxuICAgICkge1xyXG4gICAgICAgIHRoaXMuY2FudmFzT2RvbnRvcmFkaW9zaXMgPSBjYW52YXNPZG9udG9yYWRpb3NpcztcclxuICAgICAgICB0aGlzLnNjYWxlTWFuYWdlciA9IHNjYWxlTWFuYWdlcjtcclxuICAgICAgICB0aGlzLnRyYWNpbmdDb250cm9sbGVyID0gbmV3IFRyYWNpbmdDb250cm9sbGVyKGNhbnZhc09kb250b3JhZGlvc2lzKTtcclxuICAgICAgICB0aGlzLmxhbmRtYXJrc0NvbnRyb2xsZXIgPSBuZXcgTGFuZG1hcmtzQ29udHJvbGxlcihcclxuICAgICAgICAgICAgY2FudmFzT2RvbnRvcmFkaW9zaXNcclxuICAgICAgICApO1xyXG4gICAgICAgIHRoaXMuaW5mb0tlZXBlciA9IGluZm9LZWVwZXI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMb2FkcyBqc29uIGZpbGUgd2l0aCBsYW5kbWFya3MgbG9jYXRpb25cclxuICAgICAqIEBwYXJhbSB7aW50fSBpZCBpbWFnZSBpZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbG9hZEpzb25MYW5kbWFya3MoanNvbkNvbnRlbnQ6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIGlmIChqc29uQ29udGVudC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRlY29kZWRMYW5kbWFya3MgPSBKU09OLnBhcnNlKGpzb25Db250ZW50KTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHZhbGlkTGFuZG1hcmtzOiBJTGFuZG1hcmtBcnJheSA9IHt9O1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGxhbmRtYXJrIG9mIE9iamVjdC5lbnRyaWVzKGRlY29kZWRMYW5kbWFya3MpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBsYW5kbWFya05hbWUgPSBsYW5kbWFya1swXTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGxhbmRtYXJrUG9zaXRpb24gPSBsYW5kbWFya1sxXTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGxhbmRtYXJrUG9zaXRpb24gPT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZExhbmRtYXJrc1tsYW5kbWFya05hbWVdID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB4OiAobGFuZG1hcmtQb3NpdGlvbiBhcyBhbnkpPy54LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB5OiAobGFuZG1hcmtQb3NpdGlvbiBhcyBhbnkpPy55LFxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5sYW5kbWFya3NDb250cm9sbGVyLnNldExhbmRtYXJrcyh2YWxpZExhbmRtYXJrcyk7XHJcbiAgICAgICAgICAgIHRoaXMubGFuZG1hcmtzQ29udHJvbGxlci5yZWRyYXdMYW5kbWFya3MoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMb2FkcyBqc29uIGZpbGUgd2l0aCBiZXppZXIgYW5hdG9taWNhbCB0cmFjaW5nIHBvaW50c1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGpzb25Db250ZW50IGltYWdlIGlkXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBsb2FkSnNvbkN1cnZlKGpzb25Db250ZW50OiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICAvLyBMb2FkIEpzb25DdXJ2ZXMgZnJvbSBkZWZhdWx0IGpzb24gZmlsZVxyXG4gICAgICAgIHRoaXMudHJhY2luZ0NvbnRyb2xsZXIuc2V0QmV6aWVyUG9pbnRzKCk7XHJcbiAgICAgICAgaWYgKGpzb25Db250ZW50Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgLy8gTG9hZCBmcm9tIHVwbG9hZGVkIGpzb24gZmlsZVxyXG4gICAgICAgICAgICAvLyBUT0RPOiBpbXBsZW1lbnRcclxuICAgICAgICAgICAgdGhpcy50cmFjaW5nQ29udHJvbGxlci5zZXRCZXppZXJQb2ludHMoSlNPTi5wYXJzZShqc29uQ29udGVudCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnRyYWNpbmdDb250cm9sbGVyLmRyYXdBbGxDdXJ2ZXMoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkYXB0IHJlZmVyZW5jZSBsYW5kbWFya3NcclxuICAgICAqL1xyXG4gICAgcmVmZXJlbmNlTGFuZG1hcmtzKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGN1cnJlbnRMYW5kbWFyayA9IHRoaXMuaW5mb0tlZXBlci5zZWxlY3RlZE9wdGlvbnMubGFuZG1hcms7XHJcbiAgICAgICAgY29uc3QgaW1hZ2VQYXRoczogSVN0cmluZ01hcCA9IHt9O1xyXG4gICAgICAgIGltYWdlUGF0aHNbJ1NlbGEgKFMpJ10gPSAnc2VsYVR1cmNpY2EucG5nJztcclxuICAgICAgICBpbWFnZVBhdGhzWydOw6FzaW8gKE4pJ10gPSAnbmFzaW8ucG5nJztcclxuICAgICAgICBpbWFnZVBhdGhzWydFc3BpbmhhIG5hc2FsIGFudGVyaW9yIChFTkEpJ10gPSAnRU5BLnBuZyc7XHJcbiAgICAgICAgaW1hZ2VQYXRoc1snRXNwaW5oYSBuYXNhbCBwb3N0ZXJpb3IgKEVOUCknXSA9ICdFTlAucG5nJztcclxuICAgICAgICBpbWFnZVBhdGhzWydQb250byBzdWJlc3BpbmhhbCAoQSknXSA9ICdBLnBuZyc7XHJcbiAgICAgICAgaW1hZ2VQYXRoc1snUG9udG8gcHVwcmFtZW50YWwgKEIpJ10gPSAnQi5wbmcnO1xyXG4gICAgICAgIGltYWdlUGF0aHNbJ1BvZ8O0bmlvIChQb2cpJ10gPSAncG9nb25pby5wbmcnO1xyXG4gICAgICAgIGltYWdlUGF0aHNbJ0duw6F0aW8gKEduKSddID0gJ0duYXRpby5wbmcnO1xyXG4gICAgICAgIGltYWdlUGF0aHNbJ01lbnRvIChNZSknXSA9ICdtZW50by5wbmcnO1xyXG4gICAgICAgIGltYWdlUGF0aHNbJ0NvbmTDrWxpbyAoQ28pJ10gPSAnY29uZGlsaW8ucG5nJztcclxuICAgICAgICBpbWFnZVBhdGhzWydQcsOzLW5hc2FsIChQbiknXSA9ICdwcm9OYXNhbC5wbmcnO1xyXG4gICAgICAgIGltYWdlUGF0aHNbJ1BvZ8O0bmlvIE1vbGUgKFBnKSddID0gJ3BvZ29uaW9Nb2xlLnBuZyc7XHJcbiAgICAgICAgaW1hZ2VQYXRoc1snUGFsYXRvIE1vbGUgKHBtKSddID0gJ3BhbGF0b01vbGUucG5nJztcclxuICAgICAgICBpbWFnZVBhdGhzWydHw7RuaW8gKEdvKSddID0gJyc7XHJcbiAgICAgICAgaW1hZ2VQYXRoc1snw5NyYml0w6FyaW8gKE9yKSddID0gJyc7XHJcbiAgICAgICAgaW1hZ2VQYXRoc1snUMOzcmlvIChQbyknXSA9ICcnO1xyXG4gICAgICAgIGltYWdlUGF0aHNbJ1BvbnRhIGRvIE5hcml6IChQdE4pJ10gPSAnJztcclxuICAgICAgICBpbWFnZVBhdGhzWydGb3NzYSBQdMOpcmlnbyBNYXhpbGFyIChGcG0pJ10gPSAnJztcclxuICAgICAgICBpbWFnZVBhdGhzWydQdGVyaWfDs2lkZSAoUHQpJ10gPSAnJztcclxuICAgICAgICBpZiAoY3VycmVudExhbmRtYXJrICE9PSAnU2VsZWNpb25lJyAmJiBpbWFnZVBhdGhzW2N1cnJlbnRMYW5kbWFya10pIHtcclxuICAgICAgICAgICAgY29uc3QgaW1nID0gbmV3IEltYWdlKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlZmVyZW5jZUNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxyXG4gICAgICAgICAgICAgICAgJ3JlZmVyZW5jZUxhbmRtYXJrJ1xyXG4gICAgICAgICAgICApIGFzIEhUTUxDYW52YXNFbGVtZW50O1xyXG4gICAgICAgICAgICBpZiAocmVmZXJlbmNlQ2FudmFzLmdldENvbnRleHQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRleHQgPSByZWZlcmVuY2VDYW52YXMuZ2V0Q29udGV4dChcclxuICAgICAgICAgICAgICAgICAgICAnMmQnXHJcbiAgICAgICAgICAgICAgICApIGFzIENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcclxuICAgICAgICAgICAgICAgIGltZy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5jYW52YXMud2lkdGggPSBpbWcud2lkdGg7IC8vbWF5YmUgZG9uJ3Qgd29ya1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuY2FudmFzLmhlaWdodCA9IGltZy5oZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2FudmFzUmVmZXJlbmNlRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnY2FudmFzLXJlZmVyZW5jZSdcclxuICAgICAgICAgICAgICAgICAgICApIGFzIEhUTUxDYW52YXNFbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbnZhc1JlZmVyZW5jZUVsZW1lbnQuc2V0QXR0cmlidXRlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnc3R5bGUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnaGVpZ2h0OiAnICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuY2FudmFzLmhlaWdodCArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAncHgnICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd3aWR0aDogJyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmNhbnZhcy53aWR0aCArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAncHgnXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmRyYXdJbWFnZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW1nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmNhbnZhcy53aWR0aCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5jYW52YXMuaGVpZ2h0XHJcbiAgICAgICAgICAgICAgICAgICAgKTsgLy9kcmF3IGJhY2tncm91bmQgaW1hZ2VcclxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9ICdyZ2JhKDEsIDEsIDEsIDApJzsgLy9kcmF3IGEgYm94IG92ZXIgdGhlIHRvcFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvKmltZy5zcmMgPVxyXG4gICAgICAgICAgICAgICAgdGhpcy51cmxzWydyZWZlcmVuY2VJbWFnZXMnXSArIGltYWdlUGF0aHNbY3VycmVudExhbmRtYXJrXTsqL1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENoYW5nZSBvciBzZXQgcG9pbnQgbG9jYXRpb24gb24gY3VycmVudCBtb3VzZSBwb3NpdGlvblxyXG4gICAgICogQHBhcmFtIHtJUG9pbnRCaWRpbWVuc2lvbmFsfSBwb2ludFxyXG4gICAgICovXHJcbiAgICBtYXJrTGFuZG1hcmtQb2ludChsYW5kbWFya05hbWU6IHN0cmluZywgcG9pbnQ6IElQb2ludEJpZGltZW5zaW9uYWwpOiB2b2lkIHtcclxuICAgICAgICBpZiAobGFuZG1hcmtOYW1lLmxlbmd0aCA+IDAgJiYgbGFuZG1hcmtOYW1lICE9PSAnU2VsZWNpb25lJykge1xyXG4gICAgICAgICAgICBjb25zdCBsYW5kbWFya0NhbnZhcyA9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhbnZhc09kb250b3JhZGlvc2lzLmdldENhbnZhcygnbGFuZG1hcmtzJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRMYW5kbWFyayA9IHRoaXMubGFuZG1hcmtzQ29udHJvbGxlci52ZXJpZnlMYW5kbWFyayhcclxuICAgICAgICAgICAgICAgIGxhbmRtYXJrTmFtZSxcclxuICAgICAgICAgICAgICAgIHRydWVcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgY29uc3QgY3VycmVudE1vdXNlUG9zaXRpb24gPSB0aGlzLnNjYWxlTWFuYWdlci5nZXRNb3VzZVBvcyhcclxuICAgICAgICAgICAgICAgIGxhbmRtYXJrQ2FudmFzLFxyXG4gICAgICAgICAgICAgICAgcG9pbnRcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgY3VycmVudExhbmRtYXJrLnggPSBjdXJyZW50TW91c2VQb3NpdGlvbi54O1xyXG4gICAgICAgICAgICBjdXJyZW50TGFuZG1hcmsueSA9IGN1cnJlbnRNb3VzZVBvc2l0aW9uLnk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmxhbmRtYXJrc0NvbnRyb2xsZXIuc2F2ZUxhbmRtYXJrcygpO1xyXG4gICAgICAgICAgICB0aGlzLmxhbmRtYXJrc0NvbnRyb2xsZXIucmVkcmF3TGFuZG1hcmtzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBNYWluQ29udHJvbGxlcjtcclxuIl19