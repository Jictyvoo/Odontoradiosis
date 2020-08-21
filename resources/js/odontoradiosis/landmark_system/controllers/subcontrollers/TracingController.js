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
     * Verify if curve exists and returns it or null
     * @param {string} curveId
     */
    getCurve(curveId = "") {
        if (this.curveExists(curveId)) {
            return this.bezierPoints[curveId];
        }
        return null;
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
     * @returns {object} { isOn: isOn, index: vertexIndex }
     */
    verifyMouseOnBoxVertex(relativeMouse, curveName) {
        const boxVertex = this.getBoxDimensions(curveName, null, true);
        let isOn = false;
        let vertexIndex = 0;
        const pointRadius = this.canvasOdontoradiosis.scaleManager.pointRadius;
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
     * @returns {array} [element, subindex, subindex + 1]
     */
    verifyMouseOnCurvePoint(relativeMouse, curveName) {
        let isOn = null;
        const pointRadius = this.canvasOdontoradiosis.scaleManager.pointRadius;
        for (
            let index = 0;
            index < this.bezierPoints[curveName].length;
            index++
        ) {
            const element = this.bezierPoints[curveName][index];
            for (let subindex = 0; subindex < element.length; subindex += 2) {
                if (
                    relativeMouse.x >= element[subindex] - pointRadius &&
                    relativeMouse.x <= element[subindex] + pointRadius &&
                    relativeMouse.y >= element[subindex + 1] - pointRadius &&
                    relativeMouse.y <= element[subindex + 1] + pointRadius
                ) {
                    isOn = [element, subindex, subindex + 1];
                }
            }
        }
        return isOn;
    }

    /**
     * Iterate all curves and changes it value
     * @param {string} curveName
     * @param {function} callback_1
     * @param {funtion} callback_2
     * @param {boolean} recalculate
     */
    runPointsAndChange(curveName, callback_1, callback_2, recalculate) {
        if (this.bezierPoints[curveName] != null) {
            this.bezierPoints[curveName].forEach(function(
                points,
                index,
                array
            ) {
                points.forEach(function(point, position, arr) {
                    if (position % 2 === 0) {
                        points[position] = callback_1(
                            points[position],
                            points[position + 1]
                        );
                    } else {
                        points[position] = callback_2(
                            points[position],
                            points[position - 1]
                        );
                    }
                });
            });
            //this.anatomicalTracing.setAllCurves(this.bezierPoints);
        }
    }

    /**
     * Translate a curve
     * @param {string} curveName
     * @param {float} amountX
     * @param {float} amountY
     */
    translateBezier(curveName, amountX, amountY) {
        this.currentBoxPoints[0] -= amountX;
        this.currentBoxPoints[1] -= amountY;
        this.currentBoxPoints[2] -= amountX;
        this.currentBoxPoints[3] -= amountY;
        this.runPointsAndChange(
            curveName,
            function(pointX) {
                return pointX - amountX;
            },
            function(pointY) {
                return pointY - amountY;
            },
            true
        );
    }

    /**
     * Rotate a bezier curve
     * @param {string} curveName
     * @param {float} angle
     */
    rotateBezier(curveName, angle) {
        this.runPointsAndChange(
            curveName,
            function(pointX, pointY) {
                return pointX * Math.cos(angle) - pointY * Math.sin(angle);
            },
            function(pointY, pointX) {
                return pointX * Math.sin(angle) + pointY * Math.cos(angle);
            },
            true
        );
    }

    /**
     * Reescale all bezier curves, based on scales given
     * @param {string} curveName
     * @param {float} scaleX
     * @param {float} scaleY
     */
    rescaleBezier(curveName, scaleX, scaleY) {
        this.runPointsAndChange(
            curveName,
            function(pointX) {
                return pointX * scaleX;
            },
            function(pointY) {
                return pointY * scaleY;
            },
            true
        );
    }
}
