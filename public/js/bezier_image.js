function bezier_curve(event, selected) {
    const div = document.getElementById('image');
    var figures = document.getElementById('bezier_curves') || document.createElement("figures");
    figures.setAttribute('id', 'bezier_curves');
    var bezier_script = document.createElement('script');
    bezier_script.setAttribute('type', 'text/beziercode');
    bezier_script.innerHTML = `
    new Bezier(150,40 , 80,30 , 105,150);
            var draw = function() {
            drawSkeleton(curve);
            drawCurve(curve);
        }
    `;
    var bezier_figure = document.createElement("figure");
    bezier_figure.setAttribute('class', 'quadratic');
    bezier_figure.appendChild(bezier_script);

    figures.appendChild(bezier_figure);
    div.appendChild(figures);
    loadAll();
}
