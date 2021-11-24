export type IBezierPoints = number[][];

export interface IBezierCurves {
    [key: string]: IBezierPoints;
}

export interface ICurvePointLocation {
    [key: number]: number | number[];
}

export type BezierChangeFunction = {
    (point_1: number, point_2?: number): number;
};

export interface IChangeBezierPoint {
    x: BezierChangeFunction;
    y: BezierChangeFunction;
}
