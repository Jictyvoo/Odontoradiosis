import { IBezierPoints } from './curveManipulation';
import { IPointBidimensional } from './interfaces';

export interface ICurveAccess {
    get points(): IBezierPoints;

    getPoint(index: number): IPointBidimensional | null;
}
