class ScaleManager {
	public pointRadius: any;
	public lineWidth: any;
	public nameScale: any;
	public textRelativePosition: any;
	public scaleDrawValue: any;

    constructor() {
        this.pointRadius = 4;
        this.lineWidth = 1;
        this.nameScale = 10;
        this.textRelativePosition = { x: 15, y: 15 };
        this.scaleDrawValue = Object.freeze({
            pointRadius: 4,
            nameScale: 10,
            lineWidth: 2,
            textRelativePosition: Object.freeze({ x: 15, y: 15 })
        });
    }

    /**
     * Calculate the scale to make canvas dynamic and returns it
     * @param {float} valueToResize
     * @param {boolean} isX
     * @param {CanvasRenderingContext2D} clientRect
     * @param {ClientRect} clientRect
     */
    dynamicCanvasScale(valueToResize = 1, isX = false, context, clientRect) {
        const canvasDimensions = {
            width: clientRect.width,
            height: clientRect.height
        };
        const imageDimensions = {
            width: context.canvas.width,
            height: context.canvas.height
        };
        if (isX) {
            return (
                (imageDimensions.width * valueToResize) / canvasDimensions.width
            );
        } else
            return (
                (imageDimensions.height * valueToResize) /
                canvasDimensions.height
            );
    }

    /**
     * Calculates all scales variables
     * @param {HTMLCanvasElement} canvas
     */
    calculateScales(canvas) {
        const rect = canvas.getBoundingClientRect();
        const context = canvas.getContext("2d");
        const imageDimensions = {
            width: context.canvas.width,
            height: context.canvas.height
        };
        const isX = imageDimensions.width > imageDimensions.height;
        this.pointRadius = this.dynamicCanvasScale(
            this.scaleDrawValue.pointRadius,
            isX,
            context,
            rect
        );
        this.nameScale = this.dynamicCanvasScale(
            this.scaleDrawValue.nameScale,
            isX,
            context,
            rect
        );
        this.lineWidth = this.dynamicCanvasScale(
            this.scaleDrawValue.lineWidth,
            isX,
            context,
            rect
        );
        this.textRelativePosition.x = this.dynamicCanvasScale(
            this.scaleDrawValue.textRelativePosition.x,
            isX,
            context,
            rect
        );
        this.textRelativePosition.y = this.dynamicCanvasScale(
            this.scaleDrawValue.textRelativePosition.y,
            isX,
            context,
            rect
        );
    }

    /**
     * Returns an object containing the relative mouse position in Canvas
     * @param {HTMLElement} canvas
     * @param {*} event
     */
    getMousePos(canvas, event) {
        const rect = canvas.getBoundingClientRect();
        const context = canvas.getContext("2d");
        return {
            x: this.dynamicCanvasScale(
                event.clientX - rect.left,
                true,
                context,
                rect
            ),
            y: this.dynamicCanvasScale(
                event.clientY - rect.top,
                false,
                context,
                rect
            )
        };
    }
}
