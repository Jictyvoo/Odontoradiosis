import ScaleManager from '../../scaleManager';

export interface ICanvasDraw {
    /**
     * Add a canvas element in the manipulated canvas array
     * @param canvasId
     * @param element
     */
    addCanvasElement(canvasId: string, element: HTMLCanvasElement): void;

    /**
     * Change the cursor of the canvas stacks
     */
    set canvasCursor(newCursor: string);

    /**
     * Returns a canvas based on it id
     * @param {string} id
     * @returns {HTMLCanvasElement}
     */
    getCanvas(id: string): HTMLCanvasElement;

    /**
     * Returns a canvas context based on it id
     * @param {string} id
     * @returns {CanvasRenderingContext2D}
     */
    getContext(id: string): CanvasRenderingContext2D;

    /**
     * Returns the scale manager object
     */
    get scales(): ScaleManager;

    /**
     * Apply a style to the canvas using UsefulMethods
     * @param {string} id
     * @param {string} styleName
     * @param {string} newStyle
     */
    setStyle(id: string, styleName: string, newStyle: string): void;

    /**
     * Clear canvas that have the id passed
     * @param {string} canvasId
     */
    clearCanvas(canvasId: string): void;

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
        x: number,
        y: number,
        pointRadius?: number,
        lineWidth?: number,
        fillStyle?: string,
        strokeStyle?: string
    ): void;

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
        x: number,
        y: number,
        pointRadius: number,
        lineWidth: number,
        fillStyle: string,
        strokeStyle: string
    ): void;

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
    drawText(
        layerId: string,
        x: number,
        y: number,
        text: string,
        lineWidth: number,
        fillStyle: string,
        strokeStyle: string
    ): void;

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
    ): void;

    /**
     * Opens a given image and reset canvas size
     * @param {string} path
     * @param {VoidFunction} loadFunction
     */
    openImage(path: string, loadFunction?: VoidFunction): void;
}
