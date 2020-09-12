class LandmarksController {
    /**
     *
     * @param {CanvasOdontoradiosis} canvasOdontoradiosis
     */
    constructor(canvasOdontoradiosis) {
        this.landmarks = [];
        this.canvas = canvasOdontoradiosis;
    }

    /**
     * @returns {array} this.landmarks
     */
    getLandmarks() {
        return this.landmarks;
    }

    /**
     * Lardmarks setter
     * @param {array} newLandmarks
     */
    setLandmarks(newLandmarks) {
        this.landmarks = newLandmarks;
    }

    /**
     * Set a single landmark value
     * @param {string} name
     * @param {object} value
     */
    setLandmark(name, value = { X: 0, Y: 0 }) {
        this.landmarks[name] = value;
    }

    /**
     * Verify if landmark exists. If not and toCreate is true, it'll create
     * @param {string} name
     * @param {bool} toCreate
     * @returns {array} current object
     */
    verifyLandmark(name, toCreate = false) {
        if (!this.landmarks[name] && toCreate) {
            this.landmarks[name] = [];
        }
        return this.landmarks[name];
    }

    /**
     * Save all landmarks in a hidden form
     */
    saveLandmarks() {
        const data_json = JSON.stringify(this.landmarks);
        let hiddenForm = document.getElementById("saved_points");
        hiddenForm.setAttribute("value", data_json);
    }

    /**
     * Draw a landmark with its name
     * @param {CanvasRenderingContext2D} canvasContext
     * @param {string} landmarkName
     */
    drawLandmark(canvasContext, landmarkName) {
        const locations = this.landmarks[landmarkName];
        const context = canvasContext;
        this.canvas.drawCircleCtx(
            "landmarks",
            locations.X,
            locations.Y,
            this.canvas.scaleManager.pointRadius,
            1,
            "red",
            "#330005"
        );
        context.beginPath();
        context.fillStyle = "red";
        context.font = this.canvas.scaleManager.nameScale + "px Arial";
        context.fillText(
            landmarkName.match(/\(.+\)/),
            Math.floor(
                parseInt(locations.X) -
                    this.canvas.scaleManager.textRelativePosition.x
            ),
            Math.floor(
                parseInt(locations.Y) +
                    this.canvas.scaleManager.textRelativePosition.y
            )
        );
        context.fill();
        context.lineWidth = 1;
        context.strokeStyle = "#330005";
        context.stroke();
    }

    /**
     * Redraw all landmarks
     */
    redrawLandmarks() {
        const landmarksCanvas = this.canvas.getCanvas("landmarks");
        const context = landmarksCanvas.getContext("2d");
        context.clearRect(0, 0, landmarksCanvas.width, landmarksCanvas.height);
        const self = this;
        Object.keys(this.landmarks).forEach(function(element, index, array) {
            self.drawLandmark.call(self, context, element);
        });
    }
}
