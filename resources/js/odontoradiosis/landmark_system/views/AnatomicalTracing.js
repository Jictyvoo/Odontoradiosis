class AnatomicalTracing {
    /**
     * Constructor
     * @param {CanvasOdontoradiosis} canvas
     * @param {int} lineWidth
     */
    constructor(canvas, lineWidth) {
        this.canvas = canvas;
        this.lineWidth = lineWidth != null ? lineWidth : canvas.lineWidth;
        this.allCurves = [];
        this.currentBoxPoints = [0, 0, 0, 0];
    }

    /**
     * Bezier curves setter
     * @param {array} curves
     */
    setAllCurves(curves) {
        this.allCurves = curves;
    }

    /**
     * Returns all points in a curve box
     * @param {string} curveName
     * @param {boolean} recalculate
     */
    getBoxPoints(curveName, recalculate) {
        if (this.currentBoxPoints != null && recalculate !== true) {
            return this.currentBoxPoints;
        }
        let minX = Number.POSITIVE_INFINITY,
            minY = Number.POSITIVE_INFINITY;
        let maxX = Number.NEGATIVE_INFINITY,
            maxY = Number.NEGATIVE_INFINITY;
        this.allCurves[curveName].forEach(function(element, index, array) {
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
    getBoxDimensions(curveName, borderSize, recalculate) {
        if (borderSize == null) {
            borderSize = 20;
        }
        let points = getBoxPoints(curveName, recalculate);
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
        allCurves[curveName].forEach(function(element, index, array) {
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

    /**
     * Draw all curves
     */
    drawAllCurves() {
        this.canvasOdontoradiosis.clearCanvas("bezier");
        Object.keys(this.allCurves).forEach(function(element, index, array) {
            this.allCurves[element].forEach(function(points, position, arr) {
                if (position === 0) {
                    this.canvas.drawBezier(
                        this.canvas.getContext("bezier"),
                        points[0],
                        points[1],
                        points[2],
                        points[3],
                        points[4],
                        points[5],
                        points[6],
                        points[7],
                        "#00e379"
                    );
                } else {
                    let temporary = this.allCurves[element][position - 1];
                    this.canvas.drawBezier(
                        this.canvas.getContext("bezier"),
                        temporary[temporary.length - 2],
                        temporary[temporary.length - 1],
                        points[0],
                        points[1],
                        points[2],
                        points[3],
                        points[4],
                        points[5],
                        "#00e379"
                    );
                }
            });
        });
    }

    /**
     * Draw all control points in a given curve
     * @param {string} curveName
     */
    drawPointCircle(curveName) {
        curveName = curveName.replace(/ /g, "-").toLowerCase();
        if (this.allCurves[curveName] != null) {
            const context = this.canvas.getContext("bezier");
            //context.beginPath();
            this.allCurves[curveName].forEach(function(element, index, array) {
                element.forEach(function(point, position, arr) {
                    if (position % 2 !== 0) {
                        drawCircle(
                            context,
                            element[position - 1],
                            element[position]
                        );
                    }
                });
            });
        }
    }

    /**
     *
     * @param {CanvasRenderingContext2D} context
     */
    drawBoxVertex(context) {
        [
            [curveBox[0], curveBox[1]],
            [curveBox[0], curveBox[1] + curveBox[3]],
            [curveBox[0] + curveBox[2], curveBox[1]],
            [curveBox[0] + curveBox[2], curveBox[1] + curveBox[3]]
        ].forEach(function(element, index, array) {
            this.canvas.drawCircle(context, element[0], element[1]);
        });
    }

    /**
     *
     * @param {string} currentCurve
     * @param {boolean} recalculate
     */
    drawCurveBox(currentCurve, recalculate) {
        if (currentCurve != null) {
            currentCurve = currentCurve.replace(/ /g, "-").toLowerCase();
            this.drawAllCurves();
            if (this.allCurves[currentCurve] != null) {
                const curveBox = this.getBoxDimensions(
                    currentCurve,
                    null,
                    recalculate
                );
                let context = this.canvas.getCanvas("bezier").getContext("2d");
                context.lineWidth = lineWidth;
                context.beginPath();
                context.rect(
                    curveBox[0],
                    curveBox[1],
                    curveBox[2],
                    curveBox[3]
                );
                context.stroke();
                this.drawBoxVertex(context);
            }
        }
    }

    /**
     * Iterate all curves and changes it value
     * @param {string} curveName
     * @param {function} callback_1
     * @param {funtion} callback_2
     * @param {boolean} recalculate
     */
    runPointsAndChange(curveName, callback_1, callback_2, recalculate) {
        if (this.allCurves[curveName] != null) {
            this.allCurves[curveName].forEach(function(points, index, array) {
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
            this.drawCurveBox(curveName, recalculate);
        }
    }

    /**
     * Translate a curve
     * @param {string} curveName
     * @param {float} amountX
     * @param {float} amountY
     */
    translateBezier(curveName, amountX, amountY) {
        curveName = curveName.replace(/ /g, "-").toLowerCase();
        boxPoints[0] -= amountX;
        boxPoints[1] -= amountY;
        boxPoints[2] -= amountX;
        boxPoints[3] -= amountY;
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
        curveName = curveName.replace(/ /g, "-").toLowerCase();
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
        curveName = curveName.replace(/ /g, "-").toLowerCase();
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
