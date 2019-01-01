image_url = "";
global_points = null;
global_effects = null;
let all_curves = null;
let curveBox = null;
let boxPoints = null;
let isInsideBox = false;
let isOnBoxVertex = false;
let isOnCurvePoints = null;
let mousePosition = [x = null, y = null];
const pointRadius = 4;

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
    isOnBoxVertex = false;
    isOnCurvePoints = null;

    mousePosition.x = null;
    mousePosition.y = null;
};

function getMousePos(canvas, evt) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
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

function openImage(path, loadFunction) {
    img = new Image();
    image_url = path;
    document.getElementById('stack-canvas').setAttribute("onmousedown", "bezier_coordinate(event)");
    document.getElementById('stack-canvas').setAttribute("onmousemove", "bezier_functions(event)");
    let ctx = document.getElementById('image');
    if (ctx.getContext) {
        ctx = ctx.getContext('2d');
        ctx.canvas.width = window.innerWidth;
        document.getElementById('landmarks').getContext('2d').canvas.width = window.innerWidth;
        document.getElementById('landmarks').getContext('2d').canvas.height = 785;
        document.getElementById('bezier').getContext('2d').canvas.width = window.innerWidth;
        document.getElementById('bezier').getContext('2d').canvas.height = 785;
        ctx.canvas.height = 785;
        img.onload = function () {
            ctx.drawImage(img, 0, 0, 1050, 785);    //draw background image
            ctx.fillStyle = "rgba(1, 1, 1, 0)"; //draw a box over the top
            if (loadFunction) {
                loadFunction();
            }
            draw_all_curves();
        };
    }
    img.src = path;
}

function loadJsonCurve() {
    $.getJSON(curves_url, function (data) {
        all_curves = data;
    });
}

function image(path) {
    global_points = [];
    global_effects = [];
    loadJsonCurve();
    openImage(path, null);
    reset();
}

function drawLandmark(div, landmarkName) {
    const locations = global_points[landmarkName];
    let ctx = div.getContext('2d');
    ctx.beginPath();
    const imageOffset = $("#image").offset();
    const imgOfLf = imageOffset.left;
    const imgOfTp = imageOffset.top;
    ctx.arc(Math.floor(parseInt(locations.X) - imgOfLf), Math.floor(parseInt(locations.Y) - imgOfTp), 4, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'red';
    ctx.font = "10px Arial";
    ctx.fillText(landmarkName, Math.floor(parseInt(locations.X) - imgOfLf - 15), Math.floor(parseInt(locations.Y) - imgOfTp + 15));
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#330005';
    ctx.stroke();
}

function redrawLandmark(canvas) {
    let context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    Object.keys(global_points).forEach(function (element, index, array) {
        drawLandmark(canvas, element);
    });
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

        global_points[currentPoint].X = x;
        global_points[currentPoint].Y = y;

        redrawLandmark(div);

        const data_json = landmarksToJSON(global_points);
        let hiddenForm = document.getElementById("saved_points");
        hiddenForm.setAttribute("value", data_json);
    }
}

function desfazer() {
    global_points.htmlPoint.outerHTML = '';
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
    const imageOffset = $("#image").offset();
    const imgOfLf = imageOffset.left;
    const imgOfTp = 10;//imageOffset.top;
    ctx.strokeStyle = '#e3ed5c';
    ctx.moveTo(x1 + imgOfLf, y1 + imgOfTp);
    ctx.bezierCurveTo(
        cx1 + imgOfLf,
        cy1 + imgOfTp,
        cx2 + imgOfLf, cy2 + imgOfTp,
        x2 + imgOfLf, y2 + imgOfTp
    );
    ctx.stroke();
}

function drawCircle(context, x, y) {
    context.beginPath();
    const imageOffset = $("#image").offset();
    const imgOfLf = imageOffset.left;
    const imgOfTp = 10;//imageOffset.top;
    context.moveTo(x + imgOfLf, y + imgOfTp);
    context.arc(x + imgOfLf, y + imgOfTp, pointRadius, 0, 2 * Math.PI);
    context.fillStyle = '#184bed';
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = '#184bed';
    context.stroke();
}

function drawPointCircle(curveName) {
    curveName = curveName.replace(" ", "-").toLowerCase();
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

function draw_all_curves() {
    const canvas = document.getElementById('bezier');
    let context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    let w = canvas.width;
    canvas.width = 1;
    canvas.width = w;
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
        currentCurve = currentCurve.replace(" ", "-").toLowerCase();
        draw_all_curves();
        if (all_curves[currentCurve] != null) {
            curveBox = getBoxDimensions(currentCurve, null, recalculate);
            let context = document.getElementById('bezier').getContext('2d');
            context.beginPath();
            const imgOfLf = $("#image").offset().left;
            const imgOfTp = 10;//imageOffset.top;
            context.rect(curveBox[0] + imgOfLf, curveBox[1] + imgOfTp, curveBox[2], curveBox[3]);
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
    curveName = curveName.replace(" ", "-").toLowerCase();
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
    curveName = curveName.replace(" ", "-").toLowerCase();
    runPointsAndChange(curveName, function (pointX, pointY) {
        return (pointX * Math.cos(angle)) - (pointY * Math.sin(angle));
    }, function (pointY, pointX) {
        return (pointX * Math.sin(angle)) + (pointY * Math.cos(angle));
    }, true);
}

function rescaleBezier(curveName, scaleX, scaleY) {
    curveName = curveName.replace(" ", "-").toLowerCase();
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
    const canvas = document.getElementById('bezier');
    let context = canvas.getContext('2d');
    context.translate(canvas.width / 2, canvas.height / 2);
    if (isMouseDown && isCurveFunction) { /* do drag things */
        const selectedIndex = document.getElementById("curvesId").selectedIndex;
        const curveName = document.getElementById("curvesId").options[selectedIndex].text;
        if (mousePosition.x == null) {
            mousePosition.x = event.clientX;
            mousePosition.y = event.clientY;
        } else {
            const curvesJson = toJson(all_curves);
            let hiddenForm = document.getElementById("bezier_curves");
            hiddenForm.setAttribute("value", curvesJson);
            if (isOnBoxVertex) {
                /*still need to fix problem when rescale with top points*/
                let scaleX = event.clientX / mousePosition.x;
                let scaleY = event.clientY / mousePosition.y;
                rescaleBezier(curveName, scaleX, scaleY);
            } else if (isOnCurvePoints != null) {
                isOnCurvePoints[0][isOnCurvePoints[1]] -= mousePosition.x - event.clientX;
                isOnCurvePoints[0][isOnCurvePoints[2]] -= mousePosition.y - event.clientY;
                bezier_curve(curveName, true);
            } else if (isInsideBox) {
                translateBezier(curveName, mousePosition.x - event.clientX, mousePosition.y - event.clientY);
            } else {
                // noinspection JSSuspiciousNameCombination
                let productModule = {
                    first: Math.sqrt(Math.pow(event.clientX, 2) + Math.pow(event.clientY, 2)),
                    second: Math.sqrt(Math.pow(mousePosition.x, 2) + Math.pow(mousePosition.y, 2))
                };
                let scaleProduct = Math.abs((event.clientX * mousePosition.x) + (event.clientY * mousePosition.y));
                let angle = Math.acos(scaleProduct / (productModule.first * productModule.second));
                if (!isNaN(angle)) {
                    angle *= highLowAngle(mousePosition, {x: event.clientX, y: event.clientY});
                    rotateBezier(curveName, angle);
                }
            }
            mousePosition.x = event.clientX;
            mousePosition.y = event.clientY;
            drawPointCircle(curveName);
        }
    }
}

function verifyMouseOnBoxVertex(relativeMouse, curveName) {
    let boxVertex = getBoxDimensions(curveName, null, true);
    const canvas = document.getElementById("bezier");
    const context = canvas.getContext("2d");
    const imgOfLf = $("#image").offset().left;
    const imgOfTp = 10;//imageOffset.top;
    let isOn = false;
    [
        [boxVertex[0], boxVertex[1]],
        [boxVertex[0], boxVertex[1] + boxVertex[3]],
        [boxVertex[0] + boxVertex[2], boxVertex[1]],
        [boxVertex[0] + boxVertex[2], boxVertex[1] + boxVertex[3]]
    ].forEach(function (element, index, array) {
        drawCircle(context, element[0], element[1]);
        if (relativeMouse.x >= element[0] - pointRadius + imgOfLf && relativeMouse.x <= element[0] + pointRadius + imgOfLf
            && relativeMouse.y >= element[1] - pointRadius + imgOfTp && relativeMouse.y <= element[1] + pointRadius + imgOfTp) {
            isOn = true;
        }
    });
    return isOn;
}

function verifyMouseOnCurvePoint(relativeMouse, curveName) {
    const imgOfLf = $("#image").offset().left;
    const imgOfTp = 10;//imageOffset.top;
    let isOn = null;
    all_curves[curveName].forEach(function (element, index, array) {
        element.forEach(function (point, position, arr) {
            if (position % 2 === 0) {
                if (relativeMouse.x >= element[position] - pointRadius + imgOfLf && relativeMouse.x <= element[position] + pointRadius + imgOfLf
                    && relativeMouse.y >= element[position + 1] - pointRadius + imgOfTp && relativeMouse.y <= element[position + 1] + pointRadius + imgOfTp) {
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
    const curveName = currentCurve.replace(" ", "-").toLowerCase();
    if (currentCurve === "Selecione") {
        isCurveFunction = false;
        coordinates(event);
    } else if (all_curves[curveName] != null) {
        isCurveFunction = true;
        let points = getBoxDimensions(curveName);
        const imgOfLf = $("#image").offset().left;
        const imgOfTp = 10;//imageOffset.top;
        const relativeMouse = getMousePos(document.getElementById('bezier'), event);
        isInsideBox = relativeMouse.x >= points[0] + imgOfLf && relativeMouse.x <= points[0] + points[2] + imgOfLf
            && relativeMouse.y >= points[1] + imgOfTp && relativeMouse.y <= points[1] + points[3] + imgOfTp;
        isOnBoxVertex = verifyMouseOnBoxVertex(relativeMouse, curveName);
        isOnCurvePoints = verifyMouseOnCurvePoint(relativeMouse, curveName);
    }
}

let elements = document.getElementsByTagName('input');
for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener("input", onChangeValue);
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

loadJsonCurve();
