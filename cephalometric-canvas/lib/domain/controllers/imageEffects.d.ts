import { IEffectValues } from '../util/interfaces/interfaces';
import { ICanvasDraw } from '../util/interfaces/views/canvasDraw';
export declare const defaultValues: IEffectValues;
declare class ImageEffects {
    brightness: number;
    contrast: number;
    grayscale: number;
    invert: number;
    canvasManager: ICanvasDraw;
    /**
     *
     * @param {ICanvasDraw} canvas
     */
    constructor(canvas: ICanvasDraw);
    static get defaultValues(): IEffectValues;
    /**
     * Returns css style values
     * @returns {string}
     */
    getValues(): string;
    /**
     * Event function that apply read and apply effects on image
     */
    updateFilterValues(): void;
    /**
     * Reset all effects
     */
    reset(): void;
}
export default ImageEffects;
