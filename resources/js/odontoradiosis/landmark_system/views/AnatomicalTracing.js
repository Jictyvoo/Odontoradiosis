class AnatomicalTracing {
    /**
     * Constructor
     * @param {CanvasOdontoradiosis} canvas
     */
    constructor(canvas) {
        this.canvas = canvas;
        this.allCurves = [];
    }

    /**
     * Bezier curves setter
     * @param {array} curves
     */
    setAllCurves(curves) {
        this.allCurves = curves;
    }

    /**
     * Draw all curves
     */
    drawAllCurves() {
        this.canvas.clearCanvas("bezier");
        const selfCanvas = this.canvas;
        const selfCurves = this.allCurves;
        Object.keys(this.allCurves).forEach(function(element, index, _array) {
            selfCurves[element].forEach(function(points, position, arr) {
                if (position === 0) {
                    selfCanvas.drawBezier.call(
                        selfCanvas,
                        selfCanvas.getContext.call(selfCanvas, "bezier"),
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
                    let temporary = selfCurves[element][position - 1];
                    selfCanvas.drawBezier.call(
                        selfCanvas,
                        selfCanvas.getContext.call(selfCanvas, "bezier"),
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
            for (
                let index = 0;
                index < this.allCurves[curveName].length;
                index++
            ) {
                const element = this.allCurves[curveName][index];
                for (
                    let subindex = 1;
                    subindex < element.length;
                    subindex += 2
                ) {
                    this.canvas.drawCircle(
                        context,
                        element[subindex - 1],
                        element[subindex]
                    );
                }
            }
        }
    }

    /**
     *
     * @param {CanvasRenderingContext2D} context
     * @param {array} boxDimensions
     */
    drawBoxVertex(context, boxDimensions) {
        const selfCanvas = this.canvas;
        [
            [boxDimensions[0], boxDimensions[1]],
            [boxDimensions[0], boxDimensions[1] + boxDimensions[3]],
            [boxDimensions[0] + boxDimensions[2], boxDimensions[1]],
            [
                boxDimensions[0] + boxDimensions[2],
                boxDimensions[1] + boxDimensions[3]
            ]
        ].forEach(function(element, index, array) {
            selfCanvas.drawCircle.call(
                selfCanvas,
                context,
                element[0],
                element[1]
            );
        });
    }

    /**
     *
     * @param {string} currentCurve
     * @param {array} boxDimensions
     */
    drawCurveBox(currentCurve, boxDimensions) {
        if (currentCurve != null) {
            this.drawAllCurves();
            let context = this.canvas.getContext("bezier");
            context.beginPath();
            context.lineWidth = this.canvas.scaleManager.lineWidth;
            context.rect(
                boxDimensions[0],
                boxDimensions[1],
                boxDimensions[2],
                boxDimensions[3]
            );
            context.stroke();
            this.drawBoxVertex(context, boxDimensions);
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
