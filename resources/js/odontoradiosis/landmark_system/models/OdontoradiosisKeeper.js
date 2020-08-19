class OdontoradiosisKeeper {
    constructor() {
        this.isMouseDown = false;
        this.isInsideBox = false;
        this.isOnBoxVertex = { isOn: false, index: 0 };
        this.isOnCurvePoints = null;
        this.mousePosition = { x: null, y: null };
        this.isCurveFunction = false;
    }
}
