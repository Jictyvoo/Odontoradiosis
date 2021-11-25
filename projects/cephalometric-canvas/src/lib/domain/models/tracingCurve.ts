import {
    BezierChangeFunction,
    IBezierPoints,
} from '../util/interfaces/curveManipulation';
import { IPointBidimensional } from '../util/interfaces/interfaces';

export class AnatomicalTracingCurve {
    private curveName: string;
    private curvePoints: IBezierPoints;
    private boxPoints: number[];
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
    private getMaxMinPoints(recalculate: boolean): number[] {
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
        this.boxPoints = [minX, minY, maxX, maxY];
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
        const minPoint: IPointBidimensional = {
            x: points[0],
            y: points[1],
        };
        const maxPoint: IPointBidimensional = {
            x: points[2],
            y: points[3],
        };

        const width = maxPoint.x - minPoint.x,
            height = maxPoint.y - minPoint.y;
        return [
            minPoint.x - borderSize,
            minPoint.y - borderSize,
            width + borderSize * 2,
            height + borderSize * 2,
        ];
    }

    /**
     * Iterate all curves and changes it value
     * @param {string} curveName
     * @param {function} callback_1
     * @param {funtion} callback_2
     * @param {boolean} _recalculate
     */
    public runPointsAndChange(
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