import { IPointBidimensional } from '../models/Interfaces';

class UsefulMethods {
	/**
	 * Returns canvas style, based on parameters
	 * @param {float} zIndex
	 * @param {string} position
	 * @param {float} left
	 * @param {float} top
	 */
	static canvasStyle(
		zIndex = 0,
		position = 'absolute',
		left = 0,
		top = 0
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
		const scaleProduct = Math.abs(pointA.x * pointB.x + pointA.y * pointB.y);
		return Math.acos(
			scaleProduct / (productModule.first * productModule.second)
		);
	}
}

export default UsefulMethods;
