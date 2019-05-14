function calculateSela(offset){
    let curvePoits = all_curves["sela-túrcica"];
    let x = 0; let y = 0; let count = 0;
    curvePoits.forEach(function (element, index, array) {
        element.forEach(function (point, position, arr) {
            if (position % 2 !== 0) {
                x += point;
                count += 1;
            } else {
                y += point;
            }
        });
    });
    x = x / count; y = y / count;
    global_points["Sela (S)"].X = x + offset.left * 2;
    global_points["Sela (S)"].Y = y + offset.top * 2;
    console.log(global_points["Sela (S)"], offset);
}

function calculateNasio(offset){
    let curvePoits = all_curves["sutura-fronto-nasal"];
    let x = curvePoits[0][0];
    let y = curvePoits[0][1];
    global_points["Násio (N)"].X = x + offset.left * 2;
    global_points["Násio (N)"].Y = y + offset.top * 2;
    console.log(global_points["Násio (N)"], offset);
}

function calculateLandmarks(){
    const div = document.getElementById('pointsId');
    for(let count = 0; count < div.options.length; count += 1){
        if(!global_points[div.options[count].text]){
            global_points[div.options[count].text] = [];
            global_points[div.options[count].text].X = 0;
            global_points[div.options[count].text].Y = 0;
        }
    }
    const canvas = document.getElementById('landmarks');
    const offsets = {
        left: $("#image").offset().left,
        top: $("#image").offset().top
    };
    calculateSela(offsets);
    calculateNasio(offsets);
    redrawLandmark(canvas);
}
