import { IPointBidimensional } from './interfaces/interfaces';

class UsefulMethods {
    /**
     * Returns canvas style, based on parameters
     * @param {number} zIndex
     * @param {string} position
     * @param {number} left
     * @param {number} top
     */
    static canvasStyle(
        zIndex: number = 0,
        position: string = 'absolute',
        left: number = 0,
        top: number = 0
    ): string {
        return `position: ${position}; left: ${left}; top: ${top}; z-index: ${zIndex};`;
    }

    /**
     * Normalize name
     * @param {string} toNormalize
     * @returns {string}
     */
    static normalizeTracingName(toNormalize: string): string {
        return toNormalize.replace(/ /g, '-').toLowerCase();
    }

    /**
     * Return scale to angle
     * @param {object} oldPosition
     * @param {object} currentPosition
     */
    static highLowAngle(
        oldPosition: IPointBidimensional,
        currentPosition: IPointBidimensional
    ): number {
        const maxX = Math.abs(oldPosition.x - currentPosition.x),
            maxY = Math.abs(oldPosition.y - currentPosition.y);
        if (Math.max(maxX, maxY) === maxX) {
            return oldPosition.x > currentPosition.x ? -1 : 1;
        }
        return oldPosition.y > currentPosition.y ? -1 : 1;
    }

    /**
     * Calculate a dimesion for a rectangle box based on it's max and min points
     * @param points
     * @param borderSize
     * @returns
     */
    static calculateBoxDimensions(
        points: IPointBidimensional[],
        borderSize: number = 20
    ): number[] {
        const minPoint = points[0];
        const maxPoint = points[1];
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
     * Subtract the origin from points
     * @param {object} pointA
     * @param {object} pointB
     * @param {object} origin
     */
    static normalizeValues(
        pointA: IPointBidimensional,
        pointB: IPointBidimensional,
        origin: IPointBidimensional
    ): IPointBidimensional[] {
        const normalized = [
            { x: pointA.x, y: pointA.y },
            { x: pointB.x, y: pointB.y },
        ];
        normalized[0].x -= origin.x;
        normalized[0].y -= origin.y;

        normalized[1].x -= origin.x;
        normalized[1].y -= origin.y;

        return normalized;
    }

    /**
     * Calculate angle between two points
     * @param {object} pointA
     * @param {object} pointB
     */
    static calculateAngle(
        pointA: IPointBidimensional,
        pointB: IPointBidimensional
    ): number {
        const productModule = {
            first: Math.sqrt(Math.pow(pointA.x, 2) + Math.pow(pointA.y, 2)),
            second: Math.sqrt(Math.pow(pointB.x, 2) + Math.pow(pointB.y, 2)),
        };
        const scaleProduct = Math.abs(
            pointA.x * pointB.x + pointA.y * pointB.y
        );
        return Math.acos(
            scaleProduct / (productModule.first * productModule.second)
        );
    }
}

export default UsefulMethods;
