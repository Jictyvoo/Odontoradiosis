import { ICurveAccess } from '../util/interfaces/curveAccess';
import {
    BezierChangeFunction,
    IBezierPoints,
} from '../util/interfaces/curveManipulation';
import { IPointBidimensional } from '../util/interfaces/interfaces';
import UsefulMethods from '../util/usefulMethods';

export class AnatomicalTracingCurve implements ICurveAccess {
    private curveName: string;
    private curvePoints: IBezierPoints;
    private boxPoints: IPointBidimensional[];
    private boxDimensions: number[];

    constructor(curveName: string, points: IBezierPoints) {
        this.curveName = curveName;
        this.curvePoints = points;
        this.boxPoints = [];
        this.boxDimensions = [];
    }

    /**
     * Returns all edge points in a curve
     * @param {string} curveName
     * @param {boolean} recalculate
     */
    public getMaxMinPoints(recalculate: boolean): IPointBidimensional[] {
        if (this.boxPoints.length > 0 && !recalculate) {
            return this.boxPoints;
        }
        let minX = Number.POSITIVE_INFINITY,
            minY = Number.POSITIVE_INFINITY;
        let maxX = Number.NEGATIVE_INFINITY,
            maxY = Number.NEGATIVE_INFINITY;
        for (let element of this.curvePoints) {
            for (let position = 0; position < element.length; position++) {
                const point = element[position];
                if (position % 2 !== 0) {
                    minY = Math.min(minY, point);
                    maxY = Math.max(maxY, point);
                } else {
                    minX = Math.min(minX, point);
                    maxX = Math.max(maxX, point);
                }
            }
        }
        const minPoint: IPointBidimensional = {
            x: minX,
            y: minY,
        };
        const maxPoint: IPointBidimensional = {
            x: maxX,
            y: maxY,
        };
        this.boxPoints = [minPoint, maxPoint];
        return this.boxPoints;
    }

    /**
     * Returns an array with box dimensions of a specific curve
     * @param {string} curveName
     * @param {number} borderSize
     * @param {boolean} recalculate
     */
    public getBoxDimensions(
        borderSize: number = 20,
        recalculate: boolean = false
    ): number[] {
        if (this.boxDimensions.length > 0 && !recalculate) {
            return this.boxDimensions;
        }
        const points = this.getMaxMinPoints(recalculate);
        return UsefulMethods.calculateBoxDimensions(points, borderSize);
    }

    private getCurveCenter(recalculate: boolean = false): IPointBidimensional {
        const points = this.getMaxMinPoints(recalculate);
        const minPoint = points[0];
        const maxPoint = points[1];
        const center: IPointBidimensional = {
            x: (minPoint.x + maxPoint.x) / 2,
            y: (minPoint.y + maxPoint.y) / 2,
        };
        return center;
    }

    /**
     * Iterate all curves and changes it value
     * @param {string} curveName
     * @param {function} callback_1
     * @param {funtion} callback_2
     * @param {boolean} _recalculate
     */
    private runPointsAndChange(
        callback_1: BezierChangeFunction,
        callback_2: BezierChangeFunction
    ): void {
        for (let points of this.curvePoints) {
            for (let position = 0; position < points.length; position++) {
                if (position % 2 === 0) {
                    points[position] = callback_1(
                        points[position],
                        points[position + 1]
                    );
                } else {
                    points[position] = callback_2(
                        points[position],
                        points[position - 1]
                    );
                }
            }
        }
        this.boxDimensions = this.getBoxDimensions(20, true);
    }

    public updatePoints(
        callback_1: BezierChangeFunction,
        callback_2: BezierChangeFunction,
        keepOldCenter: boolean = true
    ): void {
        const previousCenter: IPointBidimensional = this.getCurveCenter(false);
        this.runPointsAndChange(callback_1, callback_2);

        if (keepOldCenter) {
            const newCenter: IPointBidimensional = this.getCurveCenter(true);
            // Move curve to the old center
            const moveX = previousCenter.x - newCenter.x;
            const moveY = previousCenter.y - newCenter.y;
            this.runPointsAndChange(
                (pointX, _pointY) => pointX + moveX,
                (pointY, _pointX) => pointY + moveY
            );
        }
    }

    public getPoint(index: number): IPointBidimensional | null {
        let counter = 0;
        // TODO: Improve this search, calculate position with index divisor
        for (const element of this.points) {
            for (let subindex = 1; subindex < element.length; subindex += 2) {
                counter++;
                if (counter == index) {
                    return {
                        x: element[subindex - 1],
                        y: element[subindex],
                    };
                }
            }
        }
        return null;
    }

    public get points(): IBezierPoints {
        return this.curvePoints;
    }

    public get length(): number {
        return this.curvePoints.length;
    }

    public get name(): string {
        return this.curveName;
    }
}
