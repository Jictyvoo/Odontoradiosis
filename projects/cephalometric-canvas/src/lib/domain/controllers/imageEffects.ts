import { ICanvasDraw } from '../util/interfaces/views/canvasDraw';

const defaultValues = Object.freeze({
    brightness: 100,
    contrast: 100,
    grayscale: 0,
    invert: 0,
});

class ImageEffects {
    public brightness: number;
    public contrast: number;
    public grayscale: number;
    public invert: number;
    public canvasManager: ICanvasDraw;

    /**
     *
     * @param {ICanvasDraw} canvas
     */
    constructor(canvas: ICanvasDraw) {
        this.brightness = defaultValues.brightness;
        this.contrast = defaultValues.contrast;
        this.grayscale = defaultValues.grayscale;
        this.invert = defaultValues.invert;
        this.canvasManager = canvas;
    }

    /**
     * Returns css style values
     * @returns {string}
     */
    getValues(): string {
        const filterStyle = `brightness(${this.brightness}%) contrast(${this.contrast}%) grayscale(${this.grayscale}%) invert(${this.invert}%)`;
        return filterStyle;
    }

    /**
     * Event function that apply read and apply effects on image
     */
    updateFilterValues(): void {
        const filterValue = this.getValues();
        this.canvasManager.setStyle('image', 'filter', filterValue);
    }

    /**
     * Reset all effects
     */
    reset(): void {
        this.brightness = 100;
        this.contrast = 100;
        this.grayscale = 0;
        this.invert = 0;
        this.updateFilterValues();
    }
}

export default ImageEffects;
