function calculateSela(){
    let curvePoits = all_curves["sela-túrcica"]
    curvePoits.forEach(function (element, index, array) {
        element.forEach(function (point, position, arr) {
            if (position % 2 !== 0) {
                drawCircle(context, element[position - 1], element[position]);
            }
        });
    });
}

function calculateLandmarks(){

}
