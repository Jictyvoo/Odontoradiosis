class ImageEffects {
	public brightness: any;
	public contrast: any;
	public grayscale: any;
	public invert: any;
	public canvasManager: any;

    /**
     *
     * @param {CanvasOdontoradiosis} canvas
     */
    constructor(canvas) {
        this.brightness = document.getElementById("brightness");
        this.contrast = document.getElementById("contrast");
        this.grayscale = document.getElementById("grayscale");
        this.invert = document.getElementById("invert");
        this.canvasManager = canvas;
    }

    /**
     * Returns css style values
     * @returns {string}
     */
    getValues() {
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
    onChangeValue() {
        let filterValue = this.getValues();
        this.canvasManager.setStyle("image", "filter", filterValue);
    }

    /**
     * Reset all effects
     */
    reset() {
        this.brightness.value = 100;
        this.contrast.value = 100;
        this.grayscale.value = 0;
        this.invert.value = 0;
        this.onChangeValue();
    }
}
