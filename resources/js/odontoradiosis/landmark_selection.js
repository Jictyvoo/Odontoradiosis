image_url = "";
global_points = null;
global_effects = null;
let all_curves = null;
let curveBox = null;
let boxPoints = null;
let isInsideBox = false;
let isOnBoxVertex = {isOn: false, index: 0};
let isOnCurvePoints = null;
let mousePosition = [x = null, y = null];
const scaleDrawValue = {pointRadius: 4, nameScale: 10, lineWidth: 1, textRelativePosition: {x: 15, y: 15}};
let pointRadius = 4; let nameScale = 10; let lineWidth = 1; let textRelativePosition = {x: 15, y: 15};

let isCurveFunction = false;
let isMouseDown = false;
document.onmousedown = function () {
    let hiddenForm = document.getElementById("current_image");
    const splicedSource = image_url.split("/");
    hiddenForm.setAttribute("value", splicedSource[splicedSource.length - 2] + "/" + splicedSource[splicedSource.length - 1]);
    isMouseDown = true;
};
document.onmouseup = function () {
    isMouseDown = false;
    isInsideBox = false;
    isOnBoxVertex = {isOn: false, index: 0};
    isOnCurvePoints = null;

    mousePosition.x = null;
    mousePosition.y = null;
};

const dynamicCanvasScale = function (valueToResize, isX, rect) {
    if (!rect) {
        rect = document.getElementById('landmarks').getBoundingClientRect();
    }
    const canvasDimensions = {
        width: rect.width, height: rect.height
    };
    let ctx = document.getElementById('landmarks').getContext('2d');
    const imageDimensions = {
        width: ctx.canvas.width, height: ctx.canvas.height
    };
    if (isX) {
        return (imageDimensions.width * valueToResize) / canvasDimensions.width;
    } else
        return (imageDimensions.height * valueToResize) / canvasDimensions.height;
};

function getMousePos(canvas, evt) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: dynamicCanvasScale(evt.clientX - rect.left, true, rect),
        y: dynamicCanvasScale(evt.clientY - rect.top, false, rect)
    };
}

function referenceLandmarks() {
    const selectedIndex = document.getElementById("pointsId").selectedIndex;
    const currentPoint = document.getElementById("pointsId").options[selectedIndex].text;
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
    /*imagePaths["Gônio (Go)"] = "";
    imagePaths["Órbitário (Or)"] = "";
    imagePaths["Pório (Po)"] = "";
    imagePaths["Ponta do Nariz (PtN)"] = "";
    imagePaths["Fossa Ptérigo Maxilar (Fpm)"] = "";
    imagePaths["Pterigóide (Pt)"] = "";*/
    if (currentPoint !== "Selecione" && imagePaths[currentPoint]) {
        let img = new Image();
        let ctx = document.getElementById('referenceLandmark');
        if (ctx.getContext) {
            ctx = ctx.getContext('2d');
            img.onload = function () {
                ctx.canvas.width = this.width;
                ctx.canvas.height = this.height;
                document.getElementById("canvas-reference").setAttribute("style",
                    "height: " + ctx.canvas.height + "px" + "width: " + ctx.canvas.width + "px");
                ctx.drawImage(img, 0, 0, ctx.canvas.width, ctx.canvas.height);    //draw background image
                ctx.fillStyle = "rgba(1, 1, 1, 0)"; //draw a box over the top
            };
        }
        img.src = reference_images_url + imagePaths[currentPoint];
    }
}

function toJson(toConvertArray) {
    let returnedJson = "{";
    Object.keys(toConvertArray).forEach(function (element, index, array) {
        if (index > 0) {
            returnedJson += ",";
        }
        returnedJson += "\"" + element + "\":[";
        toConvertArray[element].forEach(function (subElement, position, arr) {
            if (position > 0) {
                returnedJson += ",";
            }
            returnedJson += "[";
            subElement.forEach(function (item, count, subArray) {
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

function scaleDraw(canvas) {
    const rect = canvas.getBoundingClientRect();
    let ctx = document.getElementById('landmarks').getContext('2d');
    const imageDimensions = {
        width: ctx.canvas.width, height: ctx.canvas.height
    };
    if (imageDimensions.width > imageDimensions.height) {
        pointRadius = dynamicCanvasScale(scaleDrawValue.pointRadius, true, rect);
        nameScale = dynamicCanvasScale(scaleDrawValue.nameScale, true, rect);
        lineWidth = dynamicCanvasScale(scaleDrawValue.lineWidth, true, rect);
        textRelativePosition.x = dynamicCanvasScale(scaleDrawValue.textRelativePosition.x, true, rect);
        textRelativePosition.y = dynamicCanvasScale(scaleDrawValue.textRelativePosition.y, true, rect);
    } else {
        pointRadius = dynamicCanvasScale(scaleDrawValue.pointRadius, false, rect);
        nameScale = dynamicCanvasScale(scaleDrawValue.nameScale, false, rect);
        lineWidth = dynamicCanvasScale(scaleDrawValue.lineWidth, false, rect);
        textRelativePosition.x = dynamicCanvasScale(scaleDrawValue.textRelativePosition.x, false, rect);
        textRelativePosition.y = dynamicCanvasScale(scaleDrawValue.textRelativePosition.y, false, rect);
    }
}

function openImage(path='', loadFunction=null, id=-1) {
    let img = new Image();
    image_url = path;
    document.getElementById('stack-canvas').setAttribute("onmousedown", "bezier_coordinate(event)");
    document.getElementById('stack-canvas').setAttribute("onmousemove", "bezier_functions(event)");
    let ctx = document.getElementById('image');
    if (ctx.getContext) {
        ctx = ctx.getContext('2d');
        img.onload = function () {
            ctx.canvas.width = this.width;
            ctx.canvas.height = this.height;
            document.getElementById('landmarks').getContext('2d').canvas.width = ctx.canvas.width;
            document.getElementById('landmarks').getContext('2d').canvas.height = ctx.canvas.height;
            document.getElementById('bezier').getContext('2d').canvas.width = ctx.canvas.width;
            document.getElementById('bezier').getContext('2d').canvas.height = ctx.canvas.height;
            document.getElementById("card-canvas").setAttribute("style", "height: " + ctx.canvas.height + "px");

            scaleDraw(document.getElementById('landmarks'));

            ctx.drawImage(img, 0, 0, ctx.canvas.width, ctx.canvas.height);    //draw background image
            ctx.fillStyle = "rgba(1, 1, 1, 0)"; //draw a box over the top
            if (loadFunction) {
                loadFunction();
            }
            loadJsonCurve(id);
            loadJsonLandmarks(id);
        };
    }
    img.src = path;
}

function loadJsonLandmarks(id) {
    if(id && id > 0){
        const landmarkJson = landmarks_url.replace("%REPLACE%", id);
        fetch(landmarkJson)
            .then(response => {
                return response.json();
            })
            .then(data => {
                global_points = data;
            })
            .then(() => {
                redrawLandmark(document.getElementById('landmarks'));
            });
    }
}

function loadJsonCurve(id) {
    console.log(id);
    if(id && id > 0){
        const curveJson = curves_url.replace("%REPLACE%", id);
        /*$.getJSON(curveJson, function (data) {
            all_curves = data;
        });*/
        fetch(curveJson)
            .then(response => {
                return response.json();
            })
            .then(data => {
                all_curves = data;
            }).then(() => {
            draw_all_curves();
        });
    }
}

function image(path, id) {
    global_points = [];
    global_effects = [];
    openImage(path, null, id);
    reset();
}

function drawLandmark(div, landmarkName) {
    const locations = global_points[landmarkName];
    let context = div.getContext('2d');
    context.beginPath();
    context.arc(locations.X, locations.Y, pointRadius, 0, 2 * Math.PI);
    context.fillStyle = 'red';
    context.font = nameScale + "px Arial";
    context.fillText(landmarkName.match(/\(.+\)/), Math.floor(parseInt(locations.X) - textRelativePosition.x), Math.floor(parseInt(locations.Y) + textRelativePosition.y));
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = '#330005';
    context.stroke();
}

function redrawLandmark(canvas) {
    let context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    Object.keys(global_points).forEach(function (element, index, array) {
        drawLandmark(canvas, element);
    });
}

function saveLandmarks(landmarks) {
    const data_json = landmarksToJSON(landmarks);
    let hiddenForm = document.getElementById("saved_points");
    hiddenForm.setAttribute("value", data_json);
}

function coordinates(event) {
    const selectedIndex = document.getElementById("pointsId").selectedIndex;
    const currentPoint = document.getElementById("pointsId").options[selectedIndex].text;
    if (currentPoint !== "Selecione") {
        x = event.pageX;
        y = event.pageY;

        const div = document.getElementById('landmarks');
        if (!global_points[currentPoint]) {
            global_points[currentPoint] = [];
        }
        const currentMousePosition = getMousePos(div, event);
        global_points[currentPoint].X = currentMousePosition.x;
        global_points[currentPoint].Y = currentMousePosition.y;

        redrawLandmark(div);

        saveLandmarks(global_points);
    }
}

function desfazer() {
    /*erase the point*/
    /* will use global_effects array */
}

function landmarksToJSON(js_array) {
    let returned_json = "{";
    for (let key in js_array) {
        if (returned_json.length > 1) {
            returned_json = returned_json + ",";
        }
        returned_json = returned_json + "\"" + key + "\":{";
        // noinspection JSUnfilteredForInLoop
        let internalArray = js_array[key];
        returned_json = returned_json + "\"X\":" + internalArray.X + ",\"Y\":" + internalArray.Y + "}";
    }
    returned_json = returned_json + "}";
    return returned_json;
}

let brightness = document.getElementById('brightness'),
    contrast = document.getElementById('contrast'),
    grayscale = document.getElementById('grayscale'),
    invert = document.getElementById('invert');

function getValues() {
    let filterStyle = "filter: ",
        brightnessValue = brightness.value,
        contrastValue = contrast.value,
        grayscaleValue = grayscale.value,
        invertValue = invert.value;

    // noinspection JSAnnotator
    filterStyle += `
				brightness(${brightnessValue}%)
				contrast(${contrastValue}%)
				grayscale(${grayscaleValue}%)
				invert(${invertValue}%)`;

    return filterStyle;
}

function onChangeValue() {
    const imageDiv = document.getElementById('image');
    let filterValue = getValues();
    imageDiv.setAttribute("style", filterValue);
}

function reset() {
    brightness.value = 100;
    contrast.value = 100;
    grayscale.value = 0;
    invert.value = 0;
    onChangeValue();
}

function drawBezier(x1, y1, cx1, cy1, cx2, cy2, x2, y2) {
    const div = document.getElementById('bezier');
    let ctx = div.getContext('2d');
    ctx.strokeStyle = '#e3ed5c';
    ctx.moveTo(x1, y1);
    ctx.bezierCurveTo(cx1, cy1, cx2, cy2, x2, y2);
    ctx.lineWidth = lineWidth;
    ctx.stroke();
}

function drawCircle(context, x, y) {
    context.beginPath();
    context.moveTo(x, y);
    context.arc(x, y, pointRadius, 0, 2 * Math.PI);
    context.fillStyle = '#184bed';
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = '#184bed';
    context.stroke();
}

function drawPointCircle(curveName) {
    curveName = curveName.replace(/ /g, "-").toLowerCase();
    if (all_curves[curveName] != null) {
        const canvas = document.getElementById("bezier");
        const context = canvas.getContext("2d");
        context.beginPath();
        all_curves[curveName].forEach(function (element, index, array) {
            element.forEach(function (point, position, arr) {
                if (position % 2 !== 0) {
                    drawCircle(context, element[position - 1], element[position]);
                }
            });
        });
    }
}

function getBoxPoints(curveName, recalculate) {
    if (boxPoints != null && recalculate !== true) {
        return boxPoints;
    }
    let minX = Number.POSITIVE_INFINITY, minY = Number.POSITIVE_INFINITY;
    let maxX = Number.NEGATIVE_INFINITY, maxY = Number.NEGATIVE_INFINITY;
    all_curves[curveName].forEach(function (element, index, array) {
        element.forEach(function (point, position, arr) {
            if (position % 2 !== 0) {
                minY = Math.min(minY, point);
                maxY = Math.max(maxY, point);
            } else {
                minX = Math.min(minX, point);
                maxX = Math.max(maxX, point);
            }
        });
    });
    boxPoints = [minX, minY, maxX, maxY];
    return boxPoints;
}

function getBoxDimensions(curveName, borderSize, recalculate) {
    if (borderSize == null) {
        borderSize = 20;
    }
    let points = getBoxPoints(curveName, recalculate);
    let minX = points[0], minY = points[1];
    let maxX = points[2], maxY = points[3];
    let width = maxX - minX, height = maxY - minY;
    return [minX - borderSize, minY - borderSize, width + borderSize * 2, height + borderSize * 2];
}

function saveBezierCurve() {
    const curvesJson = toJson(all_curves);
    let hiddenForm = document.getElementById("bezier_curves");
    hiddenForm.setAttribute("value", curvesJson);
}

function draw_all_curves() {
    const canvas = document.getElementById('bezier');
    let context = canvas.getContext('2d');
    /*context.clearRect(0, 0, canvas.width, canvas.height);*/
    // noinspection SillyAssignmentJS
    context.canvas.width = context.canvas.width;
    Object.keys(all_curves).forEach(function (element, index, array) {
        all_curves[element].forEach(function (points, position, arr) {
            if (position === 0) {
                drawBezier(points[0], points[1], points[2], points[3], points[4], points[5], points[6], points[7]);
            } else {
                let temporary = all_curves[element][position - 1];
                drawBezier(temporary[temporary.length - 2], temporary[temporary.length - 1], points[0], points[1], points[2], points[3], points[4], points[5]);
            }
        })
    });
    saveBezierCurve();
}

function drawBoxVertex(context) {
    [
        [curveBox[0], curveBox[1]],
        [curveBox[0], curveBox[1] + curveBox[3]],
        [curveBox[0] + curveBox[2], curveBox[1]],
        [curveBox[0] + curveBox[2], curveBox[1] + curveBox[3]]
    ].forEach(function (element, index, array) {
        drawCircle(context, element[0], element[1]);
    });
}

function bezier_curve(currentCurve, recalculate) {
    if (currentCurve != null) {
        currentCurve = currentCurve.replace(/ /g, "-").toLowerCase();
        draw_all_curves();
        if (all_curves[currentCurve] != null) {
            curveBox = getBoxDimensions(currentCurve, null, recalculate);
            let context = document.getElementById('bezier').getContext('2d');
            context.lineWidth = lineWidth;
            context.beginPath();
            context.rect(curveBox[0], curveBox[1], curveBox[2], curveBox[3]);
            context.stroke();
            drawBoxVertex(context);
        }
    }
}

function runPointsAndChange(curveName, callback_1, callback_2, recalculate) {
    if (all_curves[curveName] != null) {
        all_curves[curveName].forEach(function (points, index, array) {
            points.forEach(function (point, position, arr) {
                if (position % 2 === 0) {
                    points[position] = callback_1(points[position], points[position + 1]);
                } else {
                    points[position] = callback_2(points[position], points[position - 1]);
                }
            });
        });
        bezier_curve(curveName, recalculate);
    }
}

function translateBezier(curveName, amountX, amountY) {
    curveName = curveName.replace(/ /g, "-").toLowerCase();
    boxPoints[0] -= amountX;
    boxPoints[1] -= amountY;
    boxPoints[2] -= amountX;
    boxPoints[3] -= amountY;
    runPointsAndChange(curveName, function (pointX) {
        return pointX - amountX;
    }, function (pointY) {
        return pointY - amountY;
    }, true);
}

function rotateBezier(curveName, angle) {
    curveName = curveName.replace(/ /g, "-").toLowerCase();
    runPointsAndChange(curveName, function (pointX, pointY) {
        return (pointX * Math.cos(angle)) - (pointY * Math.sin(angle));
    }, function (pointY, pointX) {
        return (pointX * Math.sin(angle)) + (pointY * Math.cos(angle));
    }, true);
}

function rescaleBezier(curveName, scaleX, scaleY) {
    curveName = curveName.replace(/ /g, "-").toLowerCase();
    runPointsAndChange(curveName, function (pointX) {
        return pointX * scaleX;
    }, function (pointY) {
        return pointY * scaleY;
    }, true);
}

function highLowAngle(oldPosition, currentPosition) {
    let maxX = Math.abs(oldPosition.x - currentPosition.x), maxY = Math.abs(oldPosition.y - currentPosition.y);
    if (Math.max(maxX, maxY) === maxX) {
        return oldPosition.x > currentPosition.x ? -1 : 1;
    }
    return oldPosition.y > currentPosition.y ? -1 : 1;
}

// noinspection JSUnusedGlobalSymbols
function bezier_functions(event) {
    event.preventDefault();
    event.stopPropagation(); // tell the browser we're handling this event
    const canvas = document.getElementById('bezier');
    let context = canvas.getContext('2d');
    context.translate(canvas.width / 2, canvas.height / 2);
    if (isMouseDown && isCurveFunction) { /* do drag things */
        document.getElementById('bezier').style.cursor = "move";
        const selectedIndex = document.getElementById("curvesId").selectedIndex;
        const curveName = document.getElementById("curvesId").options[selectedIndex].text;
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
                if(isOnBoxVertex.index < 2){
                    scaleX = mousePosition.x / currentPosition.x;
                }
                let scaleY = currentPosition.y / mousePosition.y;
                if(isOnBoxVertex.index % 2 === 0){
                    scaleY = mousePosition.y / currentPosition.y;
                }
                rescaleBezier(curveName, scaleX, scaleY);
            } else if (isOnCurvePoints != null) {
                isOnCurvePoints[0][isOnCurvePoints[1]] -= mousePosition.x - currentPosition.x;
                isOnCurvePoints[0][isOnCurvePoints[2]] -= mousePosition.y - currentPosition.y;
                bezier_curve(curveName, true);
            } else if (isInsideBox) {
                translateBezier(curveName, mousePosition.x - currentPosition.x, mousePosition.y - currentPosition.y);
            } else {
                // noinspection JSSuspiciousNameCombination
                let productModule = {
                    first: Math.sqrt(Math.pow(currentPosition.x, 2) + Math.pow(currentPosition.y, 2)),
                    second: Math.sqrt(Math.pow(mousePosition.x, 2) + Math.pow(mousePosition.y, 2))
                };
                let scaleProduct = Math.abs((currentPosition.x * mousePosition.x) + (currentPosition.y * mousePosition.y));
                let angle = Math.acos(scaleProduct / (productModule.first * productModule.second));
                if (!isNaN(angle)) {
                    angle *= highLowAngle(mousePosition, {x: currentPosition.x, y: currentPosition.y});
                    rotateBezier(curveName, angle);
                }
            }
            mousePosition.x = currentPosition.x;
            mousePosition.y = currentPosition.y;
            drawPointCircle(curveName);
        }
    } else if (isCurveFunction) {
        document.getElementById('bezier').style.cursor = "crosshair";
    }
}

function verifyMouseOnBoxVertex(relativeMouse, curveName) {
    let boxVertex = getBoxDimensions(curveName, null, true);
    let isOn = false; let vertexIndex = 0;
    [
        [boxVertex[0], boxVertex[1]],
        [boxVertex[0], boxVertex[1] + boxVertex[3]],
        [boxVertex[0] + boxVertex[2], boxVertex[1]],
        [boxVertex[0] + boxVertex[2], boxVertex[1] + boxVertex[3]]
    ].forEach(function (element, index, array) {
        if (relativeMouse.x >= element[0] - pointRadius && relativeMouse.x <= element[0] + pointRadius
            && relativeMouse.y >= element[1] - pointRadius && relativeMouse.y <= element[1] + pointRadius) {
            isOn = true; vertexIndex = index;
        }
    });
    return {isOn: isOn, index: vertexIndex};
}

function verifyMouseOnCurvePoint(relativeMouse, curveName) {
    let isOn = null;
    all_curves[curveName].forEach(function (element, index, array) {
        element.forEach(function (point, position, arr) {
            if (position % 2 === 0) {
                if (relativeMouse.x >= element[position] - pointRadius && relativeMouse.x <= element[position] + pointRadius
                    && relativeMouse.y >= element[position + 1] - pointRadius && relativeMouse.y <= element[position + 1] + pointRadius) {
                    isOn = [element, position, position + 1];
                }
            }
        });
    });
    return isOn;
}

// noinspection JSUnusedGlobalSymbols
function bezier_coordinate(event) {
    const selectedIndex = document.getElementById("curvesId").selectedIndex;
    const currentCurve = document.getElementById("curvesId").options[selectedIndex].text;
    const curveName = currentCurve.replace(/ /g, "-").toLowerCase();
    if (currentCurve === "Selecione") {
        isCurveFunction = false;
        coordinates(event);
    } else if (all_curves[curveName] != null) {
        isCurveFunction = true;
        let points = getBoxDimensions(curveName);
        const relativeMouse = getMousePos(document.getElementById('bezier'), event);
        isInsideBox = relativeMouse.x >= points[0] && relativeMouse.x <= points[0] + points[2]
            && relativeMouse.y >= points[1] && relativeMouse.y <= points[1] + points[3];
        isOnBoxVertex = verifyMouseOnBoxVertex(relativeMouse, curveName);
        isOnCurvePoints = verifyMouseOnCurvePoint(relativeMouse, curveName);
    }
}

let elements = ["contrast", "brightness", "invert", "grayscale"];//document.getElementsByTagName('input');
for (let i = 0; i < elements.length; i++) {
    document.getElementById(elements[i]).addEventListener("input", onChangeValue);
}

let curveSelect = document.getElementById("curvesId");
curveSelect.addEventListener("input", function () {
    const selectedIndex = document.getElementById("curvesId").selectedIndex;
    const currentCurve = document.getElementById("curvesId").options[selectedIndex].text;
    bezier_curve(currentCurve);
    drawPointCircle(currentCurve);
    if (currentCurve !== "Selecione") {
        document.getElementById('stack-canvas').style.cursor = "move";
    } else {
        document.getElementById('stack-canvas').style.cursor = "crosshair";
    }
});
