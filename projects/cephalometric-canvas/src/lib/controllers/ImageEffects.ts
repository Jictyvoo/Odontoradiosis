import { default as CanvasOdontoradiosis } from '../views/Canvas';

class ImageEffects {
    public brightness: HTMLSelectElement;
    public contrast: HTMLSelectElement;
    public grayscale: HTMLSelectElement;
    public invert: HTMLSelectElement;
    public canvasManager: CanvasOdontoradiosis;

    /**
     *
     * @param {CanvasOdontoradiosis} canvas
     */
    constructor(canvas: CanvasOdontoradiosis) {
        this.brightness = document.getElementById(
            'brightness'
        ) as HTMLSelectElement;
        this.contrast = document.getElementById(
            'contrast'
        ) as HTMLSelectElement;
        this.grayscale = document.getElementById(
            'grayscale'
        ) as HTMLSelectElement;
        this.invert = document.getElementById('invert') as HTMLSelectElement;
        this.canvasManager = canvas;
    }

    /**
     * Returns css style values
     * @returns {string}
     */
    getValues(): string {
        const brightnessValue = this.brightness.value,
            contrastValue = this.contrast.value,
            grayscaleValue = this.grayscale.value,
            invertValue = this.invert.value;

        const filterStyle = `brightness(${brightnessValue}%) contrast(${contrastValue}%) grayscale(${grayscaleValue}%) invert(${invertValue}%)`;
        return filterStyle;
    }

    /**
     * Event function that apply read and apply effects on image
     */
    onChangeValue(): void {
        const filterValue = this.getValues();
        this.canvasManager.setStyle('image', 'filter', filterValue);
    }

    /**
     * Reset all effects
     */
    reset(): void {
        this.brightness.value = '100';
        this.contrast.value = '100';
        this.grayscale.value = '0';
        this.invert.value = '0';
        this.onChangeValue();
    }
}

export default ImageEffects;
