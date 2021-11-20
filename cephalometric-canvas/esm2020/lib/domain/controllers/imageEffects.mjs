export const defaultValues = Object.freeze({
    brightness: 100,
    contrast: 100,
    grayscale: 0,
    invert: 0,
});
class ImageEffects {
    /**
     *
     * @param {ICanvasDraw} canvas
     */
    constructor(canvas) {
        this.brightness = defaultValues.brightness;
        this.contrast = defaultValues.contrast;
        this.grayscale = defaultValues.grayscale;
        this.invert = defaultValues.invert;
        this.canvasManager = canvas;
    }
    static get defaultValues() {
        return defaultValues;
    }
    /**
     * Returns css style values
     * @returns {string}
     */
    getValues() {
        const filterStyle = `brightness(${this.brightness}%) contrast(${this.contrast}%) grayscale(${this.grayscale}%) invert(${this.invert}%)`;
        return filterStyle;
    }
    /**
     * Event function that apply read and apply effects on image
     */
    updateFilterValues() {
        const filterValue = this.getValues();
        this.canvasManager.setStyle('image', 'filter', filterValue);
    }
    /**
     * Reset all effects
     */
    reset() {
        this.brightness = 100;
        this.contrast = 100;
        this.grayscale = 0;
        this.invert = 0;
        this.updateFilterValues();
    }
}
export default ImageEffects;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2VFZmZlY3RzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2VwaGFsb21ldHJpYy1jYW52YXMvc3JjL2xpYi9kb21haW4vY29udHJvbGxlcnMvaW1hZ2VFZmZlY3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdBLE1BQU0sQ0FBQyxNQUFNLGFBQWEsR0FBa0IsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUN0RCxVQUFVLEVBQUUsR0FBRztJQUNmLFFBQVEsRUFBRSxHQUFHO0lBQ2IsU0FBUyxFQUFFLENBQUM7SUFDWixNQUFNLEVBQUUsQ0FBQztDQUNaLENBQUMsQ0FBQztBQUVILE1BQU0sWUFBWTtJQU9kOzs7T0FHRztJQUNILFlBQVksTUFBbUI7UUFDM0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxhQUFhLENBQUMsVUFBVSxDQUFDO1FBQzNDLElBQUksQ0FBQyxRQUFRLEdBQUcsYUFBYSxDQUFDLFFBQVEsQ0FBQztRQUN2QyxJQUFJLENBQUMsU0FBUyxHQUFHLGFBQWEsQ0FBQyxTQUFTLENBQUM7UUFDekMsSUFBSSxDQUFDLE1BQU0sR0FBRyxhQUFhLENBQUMsTUFBTSxDQUFDO1FBQ25DLElBQUksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDO0lBQ2hDLENBQUM7SUFFTSxNQUFNLEtBQUssYUFBYTtRQUMzQixPQUFPLGFBQWEsQ0FBQztJQUN6QixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsU0FBUztRQUNMLE1BQU0sV0FBVyxHQUFHLGNBQWMsSUFBSSxDQUFDLFVBQVUsZUFBZSxJQUFJLENBQUMsUUFBUSxnQkFBZ0IsSUFBSSxDQUFDLFNBQVMsYUFBYSxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUM7UUFDeEksT0FBTyxXQUFXLENBQUM7SUFDdkIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsa0JBQWtCO1FBQ2QsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUVEOztPQUVHO0lBQ0gsS0FBSztRQUNELElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQzlCLENBQUM7Q0FDSjtBQUVELGVBQWUsWUFBWSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUVmZmVjdFZhbHVlcyB9IGZyb20gJy4uL3V0aWwvaW50ZXJmYWNlcy9pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgSUNhbnZhc0RyYXcgfSBmcm9tICcuLi91dGlsL2ludGVyZmFjZXMvdmlld3MvY2FudmFzRHJhdyc7XHJcblxyXG5leHBvcnQgY29uc3QgZGVmYXVsdFZhbHVlczogSUVmZmVjdFZhbHVlcyA9IE9iamVjdC5mcmVlemUoe1xyXG4gICAgYnJpZ2h0bmVzczogMTAwLFxyXG4gICAgY29udHJhc3Q6IDEwMCxcclxuICAgIGdyYXlzY2FsZTogMCxcclxuICAgIGludmVydDogMCxcclxufSk7XHJcblxyXG5jbGFzcyBJbWFnZUVmZmVjdHMge1xyXG4gICAgcHVibGljIGJyaWdodG5lc3M6IG51bWJlcjtcclxuICAgIHB1YmxpYyBjb250cmFzdDogbnVtYmVyO1xyXG4gICAgcHVibGljIGdyYXlzY2FsZTogbnVtYmVyO1xyXG4gICAgcHVibGljIGludmVydDogbnVtYmVyO1xyXG4gICAgcHVibGljIGNhbnZhc01hbmFnZXI6IElDYW52YXNEcmF3O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7SUNhbnZhc0RyYXd9IGNhbnZhc1xyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihjYW52YXM6IElDYW52YXNEcmF3KSB7XHJcbiAgICAgICAgdGhpcy5icmlnaHRuZXNzID0gZGVmYXVsdFZhbHVlcy5icmlnaHRuZXNzO1xyXG4gICAgICAgIHRoaXMuY29udHJhc3QgPSBkZWZhdWx0VmFsdWVzLmNvbnRyYXN0O1xyXG4gICAgICAgIHRoaXMuZ3JheXNjYWxlID0gZGVmYXVsdFZhbHVlcy5ncmF5c2NhbGU7XHJcbiAgICAgICAgdGhpcy5pbnZlcnQgPSBkZWZhdWx0VmFsdWVzLmludmVydDtcclxuICAgICAgICB0aGlzLmNhbnZhc01hbmFnZXIgPSBjYW52YXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgZGVmYXVsdFZhbHVlcygpOiBJRWZmZWN0VmFsdWVzIHtcclxuICAgICAgICByZXR1cm4gZGVmYXVsdFZhbHVlcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgY3NzIHN0eWxlIHZhbHVlc1xyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAqL1xyXG4gICAgZ2V0VmFsdWVzKCk6IHN0cmluZyB7XHJcbiAgICAgICAgY29uc3QgZmlsdGVyU3R5bGUgPSBgYnJpZ2h0bmVzcygke3RoaXMuYnJpZ2h0bmVzc30lKSBjb250cmFzdCgke3RoaXMuY29udHJhc3R9JSkgZ3JheXNjYWxlKCR7dGhpcy5ncmF5c2NhbGV9JSkgaW52ZXJ0KCR7dGhpcy5pbnZlcnR9JSlgO1xyXG4gICAgICAgIHJldHVybiBmaWx0ZXJTdHlsZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEV2ZW50IGZ1bmN0aW9uIHRoYXQgYXBwbHkgcmVhZCBhbmQgYXBwbHkgZWZmZWN0cyBvbiBpbWFnZVxyXG4gICAgICovXHJcbiAgICB1cGRhdGVGaWx0ZXJWYWx1ZXMoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgZmlsdGVyVmFsdWUgPSB0aGlzLmdldFZhbHVlcygpO1xyXG4gICAgICAgIHRoaXMuY2FudmFzTWFuYWdlci5zZXRTdHlsZSgnaW1hZ2UnLCAnZmlsdGVyJywgZmlsdGVyVmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVzZXQgYWxsIGVmZmVjdHNcclxuICAgICAqL1xyXG4gICAgcmVzZXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5icmlnaHRuZXNzID0gMTAwO1xyXG4gICAgICAgIHRoaXMuY29udHJhc3QgPSAxMDA7XHJcbiAgICAgICAgdGhpcy5ncmF5c2NhbGUgPSAwO1xyXG4gICAgICAgIHRoaXMuaW52ZXJ0ID0gMDtcclxuICAgICAgICB0aGlzLnVwZGF0ZUZpbHRlclZhbHVlcygpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBJbWFnZUVmZmVjdHM7XHJcbiJdfQ==