image_url = "";
global_points = null;
global_effects = null;

function openImage(path, loadFunction) {
    img = new Image();
    image_url = path;
    let ctx = document.getElementById('image');
    ctx.setAttribute("onmousedown", "bezier_coordinate(event)");
    if (ctx.getContext) {
        ctx = ctx.getContext('2d');
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = 785;
        img.onload = function () {
            ctx.drawImage(img, 0, 0, 1050, 785);    //draw background image
            ctx.fillStyle = "rgba(1, 1, 1, 0)"; //draw a box over the top
            if (loadFunction) {
                loadFunction();
            }
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

function removeLandmark(canvas) {
    let context = canvas.getContext('2d');
    //context.clearRect(0, 0, canvas.width, canvas.height);
    openImage(image_url, function () {
        Object.keys(global_points).forEach(function (element, index, array) {
            drawLandmark(canvas, element);
        });
    });
}

function coordenadas(event) {
    const selectedIndex = document.getElementById("pointsId").selectedIndex;
    const currentPoint = document.getElementById("pointsId").options[selectedIndex].text;
    if (currentPoint !== "Selecione") {
        x = event.pageX;
        y = event.pageY;

        const div = document.getElementById('image');
        if (!global_points[currentPoint]) {
            global_points[currentPoint] = [];
        }

        global_points[currentPoint].X = x;
        global_points[currentPoint].Y = y;

        removeLandmark(div, currentPoint);
        //drawLandmark(div, global_points[currentPoint]);

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
    var returned_json = "{";
    for (var key in js_array) {
        if (returned_json.length > 1) {
            returned_json = returned_json + ",";
        }
        returned_json = returned_json + "\"" + key + "\":{";
        var internalArray = js_array[key];
        returned_json = returned_json + "\"X\":" + internalArray.X + ",\"Y\":" + internalArray.Y + "}";
    }
    returned_json = returned_json + "}";
    return returned_json;
}

var brightness = document.getElementById('brightness'),
    contrast = document.getElementById('contrast'),
    grayscale = document.getElementById('grayscale'),
    invert = document.getElementById('invert');

function getValues() {
    var filterStyle = "filter: ",
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
    var imageDiv = document.getElementById('image');
    var filterValue = getValues();
    imageDiv.setAttribute("style", filterValue);
}

function reset() {
    brightness.value = 100;
    contrast.value = 100;
    grayscale.value = 0;
    invert.value = 0;
    onChangeValue();
}

function bezier_coordinate(event) {
    const selectedIndex = document.getElementById("curvesId").selectedIndex;
    const currentCurve = document.getElementById("curvesId").options[selectedIndex].text;
    if (currentCurve === "Selecione") {
        coordenadas(event);
    } else {
        bezier_curve(event, currentCurve);
    }
}

var elements = document.getElementsByTagName('input');
for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener("input", onChangeValue);
}