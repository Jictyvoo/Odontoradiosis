import { AnatomicalTracingCurve } from '../../models/tracingCurve';

export type IBezierPoints = number[][];

export interface ITracingCurves {
    [key: string]: IBezierPoints;
}

export interface ITracingList {
    [key: string]: AnatomicalTracingCurve;
}

export interface ICurvePointLocation {
    element: number[];
    x: number;
    y: number;
}

export type BezierChangeFunction = {
    (point_1: number, point_2: number): number;
};

export interface IChangeBezierPoint {
    x: BezierChangeFunction;
    y: BezierChangeFunction;
}
