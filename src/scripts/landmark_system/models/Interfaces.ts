export interface IStringMap {
  [key: string]: string;
}

export interface IPointBidimensional {
  x: number;
  y: number;
}

export interface ILandmark {
  X: number;
  Y: number;
}

export interface IMousePosition extends IPointBidimensional {
  disabled: boolean;
}

export interface ILandmarkArray {
  [key: string]: ILandmark;
}

export interface IBezierCurves {
  [key: string]: number[][];
}

export interface ICurvePointLocation {
  [key: number]: number | number[];
}

export interface IRoutineHelpVar {
  accessed_curves: string[];
  landmarkName: string;
}

export interface IRoutinesSemiautomatic {
  landmark: string;
  accessed_curves: string[];
  routines: any[][];
}
