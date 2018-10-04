function coordenadas(event) {
	var selectedIndex = document.getElementById("pointsId").selectedIndex;
	var currentPoint = document.getElementById("pointsId").options[selectedIndex].text;
	if (currentPoint !== "Selecione") {
		x = event.pageX;
		y = event.pageY;

		var div = document.getElementById('image');
		if (!global_points[currentPoint]) {
			global_points[currentPoint] = [];
		}
		global_points[currentPoint].X = x;
		global_points[currentPoint].Y = y;

		if (global_points[currentPoint].htmlPoint) {
			global_points[currentPoint].htmlPoint.outerHTML = '';
			//erase the point
			global_points[currentPoint].htmlPoint = null;
		}
		var pto = document.querySelector('#image .ponto');
		var ponto = document.createElement("span");
		global_points[currentPoint].htmlPoint = ponto;

		ponto.setAttribute("class", "ponto");
		var imgOfLf = $("#image").offset().left;
		var imgOfTp = $("#image").offset().top;
		ponto.style.cssText = "top: " + Math.floor(parseInt(y) - imgOfTp - 2.5) + "px; left: " + Math.floor(parseInt(x) - imgOfLf - 2.5) + "px;";
		div.appendChild(ponto); // crio o ponto

		 //cria a legenda e posiciona
		var sigla = $("#pointsId option:selected").text().match(/\(\w+\)/)[0];
		var legs = $("span[id^='legenda_']");
		legs.each(function(){
			if($(this).text() == sigla) $(this).remove();
		});
		$("#image").append('<span id="legenda_'+legenda_id+'" class="legendas">'+sigla+'</span>');
		var legenda_width = $("#legenda_"+legenda_id).width()/2;
		$("#legenda_"+legenda_id).css({
			"top": Math.floor(parseInt(y) - imgOfTp + 5)+"px",
			"left": Math.floor(parseInt(x) - imgOfLf - legenda_width - 2.5)+"px"
		});
		var subtitle = document.createElement("span");
		subtitle.setAttribute("id", "legenda_" + legenda_id);
		subtitle.setAttribute("class", "legendas");
		subtitle.innerHTML = sigla;
		//div.append(subtitle);
		legenda_id++;
		$("span.ponto").each(function(i,e){
			if(e.nextSibling && e.nextSibling.className != "legendas") e.outerHTML = '';
		});

		var data_json = toJSON(global_points);
		var hiddenForm = document.getElementById("saved_points");
		hiddenForm.setAttribute("value", data_json);

		hiddenForm = document.getElementById("current_image");
		var imageSource = document.getElementById("logo").getAttribute("src");
		var splitedSource = imageSource.split("/");
		imageSource = "";
		for (var i = splitedSource.length - 2; i < splitedSource.length; i += 1) {
			imageSource = imageSource + splitedSource[i];
			if (i !== splitedSource.length - 1) {
				imageSource = imageSource + "/";
			}
		}
		hiddenForm.setAttribute("value", imageSource);
	}
}

var legenda_id = 0;

function openWindow() {
	window.open("../views/service_pages/doctor/Window.php", "_blank", "width=600, height=400");
}

function openWindowSave(){
	window.open("../views/service_pages/doctor/WindowSave.php", "_blank", "width=600, height=400");
}

function desfazer() {
	global_points.htmlPoint.outerHTML = ''; /*erase the point*/
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

function image(imagem) {
	global_points = new Array();
	global_effects = new Array();

	img = new Image();
	img.src = imagem;
	document.getElementById('image').innerHTML = "<img style=\" cursor:crosshair\" id='logo' href=\"#\" onmousedown= \"coordenadas(event)\" src=\"" +	   img.src + "\" width= 1050 />";
	reset();
}

var elements = document.getElementsByTagName('input');
for (var i = 0; i < elements.length; i++) {
	elements[i].addEventListener("input", onChangeValue);
}