class FacialAnalysis {
    constructor() {}

    /**
     * Facial analysis
     */
    start() {
        if (enable_draw_bezier) {
            const glabela = {
                x: all_curves["perfil-mole"][0][0],
                y: all_curves["perfil-mole"][0][1]
            };
            const subnasal = {
                x: all_curves["perfil-mole"][1][4],
                y: all_curves["perfil-mole"][1][5]
            };
            const pogonion = {
                x: all_curves["perfil-mole"][5][4],
                y: all_curves["perfil-mole"][5][5]
            };
            const div = document.getElementById("bezier");
            let ctx = div.getContext("2d");
            ctx.strokeStyle = "#451c87";
            ctx.beginPath();
            ctx.moveTo(pogonion.x, pogonion.y);
            ctx.lineTo(subnasal.x, subnasal.y);
            ctx.lineTo(glabela.x, glabela.y);
            ctx.lineWidth = lineWidth * 2;
            ctx.stroke();
            let toCalculate = normalizeValues(glabela, pogonion, subnasal);
            let angle =
                calculateAngle(toCalculate[0], toCalculate[1]) *
                (subnasal.x > pogonion.x ? -1 : 1);
            angle = (180 * angle) / Math.PI;
            let td = document.getElementById("td-face_type");
            if (angle + 5 >= 0 && angle + 5 <= 10) {
                td.innerHTML = "Reto";
            } else if (angle < 0) {
                td.innerHTML = "Concavo";
            } else {
                td.innerHTML = "Convexo";
            }
        }
    }
}
