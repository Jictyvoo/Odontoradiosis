class CanvasOdontoradiosis {
    /**
     * Constructor
     * @param {HTMLElement} stackCanvas
     */
    constructor(stackCanvas) {
        this.stackCanvas = stackCanvas;
        this.existentCanvas = [];
        this.pointRadius = 4;
        this.lineWidth = 1;
        this.nameScale = 10;
        this.textRelativePosition = { x: 15, y: 15 };
        let allCanvas = this.stackCanvas.getElementsByTagName("canvas");
        for (let index = 0; index < allCanvas.length; index++) {
            const element = allCanvas[index];
            this.existentCanvas[element.getAttribute("id")] = element;
        }
        this.scaleDrawValue = Object.freeze({
            pointRadius: 4,
            nameScale: 10,
            lineWidth: 2,
            textRelativePosition: Object.freeze({ x: 15, y: 15 })
        });
    }

    /**
     * Returns a canvas based on it id
     * @param {string} id
     */
    getCanvas(id) {
        return this.allCanvas[id];
    }

    /**
     * Returns a canvas context based on it id
     * @param {string} id
     */
    getContext(id) {
        return this.allCanvas[id].getContext("2d");
    }

    /**
     * Clear canvas that have the id passed
     * @param {string} canvasId
     */
    clearCanvas(canvasId) {
        const canvas = this.getCanvas(canvasId);
        let context = canvas.getContext("2d");
        /*context.clearRect(0, 0, canvas.width, canvas.height);*/
        // noinspection SillyAssignmentJS
        context.canvas.width = context.canvas.width;
    }

    /**
     * Draw a circle in selected context with selected colors
     * @param {CanvasRenderingContext2D} context
     * @param {float} x
     * @param {float} y
     * @param {float} pointRadius
     * @param {string} fillStyle
     * @param {string} strokeStyle
     */
    drawCircle(
        context,
        x,
        y,
        pointRadius = this.pointRadius,
        fillStyle = "#184bed",
        strokeStyle = "#184bed"
    ) {
        context.beginPath();
        context.moveTo(x, y);
        context.arc(x, y, pointRadius, 0, 2 * Math.PI);
        context.fillStyle = fillStyle;
        context.fill();
        context.lineWidth = this.lineWidth;
        context.strokeStyle = strokeStyle;
        context.stroke();
    }

    /**
     * Draw a circle in selected curve with selected colors
     * @param {string} curveName
     * @param {float} x
     * @param {float} y
     * @param {float} pointRadius
     * @param {string} fillStyle
     * @param {string} strokeStyle
     */
    drawCircleCtx(
        curveName,
        x,
        y,
        pointRadius = this.pointRadius,
        fillStyle = "#184bed",
        strokeStyle = "#184bed"
    ) {
        this.drawCircle(
            this.getContext(curveName),
            x,
            y,
            pointRadius,
            fillStyle,
            strokeStyle
        );
    }

    /**
     *
     * @param {CanvasRenderingContext2D} context
     * @param {float} x1
     * @param {float} y1
     * @param {float} cx1
     * @param {float} cy1
     * @param {float} cx2
     * @param {float} cy2
     * @param {float} x2
     * @param {float} y2
     * @param {string} strokeStyle
     */
    drawBezier(
        context,
        x1,
        y1,
        cx1,
        cy1,
        cx2,
        cy2,
        x2,
        y2,
        strokeStyle = "#00e379"
    ) {
        context.strokeStyle = strokeStyle;
        context.moveTo(x1, y1);
        context.bezierCurveTo(cx1, cy1, cx2, cy2, x2, y2);
        context.lineWidth = this.lineWidth;
        context.stroke();
    }

    /**
     * Calculate the scale to make canvas dynamic and returns it
     * @param {float} valueToResize
     * @param {boolean} isX
     * @param {HTMLElement} rect
     */
    dynamicCanvasScale(
        valueToResize = 1,
        isX = false,
        rect = this.existentCanvas["landmarks"].getBoundingClientRect()
    ) {
        const canvasDimensions = {
            width: rect.width,
            height: rect.height
        };
        let context = this.existentCanvas["landmarks"].getContext("2d");
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
    scaleDraw(canvas) {
        const rect = canvas.getBoundingClientRect();
        let ctx = this.getContext("landmarks");
        const imageDimensions = {
            width: ctx.canvas.width,
            height: ctx.canvas.height
        };
        if (imageDimensions.width > imageDimensions.height) {
            this.pointRadius = this.dynamicCanvasScale(
                this.scaleDrawValue.pointRadius,
                true,
                rect
            );
            this.nameScale = this.dynamicCanvasScale(
                this.scaleDrawValue.nameScale,
                true,
                rect
            );
            this.lineWidth = this.dynamicCanvasScale(
                this.scaleDrawValue.lineWidth,
                true,
                rect
            );
            this.textRelativePosition.x = this.dynamicCanvasScale(
                this.scaleDrawValue.textRelativePosition.x,
                true,
                rect
            );
            this.textRelativePosition.y = this.dynamicCanvasScale(
                this.scaleDrawValue.textRelativePosition.y,
                true,
                rect
            );
        } else {
            this.pointRadius = this.dynamicCanvasScale(
                this.scaleDrawValue.pointRadius,
                false,
                rect
            );
            this.nameScale = this.dynamicCanvasScale(
                this.scaleDrawValue.nameScale,
                false,
                rect
            );
            this.lineWidth = this.dynamicCanvasScale(
                this.scaleDrawValue.lineWidth,
                false,
                rect
            );
            this.textRelativePosition.x = this.dynamicCanvasScale(
                this.scaleDrawValue.textRelativePosition.x,
                false,
                rect
            );
            this.textRelativePosition.y = this.dynamicCanvasScale(
                this.scaleDrawValue.textRelativePosition.y,
                false,
                rect
            );
        }
    }

    /**
     * Returns an object containing the relative mouse position in Canvas
     * @param {HTMLElement} canvas
     * @param {*} event
     */
    getMousePos(canvas = this.existentCanvas["landmarks"], event) {
        const rect = canvas.getBoundingClientRect();
        return {
            x: this.dynamicCanvasScale(event.clientX - rect.left, true, rect),
            y: this.dynamicCanvasScale(event.clientY - rect.top, false, rect)
        };
    }

    /**
     * Opens a given image and reset canvas size
     * @param {string} path
     * @param {function} loadFunction
     * @param {int} id
     */
    openImage(path = "", loadFunction = null) {
        let imageObject = new Image();
        image_url = path;
        if (this.existentCanvas["image"].getContext) {
            const context = this.existentCanvas["image"].getContext("2d");
            imageObject.onload = function() {
                context.canvas.width = this.width;
                context.canvas.height = this.height;
                ["landmarks", "bezier"].forEach(element => {
                    const temporaryContext = this.existentCanvas[
                        element
                    ].getContext("2d");
                    temporaryContext.canvas.width = context.canvas.width;
                    temporaryContext.canvas.height = context.canvas.height;
                });
                const cardCanvas = document.getElementById("card-canvas");
                if (cardCanvas) {
                    cardCanvas.setAttribute(
                        "style",
                        "height: " + context.canvas.height + "px"
                    );
                }
                this.scaleDraw(document.getElementById("landmarks"));

                context.drawImage(
                    imageObject,
                    0,
                    0,
                    context.canvas.width,
                    context.canvas.height
                ); //draw background image
                context.fillStyle = "rgba(1, 1, 1, 0)"; //draw a box over the top
                if (loadFunction) {
                    loadFunction();
                    /**
                     * loadJsonCurve(id);
                     * loadJsonLandmarks(id);
                     */
                }
            };
        }
        imageObject.src = path;
    }
}
