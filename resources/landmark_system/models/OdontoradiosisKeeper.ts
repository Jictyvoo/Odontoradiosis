import { ICurvePointLocation } from "./Interfaces.ts";

class OdontoradiosisKeeper {
  public isMouseDown: boolean;
  public isInsideBox: boolean;
  public isOnBoxVertex: { isOn: boolean; index: number };
  public isOnCurvePoints: ICurvePointLocation | null;
  public mousePosition: { x: number; y: number };
  public isCurveFunction: boolean;

  constructor() {
    this.isMouseDown = false;
    this.isInsideBox = false;
    this.isOnBoxVertex = { isOn: false, index: 0 };
    this.isOnCurvePoints = null;
    this.mousePosition = { x: 0, y: 0 };
    this.isCurveFunction = false;
  }
}

export default OdontoradiosisKeeper;
