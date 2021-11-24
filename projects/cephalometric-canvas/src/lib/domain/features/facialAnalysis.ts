import { ICanvasLayers } from '../util/interfaces/canvasManipulation';
import { IBezierCurves } from '../util/interfaces/curveManipulation';
import ScaleManager from '../util/scaleManager';
import UsefulMethods from '../util/usefulMethods';

class FacialAnalysis {
    private allCurves: IBezierCurves;
    public scaleManager: ScaleManager;
    constructor(allCurves: IBezierCurves, scaleManager: ScaleManager) {
        this.allCurves = allCurves;
        this.scaleManager = scaleManager;
    }

    /**
     * Facial analysis
     */
    start(enable_draw_bezier: boolean): void {
        if (enable_draw_bezier) {
            const glabela = {
                x: this.allCurves['perfil-mole'][0][0],
                y: this.allCurves['perfil-mole'][0][1],
            };
            const subnasal = {
                x: this.allCurves['perfil-mole'][1][4],
                y: this.allCurves['perfil-mole'][1][5],
            };
            const pogonion = {
                x: this.allCurves['perfil-mole'][5][4],
                y: this.allCurves['perfil-mole'][5][5],
            };
            const div = document.getElementById(
                ICanvasLayers.ANATOMICAL_TRACING
            ) as HTMLCanvasElement;
            const ctx = div.getContext('2d') as CanvasRenderingContext2D;
            ctx.strokeStyle = '#451c87';
            ctx.beginPath();
            ctx.moveTo(pogonion.x, pogonion.y);
            ctx.lineTo(subnasal.x, subnasal.y);
            ctx.lineTo(glabela.x, glabela.y);
            ctx.lineWidth = this.scaleManager.lineWidth * 2;
            ctx.stroke();
            const toCalculate = UsefulMethods.normalizeValues(
                glabela,
                pogonion,
                subnasal
            );
            let angle =
                UsefulMethods.calculateAngle(toCalculate[0], toCalculate[1]) *
                (subnasal.x > pogonion.x ? -1 : 1);
            angle = (180 * angle) / Math.PI;
            const td = document.getElementById('td-face_type') as HTMLElement;
            if (angle + 5 >= 0 && angle + 5 <= 10) {
                td.innerHTML = 'Reto';
            } else if (angle < 0) {
                td.innerHTML = 'Concavo';
            } else {
                td.innerHTML = 'Convexo';
            }
        }
    }
}

export default FacialAnalysis;
