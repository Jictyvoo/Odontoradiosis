class ImageEffects {
    /**
     *
     * @param {CanvasOdontoradiosis} canvas
     */
    constructor(canvas) {
        this.brightness = document.getElementById("brightness");
        this.contrast = document.getElementById("contrast");
        this.grayscale = document.getElementById("grayscale");
        this.invert = document.getElementById("invert");
        this.canvas = canvas;
    }

    /**
     * Returns css style values
     * @returns {string}
     */
    getValues() {
        let filterStyle = "filter: ",
            brightnessValue = this.brightness.value,
            contrastValue = this.contrast.value,
            grayscaleValue = this.grayscale.value,
            invertValue = this.invert.value;

        // noinspection JSAnnotator
        filterStyle += `
            brightness(${brightnessValue}%)
            contrast(${contrastValue}%)
            grayscale(${grayscaleValue}%)
            invert(${invertValue}%)`;

        return filterStyle;
    }

    /**
     * Event function that apply read and apply effects on image
     */
    onChangeValue() {
        const imageElement = this.canvas.getCanvas("image");
        let filterValue = getValues();
        imageElement.setAttribute("style", filterValue);
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
