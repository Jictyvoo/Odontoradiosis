class TracingController {
    /**
     * Constructor
     * @param {CanvasOdontoradiosis} canvasOdontoradiosis
     */
    constructor(canvasOdontoradiosis) {
        this.canvasOdontoradiosis = canvasOdontoradiosis;
        this.anatomicalTracing = new AnatomicalTracing(canvasOdontoradiosis);
        this.bezierPoints = [];
        this.currentBoxPoints = [0, 0, 0, 0];
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
     * Verify if curve exists
     * @param {string} curveId
     * @returns {boolean}
     */
    curveExists(curveId = "") {
        return this.bezierPoints[curveId] != null;
    }

    /**
     * Save all bezier curves in a hidden form
     */
    saveBezierCurve() {
        const curvesJson = JSON.stringify(this.bezierPoints);
        let hiddenForm = document.getElementById("bezier_curves");
        hiddenForm.setAttribute("value", curvesJson);
    }

    /**
     * Returns all points in a curve box
     * @param {string} curveName
     * @param {boolean} recalculate
     */
    getBoxPoints(curveName, recalculate) {
        if (this.currentBoxPoints != null && !recalculate) {
            return this.currentBoxPoints;
        }
        let minX = Number.POSITIVE_INFINITY,
            minY = Number.POSITIVE_INFINITY;
        let maxX = Number.NEGATIVE_INFINITY,
            maxY = Number.NEGATIVE_INFINITY;
        this.bezierPoints[curveName].forEach(function(element, index, array) {
            element.forEach(function(point, position, arr) {
                if (position % 2 !== 0) {
                    minY = Math.min(minY, point);
                    maxY = Math.max(maxY, point);
                } else {
                    minX = Math.min(minX, point);
                    maxX = Math.max(maxX, point);
                }
            });
        });
        this.currentBoxPoints = [minX, minY, maxX, maxY];
        return this.currentBoxPoints;
    }

    /**
     * Returns an array with box dimensions of a specific curve
     * @param {string} curveName
     * @param {int} borderSize
     * @param {boolean} recalculate
     */
    getBoxDimensions(curveName, borderSize = 20, recalculate = false) {
        const points = this.getBoxPoints(curveName, recalculate);
        let minX = points[0],
            minY = points[1];
        let maxX = points[2],
            maxY = points[3];
        let width = maxX - minX,
            height = maxY - minY;
        return [
            minX - borderSize,
            minY - borderSize,
            width + borderSize * 2,
            height + borderSize * 2
        ];
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
     * @param {boolean} recalculate
     */
    drawCurveBox(currentCurve, recalculate) {
        this.anatomicalTracing.drawCurveBox(
            currentCurve,
            this.getBoxDimensions(currentCurve, null, recalculate)
        );
    }

    /**
     * Draw all control points in a given curve
     * @param {string} curveName
     */
    drawPointCircle(curveName) {
        this.anatomicalTracing.drawPointCircle(curveName);
    }

    /**
     * Returns a object containing a boolean if is on a boxVertex, and it index
     * @param {*} relativeMouse
     * @param {string} curveName
     */
    verifyMouseOnBoxVertex(relativeMouse, curveName) {
        const boxVertex = this.getBoxDimensions(curveName, null, true);
        let isOn = false;
        let vertexIndex = 0;
        [
            [boxVertex[0], boxVertex[1]],
            [boxVertex[0], boxVertex[1] + boxVertex[3]],
            [boxVertex[0] + boxVertex[2], boxVertex[1]],
            [boxVertex[0] + boxVertex[2], boxVertex[1] + boxVertex[3]]
        ].forEach(function(element, index, array) {
            if (
                relativeMouse.x >= element[0] - pointRadius &&
                relativeMouse.x <= element[0] + pointRadius &&
                relativeMouse.y >= element[1] - pointRadius &&
                relativeMouse.y <= element[1] + pointRadius
            ) {
                isOn = true;
                vertexIndex = index;
            }
        });
        return { isOn: isOn, index: vertexIndex };
    }

    /**
     * Returns the current position of the mouse if it is on a curve point
     * @param {*} relativeMouse
     * @param {string} curveName
     */
    verifyMouseOnCurvePoint(relativeMouse, curveName) {
        let isOn = null;
        this.bezierPoints[curveName].forEach(function(element, index, array) {
            element.forEach(function(point, position, arr) {
                if (position % 2 === 0) {
                    if (
                        relativeMouse.x >= element[position] - pointRadius &&
                        relativeMouse.x <= element[position] + pointRadius &&
                        relativeMouse.y >=
                            element[position + 1] - pointRadius &&
                        relativeMouse.y <= element[position + 1] + pointRadius
                    ) {
                        isOn = [element, position, position + 1];
                    }
                }
            });
        });
        return isOn;
    }
}
