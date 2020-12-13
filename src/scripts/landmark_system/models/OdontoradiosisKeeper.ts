import { ICurvePointLocation, IMousePosition } from "./Interfaces";

class OdontoradiosisKeeper {
  public isMouseDown: boolean;
  public isInsideBox: boolean;
  public isOnBoxVertex: { isOn: boolean; index: number };
  public isOnCurvePoints: ICurvePointLocation | null;
  public mousePosition: IMousePosition;
  public isCurveFunction: boolean;

  constructor() {
    this.isMouseDown = false;
    this.isInsideBox = false;
    this.isOnBoxVertex = { isOn: false, index: 0 };
    this.isOnCurvePoints = null;
    this.mousePosition = { x: 0, y: 0, disabled: true };
    this.isCurveFunction = false;
  }
}

export default OdontoradiosisKeeper;
