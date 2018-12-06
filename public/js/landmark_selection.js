image_url = "";
global_points = null;
global_effects = null;
let all_curves = null;
let curveBox = null;
let boxPoints = null;
let isInsideBox = false;
let mousePosition = [x = null, y = null];

let isCurveFunction = false;
let isMouseDown = false;
document.onmousedown = function () {
    isMouseDown = true;
};
document.onmouseup = function () {
    isMouseDown = false;
    isInsideBox = false;

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

function image(path) {
    global_points = [];
    global_effects = [];
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

        const data_json = toJSON(global_points);
        let hiddenForm = document.getElementById("saved_points");
        hiddenForm.setAttribute("value", data_json);

        hiddenForm = document.getElementById("current_image");
        let imageSource = image_url;
        const splicedSource = imageSource.split("/");
        imageSource = splicedSource[splicedSource.length - 1].charAt(0);
        hiddenForm.setAttribute("value", imageSource);
    }
}

function desfazer() {
    global_points.htmlPoint.outerHTML = '';
    /*erase the point*/
    /* will use global_effects array */
}

function toJSON(js_array) {
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
    return [minX - borderSize, minY - borderSize, width + borderSize, height + borderSize];
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

function bezier_curve(currentCurve) {
    if (currentCurve != null) {
        currentCurve = currentCurve.replace(" ", "-").toLowerCase();
        draw_all_curves();
        if (all_curves[currentCurve] != null) {
            curveBox = getBoxDimensions(currentCurve);
            let context = document.getElementById('bezier').getContext('2d');
            const imgOfLf = $("#image").offset().left;
            const imgOfTp = 10;//imageOffset.top;
            context.rect(curveBox[0] + imgOfLf, curveBox[1] + imgOfTp, curveBox[2], curveBox[3]);
            context.stroke();
        }
    }
}

function runPointsAndChange(curveName, callback_1, callback_2) {
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
        bezier_curve(curveName);
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
    });
}

function rotateBezier(curveName, angle) {
    curveName = curveName.replace(" ", "-").toLowerCase();
    const boxDimensions = getBoxDimensions(curveName, null, true);
    const imgOfLf = $("#image").offset().left;
    const imgOfTp = 10;//imageOffset.top;
    let origin = {
        x: (boxDimensions[0] + boxDimensions[2]) / 2,
        y: (boxDimensions[1] + boxDimensions[3]) / 2
    };
    console.log(all_curves[curveName]);
    runPointsAndChange(curveName, function (pointX, pointY) {
        return origin.x + imgOfLf + (pointX * Math.cos(angle)) - (pointY * Math.sin(angle));
    }, function (pointY, pointX) {
        return origin.y + imgOfTp + (pointX * Math.sin(angle)) + (pointY * Math.cos(angle));
    });
    console.log(all_curves[curveName]);
}

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
            if (isInsideBox) {
                translateBezier(curveName, mousePosition.x - event.clientX, mousePosition.y - event.clientY);
            } else {
                // noinspection JSSuspiciousNameCombination
                let productModule = {
                    first: Math.sqrt(Math.pow(event.clientX, 2) + Math.pow(event.clientY, 2)),
                    second: Math.sqrt(Math.pow(mousePosition.x, 2) + Math.pow(mousePosition.y, 2))
                };
                let scaleProduct = Math.abs((event.clientX * mousePosition.x) + (event.clientY * mousePosition.y));
                let angle = Math.acos(scaleProduct / (productModule.first * productModule.second));
                console.log(angle);
                rotateBezier(curveName, Math.PI);
            }
            mousePosition.x = event.clientX;
            mousePosition.y = event.clientY;
        }
    }
}

function bezier_coordinate(event) {
    const selectedIndex = document.getElementById("curvesId").selectedIndex;
    const currentCurve = document.getElementById("curvesId").options[selectedIndex].text;
    if (currentCurve === "Selecione") {
        isCurveFunction = false;
        coordinates(event);
    } else if (all_curves[currentCurve.replace(" ", "-").toLowerCase()] != null) {
        isCurveFunction = true;
        let points = getBoxDimensions(currentCurve.replace(" ", "-").toLowerCase());
        const imgOfLf = $("#image").offset().left;
        const imgOfTp = 10;//imageOffset.top;
        const relativeMouse = getMousePos(document.getElementById('bezier'), event);
        isInsideBox = relativeMouse.x >= points[0] + imgOfLf && relativeMouse.x <= points[0] + points[2] + imgOfLf
            && relativeMouse.y >= points[1] + imgOfTp && relativeMouse.y <= points[1] + points[3] + imgOfTp;
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
    if (currentCurve !== "Selecione") {
        document.getElementById('stack-canvas').style.cursor = "move";
    } else {
        document.getElementById('stack-canvas').style.cursor = "crosshair";
    }
});

$.getJSON(curves_url, function (data) {
    all_curves = data;
});
