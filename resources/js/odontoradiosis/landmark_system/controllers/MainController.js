class MainController {
    /**
     * Constructor
     * @param {array} urls
     * @param {CanvasOdontoradiosis} canvasOdontoradiosis
     */
    constructor(urls, canvasOdontoradiosis) {
        this.urls = urls;
        this.canvasOdontoradiosis = canvasOdontoradiosis;
        this.tracingController = new TracingController(canvasOdontoradiosis);
        this.landmarksController = new LandmarksController(
            canvasOdontoradiosis
        );
        this.isCurveFunction = false;
        this.isInsideBox = false;
        this.isOnBoxVertex = false;
        this.isOnCurvePoints = false;
    }

    /**
     * @param {string} id
     * @return {string}
     */
    getUrl(id) {
        return this.urls[id];
    }

    /**
     * Set the address of url with given id
     * @param {string} id
     * @param {string} address
     */
    setUrl(id, address) {
        this.urls[id] = address;
    }

    /**
     * Loads json file with landmarks location
     * @param {int} id image id
     */
    loadJsonLandmarks(id) {
        if (id && id > 0) {
            const landmarkJson = this.urls["landmarks"].replace(
                "%REPLACE%",
                id
            );
            const selfLandmarksController = this.landmarksController;
            fetch(landmarkJson)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    selfLandmarksController.setLandmarks.call(
                        selfLandmarksController,
                        data
                    );
                })
                .then(() => {
                    selfLandmarksController.redrawLandmarks.call(
                        selfLandmarksController
                    );
                });
        }
    }

    /**
     * Loads json file with bezier anatomical tracing points
     * @param {int} id image id
     */
    loadJsonCurve(id) {
        if (id && id > 0) {
            const curveJson = this.urls["curves"].replace("%REPLACE%", id);
            const selfTracingController = this.tracingController;
            selfTracingController.drawAllCurves.call(selfTracingController);
            fetch(curveJson)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    selfTracingController.setBezierPoints.call(
                        selfTracingController,
                        data
                    );
                })
                .then(() => {
                    selfTracingController.drawAllCurves.call(
                        selfTracingController
                    );
                });
        }
    }

    /**
     * Adapt reference landmarks
     */
    referenceLandmarks() {
        const selectedIndex = document.getElementById("pointsId").selectedIndex;
        const currentPoint = document.getElementById("pointsId").options[
            selectedIndex
        ].text;
        const imagePaths = [];
        imagePaths["Sela (S)"] = "selaTurcica.png";
        imagePaths["Násio (N)"] = "nasio.png";
        imagePaths["Espinha nasal anterior (ENA)"] = "ENA.png";
        imagePaths["Espinha nasal posterior (ENP)"] = "ENP.png";
        imagePaths["Ponto subespinhal (A)"] = "A.png";
        imagePaths["Ponto pupramental (B)"] = "B.png";
        imagePaths["Pogônio (Pog)"] = "pogonio.png";
        imagePaths["Gnátio (Gn)"] = "Gnatio.png";
        imagePaths["Mento (Me)"] = "mento.png";
        imagePaths["Condílio (Co)"] = "condilio.png";
        imagePaths["Pró-nasal (Pn)"] = "proNasal.png";
        imagePaths["Pogônio Mole (Pg)"] = "pogonioMole.png";
        imagePaths["Palato Mole (pm)"] = "palatoMole.png";
        imagePaths["Gônio (Go)"] = "";
        imagePaths["Órbitário (Or)"] = "";
        imagePaths["Pório (Po)"] = "";
        imagePaths["Ponta do Nariz (PtN)"] = "";
        imagePaths["Fossa Ptérigo Maxilar (Fpm)"] = "";
        imagePaths["Pterigóide (Pt)"] = "";
        if (currentPoint !== "Selecione" && imagePaths[currentPoint]) {
            let img = new Image();
            let context = document.getElementById("referenceLandmark");
            if (context.getContext) {
                context = context.getContext("2d");
                img.onload = function() {
                    context.canvas.width = this.width;
                    context.canvas.height = this.height;
                    document
                        .getElementById("canvas-reference")
                        .setAttribute(
                            "style",
                            "height: " +
                                context.canvas.height +
                                "px" +
                                "width: " +
                                context.canvas.width +
                                "px"
                        );
                    context.drawImage(
                        img,
                        0,
                        0,
                        context.canvas.width,
                        context.canvas.height
                    ); //draw background image
                    context.fillStyle = "rgba(1, 1, 1, 0)"; //draw a box over the top
                };
            }
            img.src = this.urls["reference_images"] + imagePaths[currentPoint];
        }
    }

    /**
     * Change or set point location on current mouse position
     * @param {*} event
     */
    markLandmarkPoint(event) {
        const selectedIndex = document.getElementById("pointsId").selectedIndex;
        const currentPoint = document.getElementById("pointsId").options[
            selectedIndex
        ].text;
        if (currentPoint !== "Selecione") {
            const landmarkCanvas = this.canvasOdontoradiosis.getCanvas(
                "landmarks"
            );
            const currentLandmark = this.landmarksController.verifyLandmark(
                currentPoint,
                true
            );
            const currentMousePosition = this.canvasOdontoradiosis.scaleManager.getMousePos(
                landmarkCanvas,
                event
            );
            currentLandmark.X = currentMousePosition.x;
            currentLandmark.Y = currentMousePosition.y;

            this.landmarksController.saveLandmarks();
            this.landmarksController.redrawLandmarks();
        }
    }

    /**
     *
     * @param {*} event
     */
    bezier_functions(event) {
        event.preventDefault();
        event.stopPropagation(); // tell the browser we're handling this event
        const canvas = document.getElementById("bezier");
        let context = canvas.getContext("2d");
        context.translate(canvas.width / 2, canvas.height / 2);
        if (isMouseDown && isCurveFunction) {
            /* do drag things */
            document.getElementById("bezier").style.cursor = "move";
            const selectedIndex = document.getElementById("curvesId")
                .selectedIndex;
            const curveName = document.getElementById("curvesId").options[
                selectedIndex
            ].text;
            if (mousePosition.x == null) {
                mousePosition.x = dynamicCanvasScale(event.clientX, true);
                mousePosition.y = dynamicCanvasScale(event.clientY, false);
            } else {
                let currentPosition = {
                    x: dynamicCanvasScale(event.clientX, true),
                    y: dynamicCanvasScale(event.clientY, false)
                };
                saveBezierCurve();
                if (isOnBoxVertex.isOn) {
                    /*still need to fix problem when rescale with top points*/
                    let scaleX = currentPosition.x / mousePosition.x;
                    if (isOnBoxVertex.index < 2) {
                        scaleX = mousePosition.x / currentPosition.x;
                    }
                    let scaleY = currentPosition.y / mousePosition.y;
                    if (isOnBoxVertex.index % 2 === 0) {
                        scaleY = mousePosition.y / currentPosition.y;
                    }
                    rescaleBezier(curveName, scaleX, scaleY);
                } else if (isOnCurvePoints != null) {
                    isOnCurvePoints[0][isOnCurvePoints[1]] -=
                        mousePosition.x - currentPosition.x;
                    isOnCurvePoints[0][isOnCurvePoints[2]] -=
                        mousePosition.y - currentPosition.y;
                    bezier_curve(curveName, true);
                } else if (isInsideBox) {
                    translateBezier(
                        curveName,
                        mousePosition.x - currentPosition.x,
                        mousePosition.y - currentPosition.y
                    );
                } else {
                    // noinspection JSSuspiciousNameCombination
                    let angle = calculateAngle(currentPosition, mousePosition);
                    if (!isNaN(angle)) {
                        angle *= highLowAngle(mousePosition, {
                            x: currentPosition.x,
                            y: currentPosition.y
                        });
                        rotateBezier(curveName, angle);
                    }
                }
                mousePosition.x = currentPosition.x;
                mousePosition.y = currentPosition.y;
                drawPointCircle(curveName);
            }
        } else if (isCurveFunction) {
            document.getElementById("bezier").style.cursor = "crosshair";
        }
    }

    /**
     *
     * @param {*} event
     */
    manageMouseDown(event) {
        const selectedIndex = document.getElementById("curvesId").selectedIndex;
        const currentCurve = document.getElementById("curvesId").options[
            selectedIndex
        ].text;
        const curveName = currentCurve.replace(/ /g, "-").toLowerCase();
        if (currentCurve === "Selecione") {
            this.isCurveFunction = false;
            this.markLandmarkPoint(event);
        } else if (all_curves[curveName] != null) {
            this.isCurveFunction = true;
            let points = getBoxDimensions(curveName);
            const relativeMouse = getMousePos(
                document.getElementById("bezier"),
                event
            );
            this.isInsideBox =
                relativeMouse.x >= points[0] &&
                relativeMouse.x <= points[0] + points[2] &&
                relativeMouse.y >= points[1] &&
                relativeMouse.y <= points[1] + points[3];
            this.isOnBoxVertex = this.tracingController.verifyMouseOnBoxVertex(
                relativeMouse,
                curveName
            );
            this.isOnCurvePoints = this.tracingController.verifyMouseOnCurvePoint(
                relativeMouse,
                curveName
            );
        }
    }

    /**
     * Facial analysis
     */
    facial_analysis() {
        if (enable_draw_bezier) {
            const glabela = {
                x: all_curves["perfil-mole"][0][0],
                y: all_curves["perfil-mole"][0][1]
            };
            const subnasal = {
                x: all_curves["perfil-mole"][1][4],
                y: all_curves["perfil-mole"][1][5]
            };
            const pogonion = {
                x: all_curves["perfil-mole"][5][4],
                y: all_curves["perfil-mole"][5][5]
            };
            const div = document.getElementById("bezier");
            let ctx = div.getContext("2d");
            ctx.strokeStyle = "#451c87";
            ctx.beginPath();
            ctx.moveTo(pogonion.x, pogonion.y);
            ctx.lineTo(subnasal.x, subnasal.y);
            ctx.lineTo(glabela.x, glabela.y);
            ctx.lineWidth = lineWidth * 2;
            ctx.stroke();
            let toCalculate = normalizeValues(glabela, pogonion, subnasal);
            let angle =
                calculateAngle(toCalculate[0], toCalculate[1]) *
                (subnasal.x > pogonion.x ? -1 : 1);
            angle = (180 * angle) / Math.PI;
            let td = document.getElementById("td-face_type");
            if (angle + 5 >= 0 && angle + 5 <= 10) {
                td.innerHTML = "Reto";
            } else if (angle < 0) {
                td.innerHTML = "Concavo";
            } else {
                td.innerHTML = "Convexo";
            }
        }
    }
}
