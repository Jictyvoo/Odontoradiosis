class OdontoradiosisKeeper {
  public isMouseDown: any;
  public isInsideBox: any;
  public isOnBoxVertex: any;
  public isOnCurvePoints: any;
  public mousePosition: any;
  public isCurveFunction: any;

  constructor() {
    this.isMouseDown = false;
    this.isInsideBox = false;
    this.isOnBoxVertex = { isOn: false, index: 0 };
    this.isOnCurvePoints = null;
    this.mousePosition = { x: null, y: null };
    this.isCurveFunction = false;
  }
}
