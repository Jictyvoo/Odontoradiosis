class TracingController {
    /**
     * Constructor
     * @param {CanvasOdontoradiosis} canvasOdontoradiosis
     */
    constructor(canvasOdontoradiosis) {
        this.canvasOdontoradiosis = canvasOdontoradiosis;
        this.anatomicalTracing = new AnatomicalTracing(
            canvasOdontoradiosis,
            null
        );
        this.bezierPoints = [];
    }

    /**
     * Bezier points setter
     * @param {array} points
     */
    setBezierPoints(points) {
        this.bezierPoints = points;
        this.anatomicalTracing.setAllCurves(points);
    }

    /**
     * Convert array to json string
     * @param {array} toConvertArray
     */
    toJson(toConvertArray) {
        let returnedJson = "{";
        Object.keys(toConvertArray).forEach(function(element, index, array) {
            if (index > 0) {
                returnedJson += ",";
            }
            returnedJson += '"' + element + '":[';
            toConvertArray[element].forEach(function(
                subElement,
                position,
                arr
            ) {
                if (position > 0) {
                    returnedJson += ",";
                }
                returnedJson += "[";
                subElement.forEach(function(item, count, subArray) {
                    if (count > 0) {
                        returnedJson += ",";
                    }
                    returnedJson += item;
                });
                returnedJson += "]";
            });
            returnedJson += "]";
        });
        returnedJson += "}";
        return returnedJson;
    }

    /**
     * Save all bezier curves in a hidden form
     */
    saveBezierCurve() {
        const curvesJson = this.toJson(this.bezierPoints);
        let hiddenForm = document.getElementById("bezier_curves");
        hiddenForm.setAttribute("value", curvesJson);
    }

    /**
     * Call AnatomicalTracing method to draw bezierCurves
     */
    drawAllCurves() {
        this.anatomicalTracing.drawAllCurves();
        this.saveBezierCurve();
    }

    /**
     * Draw Curve box
     * @param {string} currentCurve
     */
    drawCurveBox(currentCurve) {
        this.anatomicalTracing.drawCurveBox(currentCurve, false);
    }

    /**
     * Draw all control points in a given curve
     * @param {string} curveName
     */
    drawPointCircle(curveName) {
        this.anatomicalTracing.drawPointCircle(curveName);
    }
}
