import { IPointBidimensional } from './interfaces';

export interface ILandmark extends IPointBidimensional {
    x: number;
    y: number;
}

export interface ILandmarkArray {
    [key: string]: ILandmark;
}

// TODO: Create a class for this, and a parse in compile-time (save it as a AST)
export interface IRoutinesSemiautomatic {
    landmark: string;
    accessed_curves: string[];
    routines: any[][];
}
