function calculateSela(offset) {
    let curvePoints = all_curves["sela-túrcica"];
    let x = (curvePoints[0][6] + curvePoints[1][0] + curvePoints[1][2] + curvePoints[1][4]) / 4;
    let y = (curvePoints[0][7] + curvePoints[1][1] + curvePoints[1][3] + curvePoints[1][5]) / 4;
    global_points["Sela (S)"].X = x;
    global_points["Sela (S)"].Y = y;
}

function calculateNasio(offset) {
    let curvePoints = all_curves["sutura-fronto-nasal"];
    let x = curvePoints[0][0];
    let y = curvePoints[0][1];
    global_points["Násio (N)"].X = x;
    global_points["Násio (N)"].Y = y;
}

function calculateENA(offset) {
    let curvePoints = all_curves["maxila"];
    let x = curvePoints[1][4];
    let y = curvePoints[1][5];
    global_points["Espinha nasal anterior (ENA)"].X = x;
    global_points["Espinha nasal anterior (ENA)"].Y = y;
}

function calculateA(offset) {
    let curvePoints = all_curves["maxila"];
    let x = curvePoints[2][0];
    let y = curvePoints[2][1];
    global_points["Ponto subespinhal (A)"].X = x;
    global_points["Ponto subespinhal (A)"].Y = y;
}

function calculateGnatio(offset) {
    let curvePoints = all_curves["mandíbula"];
    let x = curvePoints[3][4];
    let y = curvePoints[3][5];
    global_points["Gnátio (Gn)"].X = x;
    global_points["Gnátio (Gn)"].Y = y;
}

function calculatePalatoMole(offset) {
    let curvePoints_1 = all_curves["mandíbula"];
    let curvePoints_2 = all_curves["perfil-mole"];
    let x1 = curvePoints_2[5][4];
    let y1 = curvePoints_2[5][5];
    let x2 = curvePoints_1[4][4];
    let y2 = curvePoints_1[4][5];
    let x = (x1 + x2) / 2;
    let y = (y1 + y2) / 2;
    global_points["Palato Mole (pm)"].X = x;
    global_points["Palato Mole (pm)"].Y = y;
}

function calculateB(offset) {
    let curvePoints_1 = all_curves["mandíbula"];
    let curvePoints_2 = all_curves["perfil-mole"];
    let x1 = curvePoints_2[5][2];
    let y1 = curvePoints_2[5][3];
    let x2 = curvePoints_1[4][4];
    let y2 = curvePoints_1[4][5];
    let x = (x1 + x2) / 2;
    let y = (y1 + y2) / 2;
    global_points["Ponto pupramental (B)"].X = x;
    global_points["Ponto pupramental (B)"].Y = y;
}

function calculateProNasal(offset) {
    let curvePoints = all_curves["perfil-mole"];
    let x = curvePoints[0][6];
    let y = curvePoints[0][7];
    global_points["Pró-nasal (Pn)"].X = x;
    global_points["Pró-nasal (Pn)"].Y = y;
}

function calculatePogonioMole(offset) {
    let curvePoints = all_curves["perfil-mole"];
    let x = curvePoints[5][4];
    let y = curvePoints[5][5];
    global_points["Pogônio Mole (Pg)"].X = x;
    global_points["Pogônio Mole (Pg)"].Y = y;
}

function calculateENP(offset) {
    let curvePoints = all_curves["maxila"];
    let x = curvePoints[0][6];
    let y = curvePoints[0][7];
    global_points["Espinha nasal posterior (ENP)"].X = x;
    global_points["Espinha nasal posterior (ENP)"].Y = y;
}

function calculateCondilio(offset) {
    let curvePoints = all_curves["mandíbula"];
    let x = curvePoints[2][4];
    let y = curvePoints[2][5];
    global_points["Condílio (Co)"].X = x;
    global_points["Condílio (Co)"].Y = y;
}

function calculatePogonio(offset) {
    let curvePoints_1 = all_curves["perfil-mole"];
    let curvePoints_2 = all_curves["mandíbula"];
    let x1 = curvePoints_1[5][4];
    let y1 = curvePoints_1[5][5];
    let x2 = curvePoints_2[3][4];
    let y2 = curvePoints_2[3][5];
    let x3 = (x1 + x2) / 2;
    let y3 = (y1 + y2) / 2;

    let x4 = curvePoints_1[5][4];
    let y4 = curvePoints_1[5][5];
    let x5 = curvePoints_2[4][4];
    let y5 = curvePoints_2[4][5];
    let x6 = (x4 + x5) / 2;
    let y6 = (y4 + y5) / 2;

    let x = (x2 + x3 + x6) / 3;
    let y = (y2 + y3 + y6) / 3;

    global_points["Pogônio (Pog)"].X = x;
    global_points["Pogônio (Pog)"].Y = y;
}

function calculateMento(offset) {
    let curvePoints = all_curves["mandíbula"];
    let x1 = curvePoints[3][4];
    let y1 = curvePoints[3][5];
    let x2 = curvePoints[4][0];
    let y2 = curvePoints[4][1];
    let x3 = (x1 + x2) / 2;
    let y3 = (y1 + y2) / 2;
    let x = (x1 + x3) / 2;
    let y = (y1 + y3) / 2;
    global_points["Mento (Me)"].X = x;
    global_points["Mento (Me)"].Y = y;
}

function calculateLandmarks() {
    const div = document.getElementById('pointsId');
    for (let count = 0; count < div.options.length; count += 1) {
        let landmarkName = div.options[count].text;
        if (!global_points[landmarkName] && landmarkName !== "Selecione") {
            global_points[landmarkName] = [];
            global_points[landmarkName].X = 0;
            global_points[landmarkName].Y = 0;
        }
    }
    const canvas = document.getElementById('landmarks');
    const offsets = {
        left: $("#image").offset().left,
        top: $("#image").offset().top
    };
    calculateSela(offsets);
    calculateNasio(offsets);
    calculateENA(offsets);
    calculateA(offsets);
    calculateGnatio(offsets);
    calculatePalatoMole(offsets);
    calculateB(offsets);
    calculateProNasal(offsets);
    calculatePogonioMole(offsets);
    calculateENP(offsets);
    calculateCondilio(offsets);
    calculatePogonio(offsets);
    calculateMento(offsets);
    redrawLandmark(canvas);

    saveLandmarks(global_points);
}
