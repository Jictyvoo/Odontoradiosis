import { IPointBidimensional } from './interfaces/interfaces';
import * as i0 from "@angular/core";
declare class ScaleManager {
    pointRadius: number;
    lineWidth: number;
    nameScale: number;
    textRelativePosition: {
        x: number;
        y: number;
    };
    scaleDrawValue: {
        pointRadius: number;
        nameScale: number;
        lineWidth: number;
        textRelativePosition: {
            x: number;
            y: number;
        };
    };
    constructor();
    /**
     * Calculate the scale to make canvas dynamic and returns it
     * @param {number} valueToResize
     * @param {boolean} isX
     * @param {CanvasRenderingContext2D} clientRect
     * @param {ClientRect} clientRect
     */
    dynamicCanvasScale(valueToResize: number | undefined, isX: boolean | undefined, context: CanvasRenderingContext2D, clientRect: ClientRect): number;
    /**
     * Calculates all scales variables
     * @param {HTMLCanvasElement} canvas
     */
    calculateScales(canvas: HTMLCanvasElement): void;
    /**
     * Returns an object containing the relative mouse position in Canvas
     * @param {HTMLElement} canvas
     * @param {Event} point
     */
    getMousePos(canvas: HTMLCanvasElement, point: IPointBidimensional): {
        x: number;
        y: number;
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<ScaleManager, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ScaleManager>;
}
export default ScaleManager;
