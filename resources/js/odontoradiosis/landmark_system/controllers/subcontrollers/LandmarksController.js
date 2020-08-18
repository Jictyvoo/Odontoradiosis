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
     * Convert the landmarks array into a json string
     * @param {array} js_array
     */
    landmarksToJSON(js_array) {
        let returned_json = "{";
        for (let key in js_array) {
            if (returned_json.length > 1) {
                returned_json = returned_json + ",";
            }
            returned_json = returned_json + '"' + key + '":{';
            // noinspection JSUnfilteredForInLoop
            let internalArray = js_array[key];
            returned_json =
                returned_json +
                '"X":' +
                internalArray.X +
                ',"Y":' +
                internalArray.Y +
                "}";
        }
        returned_json = returned_json + "}";
        return returned_json;
    }

    /**
     * Save all landmarks in a hidden form
     */
    saveLandmarks() {
        const data_json = this.landmarksToJSON(this.landmarks);
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
