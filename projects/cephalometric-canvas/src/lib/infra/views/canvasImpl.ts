import { ICanvasLayers } from '../../domain/util/interfaces/canvasManipulation';
import { ICanvasDraw } from '../../domain/util/interfaces/views/canvasDraw';
import { default as ScaleManager } from '../../domain/util/scaleManager';
import { default as UsefulMethods } from '../../domain/util/usefulMethods';

class CanvasOdontoradiosisImpl implements ICanvasDraw {
    public stackCanvas: HTMLElement;
    public layerSequence: { [key: string]: number };
    public existentCanvas: {
        [key: string]: HTMLCanvasElement;
    };
    public scaleManager: ScaleManager;

    /**
     * Constructor
     * @param {HTMLElement} stackCanvas
     * @param {ScaleManager} scaleManager
     * @param {array} layerSequence
     */
    constructor(
        stackCanvas: HTMLElement,
        scaleManager: ScaleManager,
        layerSequence: { [key: string]: number } = {}
    ) {
        this.stackCanvas = stackCanvas;
        this.layerSequence = layerSequence;
        this.existentCanvas = {};
        this.scaleManager = scaleManager;
    }

    public addCanvasElement(
        canvasId: string,
        element: HTMLCanvasElement
    ): void {
        this.existentCanvas[canvasId] = element;
        element.setAttribute(
            'style',
            UsefulMethods.canvasStyle(this.layerSequence[canvasId] ?? -1)
        );
    }

    get scales(): ScaleManager {
        return this.scaleManager;
    }

    public set canvasCursor(newCursor: string) {
        this.stackCanvas.style.cursor = newCursor;
    }

    /**
     * Returns a canvas based on it id
     * @param {string} id
     * @returns {HTMLCanvasElement}
     */
    getCanvas(id: string): HTMLCanvasElement {
        return this.existentCanvas[id];
    }

    /**
     * Returns a canvas context based on it id
     * @param {string} id
     * @returns {CanvasRenderingContext2D}
     */
    getContext(id: string): CanvasRenderingContext2D {
        return this.existentCanvas[id].getContext(
            '2d'
        ) as CanvasRenderingContext2D;
    }

    /**
     * Apply a style to the canvas using UsefulMethods
     * @param {string} id
     * @param {string} styleName
     * @param {string} newStyle
     */
    setStyle(id: string, styleName: string, newStyle: string): void {
        this.getCanvas(id).style.setProperty(styleName, newStyle);
    }

    /**
     * Clear canvas that have the id passed
     * @param {string} canvasId
     */
    clearCanvas(canvasId: string): void {
        const canvas = this.getCanvas(canvasId);
        const context = canvas.getContext('2d');
        if (context) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            /*const canvasWidth = context.canvas.width;
            context.canvas.width = canvasWidth;*/
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
    drawCircle(
        context: CanvasRenderingContext2D,
        x: number = 0,
        y: number = 0,
        pointRadius: number = this.scaleManager.pointRadius,
        lineWidth: number = this.scaleManager.lineWidth,
        fillStyle: string = '#184bed',
        strokeStyle: string = '#184bed'
    ): void {
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
    drawCircleCtx(
        layerId: string,
        x: number = 0,
        y: number = 0,
        pointRadius: number = this.scaleManager.pointRadius,
        lineWidth: number = this.scaleManager.lineWidth,
        fillStyle: string = '#184bed',
        strokeStyle: string = '#184bed'
    ): void {
        this.drawCircle(
            this.getContext(layerId),
            x,
            y,
            pointRadius,
            lineWidth,
            fillStyle,
            strokeStyle
        );
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
    drawBezier(
        context: CanvasRenderingContext2D,
        x1: number,
        y1: number,
        cx1: number,
        cy1: number,
        cx2: number,
        cy2: number,
        x2: number,
        y2: number,
        strokeStyle: string
    ): void {
        context.beginPath();
        context.strokeStyle = strokeStyle;
        context.lineWidth = this.scaleManager.lineWidth;
        context.moveTo(x1, y1);
        context.bezierCurveTo(cx1, cy1, cx2, cy2, x2, y2);
        context.stroke();
    }

    /**
     * Opens a given image and reset canvas size
     * @param {string} imageData
     * @param {VoidFunction} loadFunction
     */
    openImage(imageData: string = '', loadFunction?: VoidFunction): void {
        const imageObject = new Image();
        const backgroundCanvas = this.getCanvas(ICanvasLayers.BACKGROUND);
        if (backgroundCanvas && backgroundCanvas.getContext('2d')) {
            const context = backgroundCanvas.getContext(
                '2d'
            ) as CanvasRenderingContext2D;
            const self = this;
            const selfScaleManager = this.scaleManager;
            //OnLoad Image here
            imageObject.onload = function () {
                context.canvas.width = imageObject.width; //this.width
                context.canvas.height = imageObject.height; //this.height
                for (const element of [
                    ICanvasLayers.LANDMARKS,
                    ICanvasLayers.ANATOMICAL_TRACING,
                ]) {
                    const temporaryContext = self.existentCanvas[
                        element
                    ].getContext('2d') as CanvasRenderingContext2D;
                    temporaryContext.canvas.width = context.canvas.width;
                    temporaryContext.canvas.height = context.canvas.height;
                }
                const cardCanvas = document.getElementById('card-canvas');
                if (cardCanvas) {
                    cardCanvas.setAttribute(
                        'style',
                        'height: ' + context.canvas.height + 'px'
                    );
                }
                selfScaleManager.calculateScales.call(
                    selfScaleManager,
                    self.existentCanvas[ICanvasLayers.LANDMARKS]
                );

                context.drawImage(
                    imageObject,
                    0,
                    0,
                    context.canvas.width,
                    context.canvas.height
                ); //draw background image
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
