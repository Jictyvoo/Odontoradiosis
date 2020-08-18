class CanvasOdontoradiosis {
    /**
     * Constructor
     * @param {HTMLElement} stackCanvas
     * @param {ScaleManager} scaleManager
     * @param {array} layerSequence
     */
    constructor(stackCanvas, scaleManager, layerSequence = []) {
        this.stackCanvas = stackCanvas;
        this.layerSequence = layerSequence;
        this.existentCanvas = [];
        this.scaleManager = scaleManager;
        let allCanvas = this.stackCanvas.getElementsByTagName("canvas");
        for (let index = 0; index < allCanvas.length; index++) {
            const element = allCanvas[index];
            const canvasName = element.getAttribute("id");
            this.existentCanvas[canvasName] = element;
            element.setAttribute(
                "style",
                UsefulMethods.canvasStyle(layerSequence[canvasName])
            );
        }
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
        return this.existentCanvas[id].getContext("2d");
    }

    /**
     * Apply a style to the canvas using UsefulMethods
     * @param {string} id
     * @param {string} newStyle
     */
    setStyle(id, newStyle) {
        this.getCanvas(id).setAttribute(
            "style",
            UsefulMethods.canvasStyle(this.layerSequence[id]) + newStyle
        );
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
     * @param {number} x
     * @param {number} y
     * @param {number} pointRadius
     * @param {number} lineWidth
     * @param {string} fillStyle
     * @param {string} strokeStyle
     */
    drawCircle(
        context,
        x = 0,
        y = 0,
        pointRadius = this.scaleManager.pointRadius,
        lineWidth = this.scaleManager.lineWidth,
        fillStyle = "#184bed",
        strokeStyle = "#184bed"
    ) {
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
        layerId,
        x = 0,
        y = 0,
        pointRadius = this.scaleManager.pointRadius,
        lineWidth = this.scaleManager.lineWidth,
        fillStyle = "#184bed",
        strokeStyle = "#184bed"
    ) {
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
        context.lineWidth = this.scaleManager.lineWidth;
        context.stroke();
    }

    /**
     * Opens a given image and reset canvas size
     * @param {string} path
     * @param {function} loadFunction
     * @param {int} id
     */
    openImage(path = "", loadFunction = null) {
        let imageObject = new Image();
        if (this.existentCanvas["image"].getContext) {
            const context = this.existentCanvas["image"].getContext("2d");
            const self = this;
            const selfScaleManager = this.scaleManager;
            //OnLoad Image here
            imageObject.onload = function() {
                context.canvas.width = this.width;
                context.canvas.height = this.height;
                ["landmarks", "bezier"].forEach(element => {
                    const temporaryContext = self.existentCanvas[
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
                selfScaleManager.calculateScales.call(
                    selfScaleManager,
                    self.existentCanvas["landmarks"]
                );

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
                }
            };
        }
        imageObject.src = path;
    }
}
