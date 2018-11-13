function bezier_curve(event, selected) {
    const div = document.getElementById('image');
    var figures = document.createElement();
    figures.text = `
<figures>
    <figure class="quadratic"><script type="text/beziercode">
        new Bezier(150,40 , 80,30 , 105,150);
    var draw = function() {
            drawSkeleton(curve);
            drawCurve(curve);
        }
        </script></figure>

    <figure class="cubic">
        <script type="text/beziercode">
        new Bezier(100,25 , 10,90 , 110,100 , 150,115);
    var draw = function() {
            drawSkeleton(curve);
            drawCurve(curve);
        }
        </script></figure>
    </figures>`
}
