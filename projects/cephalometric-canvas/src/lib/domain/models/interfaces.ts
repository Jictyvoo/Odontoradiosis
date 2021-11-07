export interface IStringMap {
    [key: string]: string;
}

export interface IEffectValues {
    brightness: number;
    contrast: number;
    grayscale: number;
    invert: number;
}

export interface IPointBidimensional {
    x: number;
    y: number;
}

export interface ILandmark extends IPointBidimensional {
    x: number;
    y: number;
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
