function calculateSela(offset){
    let curvePoits = all_curves["sela-túrcica"];
    let x = (curvePoits[0][6] + curvePoits[1][0] + curvePoits[1][2] + curvePoits[1][4]) / 4;
    let y = (curvePoits[0][7] + curvePoits[1][1] + curvePoits[1][3] + curvePoits[1][5]) / 4;
    global_points["Sela (S)"].X = x + offset.left * 2;
    global_points["Sela (S)"].Y = y + offset.top * 2;
}

function calculateNasio(offset){
    let curvePoits = all_curves["sutura-fronto-nasal"];
    let x = curvePoits[0][0];
    let y = curvePoits[0][1];
    global_points["Násio (N)"].X = x + offset.left * 2;
    global_points["Násio (N)"].Y = y + offset.top * 2;
    console.log(global_points["Násio (N)"], offset);
}

function calculateENA(offset){
    let curvePoits = all_curves["maxila"];
    let x = curvePoits[1][4];
    let y = curvePoits[1][5];
    global_points["Espinha nasal anterior (ENA)"].X = x + offset.left * 2;
    global_points["Espinha nasal anterior (ENA)"].Y = y + offset.top * 2;
    console.log(global_points["Espinha nasal anterior (ENA)"], offset);
}

function calculateA(offset){
    let curvePoits = all_curves["maxila"];
    let x = curvePoits[2][0];
    let y = curvePoits[2][1];
    global_points["Ponto subespinhal (A)"].X = x + offset.left * 2;
    global_points["Ponto subespinhal (A)"].Y = y + offset.top * 2;
    console.log(global_points["Ponto subespinhal (A)"], offset);
}

function calculateGnatio(offset){
    let curvePoits = all_curves["mandíbula"];
    let x = curvePoits[3][4];
    let y = curvePoits[3][5];
    global_points["Gnátio (Gn)"].X = x + offset.left * 2;
    global_points["Gnátio (Gn)"].Y = y + offset.top * 2;
    console.log(global_points["Gnátio (Gn)"], offset);
}

function calculatePalatoMole(offset){
    let curvePoits = all_curves["mandíbula"];
    let curvePoits2 = all_curves["perfil-mole"];
    let x1 = curvePoits2[5][4];
    let y1 = curvePoits2[5][5];
    let x2 = curvePoits[4][4];
    let y2 = curvePoits[4][5];
    let x = (x1+x2)/2;
    let y = (y1+y2)/2;
    global_points["Palato Mole (pm)"].X = x + offset.left * 2;
    global_points["Palato Mole (pm)"].Y = y + offset.top * 2;
    console.log(global_points["Palato Mole (pm)"], offset);
}

function calculateB(offset){
    let curvePoits = all_curves["mandíbula"];
    let curvePoits2 = all_curves["perfil-mole"];
    let x1 = curvePoits2[5][2];
    let y1 = curvePoits2[5][3];
    let x2 = curvePoits[4][4];
    let y2 = curvePoits[4][5];
    let x = (x1+x2)/2;
    let y = (y1+y2)/2;
    global_points["Ponto pupramental (B)"].X = x + offset.left * 2;
    global_points["Ponto pupramental (B)"].Y = y + offset.top * 2;
    console.log(global_points["Ponto pupramental (B)"], offset);
}

function calculateProNasal(offset){
    let curvePoits = all_curves["perfil-mole"];
    let x = curvePoits[0][6];
    let y = curvePoits[0][7];
    global_points["Pró-nasal (Pn)"].X = x + offset.left * 2;
    global_points["Pró-nasal (Pn)"].Y = y + offset.top * 2;
    console.log(global_points["Pró-nasal (Pn)"], offset);
}

function calculatePogonioMole(offset){
    let curvePoits = all_curves["perfil-mole"];
    let x = curvePoits[5][4];
    let y = curvePoits[5][5];
    global_points["Pogônio Mole (Pg’)"].X = x + offset.left * 2;
    global_points["Pogônio Mole (Pg’)"].Y = y + offset.top * 2;
    console.log(global_points["Pogônio Mole (Pg’)"], offset);
}

function calculateENP(offset){
    let curvePoits = all_curves["maxila"];
    let x = curvePoits[0][6];
    let y = curvePoits[0][7];
    global_points["Espinha nasal posterior (ENP)"].X = x + offset.left * 2;
    global_points["Espinha nasal posterior (ENP)"].Y = y + offset.top * 2;
    console.log(global_points["Espinha nasal posterior (ENP)"], offset);
}

function calculateCondilio(offset){
    let curvePoits = all_curves["mandíbula"];
    let x = curvePoits[2][4];
    let y = curvePoits[2][5];
    global_points["Condílio (Co)"].X = x + offset.left * 2;
    global_points["Condílio (Co)"].Y = y + offset.top * 2;
    console.log(global_points["Condílio (Co)"], offset);
}

function calculatePogonio(offset){
    let curvePoits = all_curves["perfil-mole"];
    let curvePoits2 = all_curves["mandíbula"];
    let x1 = curvePoits[5][4];
    let y1 = curvePoits[5][5];
    let x2 = curvePoits2[3][4];
    let y2 = curvePoits2[3][5];
    let x3 = (x1+x2)/2;
    let y3 = (y1+y2)/2;

    let x4 = curvePoits[5][4];
    let y4 = curvePoits[5][5];
    let x5 = curvePoits2[4][4];
    let y5 = curvePoits2[4][5];
    let x6 = (x4+x5)/2;
    let y6 = (y4+y5)/2;

    let x = (x2+x3+x6)/3;
    let y = (y2+y3+y6)/3;    

    global_points["Pogônio (Pog)"].X = x + offset.left * 2;
    global_points["Pogônio (Pog)"].Y = y + offset.top * 2;
    console.log(global_points["Pogônio (Pog)"], offset);
}

function calculateMento(offset){
    let curvePoits = all_curves["mandíbula"];
    let x1 = curvePoits[3][4];
    let y1 = curvePoits[3][5];
    let x2 = curvePoits[4][0];
    let y2 = curvePoits[4][1];
    let x3 = (x1+x2)/2;
    let y3 = (y1+y2)/2;
    let x = (x1+x3)/2;
    let y = (y1+y3)/2;
    global_points["Mento (Me)"].X = x + offset.left * 2;
    global_points["Mento (Me)"].Y = y + offset.top * 2;
    console.log(global_points["Mento (Me)"], offset);
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
}
