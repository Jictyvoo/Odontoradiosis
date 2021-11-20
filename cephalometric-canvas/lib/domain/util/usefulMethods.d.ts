import { IPointBidimensional } from './interfaces/interfaces';
declare class UsefulMethods {
    /**
     * Returns canvas style, based on parameters
     * @param {number} zIndex
     * @param {string} position
     * @param {number} left
     * @param {number} top
     */
    static canvasStyle(zIndex?: number, position?: string, left?: number, top?: number): string;
    /**
     * Normalize name
     * @param {string} toNormalize
     * @returns {string}
     */
    static normalizeTracingName(toNormalize: string): string;
    /**
     * Return scale to angle
     * @param {object} oldPosition
     * @param {object} currentPosition
     */
    static highLowAngle(oldPosition: IPointBidimensional, currentPosition: IPointBidimensional): number;
    /**
     * Subtract the origin from points
     * @param {object} pointA
     * @param {object} pointB
     * @param {object} origin
     */
    static normalizeValues(pointA: IPointBidimensional, pointB: IPointBidimensional, origin: IPointBidimensional): IPointBidimensional[];
    /**
     * Calculate angle between two points
     * @param {object} pointA
     * @param {object} pointB
     */
    static calculateAngle(pointA: IPointBidimensional, pointB: IPointBidimensional): number;
}
export default UsefulMethods;
