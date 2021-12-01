import { IPointBidimensional } from './interfaces';

export interface ILandmark extends IPointBidimensional {
    x: number;
    y: number;
}

export interface ILandmarkArray {
    [key: string]: ILandmark;
}
