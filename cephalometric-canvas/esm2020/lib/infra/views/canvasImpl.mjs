import { default as UsefulMethods } from '../../domain/util/usefulMethods';
class CanvasOdontoradiosisImpl {
    /**
     * Constructor
     * @param {HTMLElement} stackCanvas
     * @param {ScaleManager} scaleManager
     * @param {array} layerSequence
     */
    constructor(stackCanvas, scaleManager, layerSequence = {}) {
        this.stackCanvas = stackCanvas;
        this.layerSequence = layerSequence;
        this.existentCanvas = {};
        this.scaleManager = scaleManager;
    }
    addCanvasElement(canvasId, element) {
        this.existentCanvas[canvasId] = element;
        element.setAttribute('style', UsefulMethods.canvasStyle(this.layerSequence[canvasId] ?? -1));
    }
    get scales() {
        return this.scaleManager;
    }
    set canvasCursor(newCursor) {
        this.stackCanvas.style.cursor = newCursor;
    }
    /**
     * Returns a canvas based on it id
     * @param {string} id
     * @returns {HTMLCanvasElement}
     */
    getCanvas(id) {
        return this.existentCanvas[id];
    }
    /**
     * Returns a canvas context based on it id
     * @param {string} id
     * @returns {CanvasRenderingContext2D}
     */
    getContext(id) {
        return this.existentCanvas[id].getContext('2d');
    }
    /**
     * Apply a style to the canvas using UsefulMethods
     * @param {string} id
     * @param {string} styleName
     * @param {string} newStyle
     */
    setStyle(id, styleName, newStyle) {
        this.getCanvas(id).style.setProperty(styleName, newStyle);
    }
    /**
     * Clear canvas that have the id passed
     * @param {string} canvasId
     */
    clearCanvas(canvasId) {
        const canvas = this.getCanvas(canvasId);
        const context = canvas.getContext('2d');
        if (context) {
            /*context.clearRect(0, 0, canvas.width, canvas.height);*/
            const canvasWidth = context.canvas.width;
            context.canvas.width = canvasWidth;
        }
    }
    /**
     * Draw a circle in selected context with selected colors
     * @param {CanvasRenderingContext2D} context
     * @param {number} x
     * @param {number} y
     * @param {number} pointRadius
     * @param {number} lineWidth
     * @param {string} fillStyle
     * @param {string} strokeStyle
     */
    drawCircle(context, x = 0, y = 0, pointRadius = this.scaleManager.pointRadius, lineWidth = this.scaleManager.lineWidth, fillStyle = '#184bed', strokeStyle = '#184bed') {
        context.beginPath();
        context.arc(x, y, pointRadius, 0, 2 * Math.PI);
        context.fillStyle = fillStyle;
        context.fill();
        context.lineWidth = lineWidth;
        context.strokeStyle = strokeStyle;
        context.stroke();
    }
    /**
     * Draw a circle in selected curve with selected colors
     * @param {string} layerId
     * @param {number} x
     * @param {number} y
     * @param {number} pointRadius
     * @param {number} lineWidth
     * @param {string} fillStyle
     * @param {string} strokeStyle
     */
    drawCircleCtx(layerId, x = 0, y = 0, pointRadius = this.scaleManager.pointRadius, lineWidth = this.scaleManager.lineWidth, fillStyle = '#184bed', strokeStyle = '#184bed') {
        this.drawCircle(this.getContext(layerId), x, y, pointRadius, lineWidth, fillStyle, strokeStyle);
    }
    /**
     *
     * @param {CanvasRenderingContext2D} context
     * @param {number} x1
     * @param {number} y1
     * @param {number} cx1
     * @param {number} cy1
     * @param {number} cx2
     * @param {number} cy2
     * @param {number} x2
     * @param {number} y2
     * @param {string} strokeStyle
     */
    drawBezier(context, x1, y1, cx1, cy1, cx2, cy2, x2, y2, strokeStyle) {
        context.strokeStyle = strokeStyle;
        context.moveTo(x1, y1);
        context.bezierCurveTo(cx1, cy1, cx2, cy2, x2, y2);
        context.lineWidth = this.scaleManager.lineWidth;
        context.stroke();
    }
    /**
     * Opens a given image and reset canvas size
     * @param {string} imageData
     * @param {VoidFunction} loadFunction
     */
    openImage(imageData = '', loadFunction) {
        const imageObject = new Image();
        if (this.existentCanvas['image'].getContext('2d')) {
            const context = this.existentCanvas['image'].getContext('2d');
            const self = this;
            const selfScaleManager = this.scaleManager;
            //OnLoad Image here
            imageObject.onload = function () {
                context.canvas.width = imageObject.width; //this.width
                context.canvas.height = imageObject.height; //this.height
                ['landmarks', 'bezier'].forEach((element) => {
                    const temporaryContext = self.existentCanvas[element].getContext('2d');
                    temporaryContext.canvas.width = context.canvas.width;
                    temporaryContext.canvas.height = context.canvas.height;
                });
                const cardCanvas = document.getElementById('card-canvas');
                if (cardCanvas) {
                    cardCanvas.setAttribute('style', 'height: ' + context.canvas.height + 'px');
                }
                selfScaleManager.calculateScales.call(selfScaleManager, self.existentCanvas['landmarks']);
                context.drawImage(imageObject, 0, 0, context.canvas.width, context.canvas.height); //draw background image
                context.fillStyle = 'rgba(1, 1, 1, 0)'; //draw a box over the top
                if (loadFunction) {
                    loadFunction();
                }
            };
        }
        imageObject.src = imageData;
    }
}
export default CanvasOdontoradiosisImpl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FudmFzSW1wbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NlcGhhbG9tZXRyaWMtY2FudmFzL3NyYy9saWIvaW5mcmEvdmlld3MvY2FudmFzSW1wbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxPQUFPLEVBQUUsT0FBTyxJQUFJLGFBQWEsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBRTNFLE1BQU0sd0JBQXdCO0lBUTFCOzs7OztPQUtHO0lBQ0gsWUFDSSxXQUF3QixFQUN4QixZQUEwQixFQUMxQixnQkFBMkMsRUFBRTtRQUU3QyxJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztRQUNuQyxJQUFJLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztJQUNyQyxDQUFDO0lBRU0sZ0JBQWdCLENBQ25CLFFBQWdCLEVBQ2hCLE9BQTBCO1FBRTFCLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLEdBQUcsT0FBTyxDQUFDO1FBQ3hDLE9BQU8sQ0FBQyxZQUFZLENBQ2hCLE9BQU8sRUFDUCxhQUFhLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FDaEUsQ0FBQztJQUNOLENBQUM7SUFFRCxJQUFJLE1BQU07UUFDTixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDN0IsQ0FBQztJQUVELElBQVcsWUFBWSxDQUFDLFNBQWlCO1FBQ3JDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7SUFDOUMsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxTQUFTLENBQUMsRUFBVTtRQUNoQixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLENBQUM7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Q1AsVUFBVSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FDNUMsQ0FBQztpQkFDTDtnQkFDRCxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUNqQyxnQkFBZ0IsRUFDaEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FDbkMsQ0FBQztnQkFFRixPQUFPLENBQUMsU0FBUyxDQUNiLFdBQVcsRUFDWCxDQUFDLEVBQ0QsQ0FBQyxFQUNELE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUNwQixPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FDeEIsQ0FBQyxDQUFDLHVCQUF1QjtnQkFDMUIsT0FBTyxDQUFDLFNBQVMsR0FBRyxrQkFBa0IsQ0FBQyxDQUFDLHlCQUF5QjtnQkFDakUsSUFBSSxZQUFZLEVBQUU7b0JBQ2QsWUFBWSxFQUFFLENBQUM7aUJBQ2xCO1lBQ0wsQ0FBQyxDQUFDO1NBQ0w7UUFDRCxXQUFXLENBQUMsR0FBRyxHQUFHLFNBQVMsQ0FBQztJQUNoQyxDQUFDO0NBQ0o7QUFFRCxlQUFlLHdCQUF3QixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUNhbnZhc0RyYXcgfSBmcm9tICcuLi8uLi9kb21haW4vdXRpbC9pbnRlcmZhY2VzL3ZpZXdzL2NhbnZhc0RyYXcnO1xyXG5pbXBvcnQgeyBkZWZhdWx0IGFzIFNjYWxlTWFuYWdlciB9IGZyb20gJy4uLy4uL2RvbWFpbi91dGlsL3NjYWxlTWFuYWdlcic7XHJcbmltcG9ydCB7IGRlZmF1bHQgYXMgVXNlZnVsTWV0aG9kcyB9IGZyb20gJy4uLy4uL2RvbWFpbi91dGlsL3VzZWZ1bE1ldGhvZHMnO1xyXG5cclxuY2xhc3MgQ2FudmFzT2RvbnRvcmFkaW9zaXNJbXBsIGltcGxlbWVudHMgSUNhbnZhc0RyYXcge1xyXG4gICAgcHVibGljIHN0YWNrQ2FudmFzOiBIVE1MRWxlbWVudDtcclxuICAgIHB1YmxpYyBsYXllclNlcXVlbmNlOiB7IFtrZXk6IHN0cmluZ106IG51bWJlciB9O1xyXG4gICAgcHVibGljIGV4aXN0ZW50Q2FudmFzOiB7XHJcbiAgICAgICAgW2tleTogc3RyaW5nXTogSFRNTENhbnZhc0VsZW1lbnQ7XHJcbiAgICB9O1xyXG4gICAgcHVibGljIHNjYWxlTWFuYWdlcjogU2NhbGVNYW5hZ2VyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29uc3RydWN0b3JcclxuICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHN0YWNrQ2FudmFzXHJcbiAgICAgKiBAcGFyYW0ge1NjYWxlTWFuYWdlcn0gc2NhbGVNYW5hZ2VyXHJcbiAgICAgKiBAcGFyYW0ge2FycmF5fSBsYXllclNlcXVlbmNlXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHN0YWNrQ2FudmFzOiBIVE1MRWxlbWVudCxcclxuICAgICAgICBzY2FsZU1hbmFnZXI6IFNjYWxlTWFuYWdlcixcclxuICAgICAgICBsYXllclNlcXVlbmNlOiB7IFtrZXk6IHN0cmluZ106IG51bWJlciB9ID0ge31cclxuICAgICkge1xyXG4gICAgICAgIHRoaXMuc3RhY2tDYW52YXMgPSBzdGFja0NhbnZhcztcclxuICAgICAgICB0aGlzLmxheWVyU2VxdWVuY2UgPSBsYXllclNlcXVlbmNlO1xyXG4gICAgICAgIHRoaXMuZXhpc3RlbnRDYW52YXMgPSB7fTtcclxuICAgICAgICB0aGlzLnNjYWxlTWFuYWdlciA9IHNjYWxlTWFuYWdlcjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWRkQ2FudmFzRWxlbWVudChcclxuICAgICAgICBjYW52YXNJZDogc3RyaW5nLFxyXG4gICAgICAgIGVsZW1lbnQ6IEhUTUxDYW52YXNFbGVtZW50XHJcbiAgICApOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmV4aXN0ZW50Q2FudmFzW2NhbnZhc0lkXSA9IGVsZW1lbnQ7XHJcbiAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoXHJcbiAgICAgICAgICAgICdzdHlsZScsXHJcbiAgICAgICAgICAgIFVzZWZ1bE1ldGhvZHMuY2FudmFzU3R5bGUodGhpcy5sYXllclNlcXVlbmNlW2NhbnZhc0lkXSA/PyAtMSlcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBzY2FsZXMoKTogU2NhbGVNYW5hZ2VyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zY2FsZU1hbmFnZXI7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBjYW52YXNDdXJzb3IobmV3Q3Vyc29yOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLnN0YWNrQ2FudmFzLnN0eWxlLmN1cnNvciA9IG5ld0N1cnNvcjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgYSBjYW52YXMgYmFzZWQgb24gaXQgaWRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxyXG4gICAgICogQHJldHVybnMge0hUTUxDYW52YXNFbGVtZW50fVxyXG4gICAgICovXHJcbiAgICBnZXRDYW52YXMoaWQ6IHN0cmluZyk6IEhUTUxDYW52YXNFbGVtZW50IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5leGlzdGVudENhbnZhc1tpZF07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGEgY2FudmFzIGNvbnRleHQgYmFzZWQgb24gaXQgaWRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxyXG4gICAgICogQHJldHVybnMge0NhbnZhc1JlbmRlcmluZ0NvbnRleHQyRH1cclxuICAgICAqL1xyXG4gICAgZ2V0Q29udGV4dChpZDogc3RyaW5nKTogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5leGlzdGVudENhbnZhc1tpZF0uZ2V0Q29udGV4dChcclxuICAgICAgICAgICAgJzJkJ1xyXG4gICAgICAgICkgYXMgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQXBwbHkgYSBzdHlsZSB0byB0aGUgY2FudmFzIHVzaW5nIFVzZWZ1bE1ldGhvZHNcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0eWxlTmFtZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5ld1N0eWxlXHJcbiAgICAgKi9cclxuICAgIHNldFN0eWxlKGlkOiBzdHJpbmcsIHN0eWxlTmFtZTogc3RyaW5nLCBuZXdTdHlsZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5nZXRDYW52YXMoaWQpLnN0eWxlLnNldFByb3BlcnR5KHN0eWxlTmFtZSwgbmV3U3R5bGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2xlYXIgY2FudmFzIHRoYXQgaGF2ZSB0aGUgaWQgcGFzc2VkXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY2FudmFzSWRcclxuICAgICAqL1xyXG4gICAgY2xlYXJDYW52YXMoY2FudmFzSWQ6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGNhbnZhcyA9IHRoaXMuZ2V0Q2FudmFzKGNhbnZhc0lkKTtcclxuICAgICAgICBjb25zdCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcbiAgICAgICAgaWYgKGNvbnRleHQpIHtcclxuICAgICAgICAgICAgLypjb250ZXh0LmNsZWFyUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpOyovXHJcbiAgICAgICAgICAgIGNvbnN0IGNhbnZhc1dpZHRoID0gY29udGV4dC5jYW52YXMud2lkdGg7XHJcbiAgICAgICAgICAgIGNvbnRleHQuY2FudmFzLndpZHRoID0gY2FudmFzV2lkdGg7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRHJhdyBhIGNpcmNsZSBpbiBzZWxlY3RlZCBjb250ZXh0IHdpdGggc2VsZWN0ZWQgY29sb3JzXHJcbiAgICAgKiBAcGFyYW0ge0NhbnZhc1JlbmRlcmluZ0NvbnRleHQyRH0gY29udGV4dFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB5XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcG9pbnRSYWRpdXNcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBsaW5lV2lkdGhcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBmaWxsU3R5bGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzdHJva2VTdHlsZVxyXG4gICAgICovXHJcbiAgICBkcmF3Q2lyY2xlKFxyXG4gICAgICAgIGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCxcclxuICAgICAgICB4OiBudW1iZXIgPSAwLFxyXG4gICAgICAgIHk6IG51bWJlciA9IDAsXHJcbiAgICAgICAgcG9pbnRSYWRpdXM6IG51bWJlciA9IHRoaXMuc2NhbGVNYW5hZ2VyLnBvaW50UmFkaXVzLFxyXG4gICAgICAgIGxpbmVXaWR0aDogbnVtYmVyID0gdGhpcy5zY2FsZU1hbmFnZXIubGluZVdpZHRoLFxyXG4gICAgICAgIGZpbGxTdHlsZTogc3RyaW5nID0gJyMxODRiZWQnLFxyXG4gICAgICAgIHN0cm9rZVN0eWxlOiBzdHJpbmcgPSAnIzE4NGJlZCdcclxuICAgICk6IHZvaWQge1xyXG4gICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgY29udGV4dC5hcmMoeCwgeSwgcG9pbnRSYWRpdXMsIDAsIDIgKiBNYXRoLlBJKTtcclxuICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IGZpbGxTdHlsZTtcclxuICAgICAgICBjb250ZXh0LmZpbGwoKTtcclxuICAgICAgICBjb250ZXh0LmxpbmVXaWR0aCA9IGxpbmVXaWR0aDtcclxuICAgICAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gc3Ryb2tlU3R5bGU7XHJcbiAgICAgICAgY29udGV4dC5zdHJva2UoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERyYXcgYSBjaXJjbGUgaW4gc2VsZWN0ZWQgY3VydmUgd2l0aCBzZWxlY3RlZCBjb2xvcnNcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsYXllcklkXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0geFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHlcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBwb2ludFJhZGl1c1xyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGxpbmVXaWR0aFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGZpbGxTdHlsZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0cm9rZVN0eWxlXHJcbiAgICAgKi9cclxuICAgIGRyYXdDaXJjbGVDdHgoXHJcbiAgICAgICAgbGF5ZXJJZDogc3RyaW5nLFxyXG4gICAgICAgIHg6IG51bWJlciA9IDAsXHJcbiAgICAgICAgeTogbnVtYmVyID0gMCxcclxuICAgICAgICBwb2ludFJhZGl1czogbnVtYmVyID0gdGhpcy5zY2FsZU1hbmFnZXIucG9pbnRSYWRpdXMsXHJcbiAgICAgICAgbGluZVdpZHRoOiBudW1iZXIgPSB0aGlzLnNjYWxlTWFuYWdlci5saW5lV2lkdGgsXHJcbiAgICAgICAgZmlsbFN0eWxlOiBzdHJpbmcgPSAnIzE4NGJlZCcsXHJcbiAgICAgICAgc3Ryb2tlU3R5bGU6IHN0cmluZyA9ICcjMTg0YmVkJ1xyXG4gICAgKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5kcmF3Q2lyY2xlKFxyXG4gICAgICAgICAgICB0aGlzLmdldENvbnRleHQobGF5ZXJJZCksXHJcbiAgICAgICAgICAgIHgsXHJcbiAgICAgICAgICAgIHksXHJcbiAgICAgICAgICAgIHBvaW50UmFkaXVzLFxyXG4gICAgICAgICAgICBsaW5lV2lkdGgsXHJcbiAgICAgICAgICAgIGZpbGxTdHlsZSxcclxuICAgICAgICAgICAgc3Ryb2tlU3R5bGVcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7Q2FudmFzUmVuZGVyaW5nQ29udGV4dDJEfSBjb250ZXh0XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0geDFcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB5MVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGN4MVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGN5MVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGN4MlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGN5MlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHgyXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0geTJcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzdHJva2VTdHlsZVxyXG4gICAgICovXHJcbiAgICBkcmF3QmV6aWVyKFxyXG4gICAgICAgIGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCxcclxuICAgICAgICB4MTogbnVtYmVyLFxyXG4gICAgICAgIHkxOiBudW1iZXIsXHJcbiAgICAgICAgY3gxOiBudW1iZXIsXHJcbiAgICAgICAgY3kxOiBudW1iZXIsXHJcbiAgICAgICAgY3gyOiBudW1iZXIsXHJcbiAgICAgICAgY3kyOiBudW1iZXIsXHJcbiAgICAgICAgeDI6IG51bWJlcixcclxuICAgICAgICB5MjogbnVtYmVyLFxyXG4gICAgICAgIHN0cm9rZVN0eWxlOiBzdHJpbmdcclxuICAgICk6IHZvaWQge1xyXG4gICAgICAgIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSBzdHJva2VTdHlsZTtcclxuICAgICAgICBjb250ZXh0Lm1vdmVUbyh4MSwgeTEpO1xyXG4gICAgICAgIGNvbnRleHQuYmV6aWVyQ3VydmVUbyhjeDEsIGN5MSwgY3gyLCBjeTIsIHgyLCB5Mik7XHJcbiAgICAgICAgY29udGV4dC5saW5lV2lkdGggPSB0aGlzLnNjYWxlTWFuYWdlci5saW5lV2lkdGg7XHJcbiAgICAgICAgY29udGV4dC5zdHJva2UoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE9wZW5zIGEgZ2l2ZW4gaW1hZ2UgYW5kIHJlc2V0IGNhbnZhcyBzaXplXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaW1hZ2VEYXRhXHJcbiAgICAgKiBAcGFyYW0ge1ZvaWRGdW5jdGlvbn0gbG9hZEZ1bmN0aW9uXHJcbiAgICAgKi9cclxuICAgIG9wZW5JbWFnZShpbWFnZURhdGE6IHN0cmluZyA9ICcnLCBsb2FkRnVuY3Rpb24/OiBWb2lkRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBpbWFnZU9iamVjdCA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgIGlmICh0aGlzLmV4aXN0ZW50Q2FudmFzWydpbWFnZSddLmdldENvbnRleHQoJzJkJykpIHtcclxuICAgICAgICAgICAgY29uc3QgY29udGV4dCA9IHRoaXMuZXhpc3RlbnRDYW52YXNbJ2ltYWdlJ10uZ2V0Q29udGV4dChcclxuICAgICAgICAgICAgICAgICcyZCdcclxuICAgICAgICAgICAgKSBhcyBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgICAgICBjb25zdCBzZWxmU2NhbGVNYW5hZ2VyID0gdGhpcy5zY2FsZU1hbmFnZXI7XHJcbiAgICAgICAgICAgIC8vT25Mb2FkIEltYWdlIGhlcmVcclxuICAgICAgICAgICAgaW1hZ2VPYmplY3Qub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5jYW52YXMud2lkdGggPSBpbWFnZU9iamVjdC53aWR0aDsgLy90aGlzLndpZHRoXHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LmNhbnZhcy5oZWlnaHQgPSBpbWFnZU9iamVjdC5oZWlnaHQ7IC8vdGhpcy5oZWlnaHRcclxuICAgICAgICAgICAgICAgIFsnbGFuZG1hcmtzJywgJ2JlemllciddLmZvckVhY2goKGVsZW1lbnQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0ZW1wb3JhcnlDb250ZXh0ID0gc2VsZi5leGlzdGVudENhbnZhc1tcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudFxyXG4gICAgICAgICAgICAgICAgICAgIF0uZ2V0Q29udGV4dCgnMmQnKSBhcyBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcG9yYXJ5Q29udGV4dC5jYW52YXMud2lkdGggPSBjb250ZXh0LmNhbnZhcy53aWR0aDtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wb3JhcnlDb250ZXh0LmNhbnZhcy5oZWlnaHQgPSBjb250ZXh0LmNhbnZhcy5oZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNhcmRDYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FyZC1jYW52YXMnKTtcclxuICAgICAgICAgICAgICAgIGlmIChjYXJkQ2FudmFzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FyZENhbnZhcy5zZXRBdHRyaWJ1dGUoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdzdHlsZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdoZWlnaHQ6ICcgKyBjb250ZXh0LmNhbnZhcy5oZWlnaHQgKyAncHgnXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHNlbGZTY2FsZU1hbmFnZXIuY2FsY3VsYXRlU2NhbGVzLmNhbGwoXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZlNjYWxlTWFuYWdlcixcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmV4aXN0ZW50Q2FudmFzWydsYW5kbWFya3MnXVxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LmRyYXdJbWFnZShcclxuICAgICAgICAgICAgICAgICAgICBpbWFnZU9iamVjdCxcclxuICAgICAgICAgICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5jYW52YXMud2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5jYW52YXMuaGVpZ2h0XHJcbiAgICAgICAgICAgICAgICApOyAvL2RyYXcgYmFja2dyb3VuZCBpbWFnZVxyXG4gICAgICAgICAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSAncmdiYSgxLCAxLCAxLCAwKSc7IC8vZHJhdyBhIGJveCBvdmVyIHRoZSB0b3BcclxuICAgICAgICAgICAgICAgIGlmIChsb2FkRnVuY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICBsb2FkRnVuY3Rpb24oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaW1hZ2VPYmplY3Quc3JjID0gaW1hZ2VEYXRhO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDYW52YXNPZG9udG9yYWRpb3Npc0ltcGw7XHJcbiJdfQ==