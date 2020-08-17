class UsefulMethods {
    constructor() {}

    highLowAngle(oldPosition, currentPosition) {
        let maxX = Math.abs(oldPosition.x - currentPosition.x),
            maxY = Math.abs(oldPosition.y - currentPosition.y);
        if (Math.max(maxX, maxY) === maxX) {
            return oldPosition.x > currentPosition.x ? -1 : 1;
        }
        return oldPosition.y > currentPosition.y ? -1 : 1;
    }

    calculateAngle(point_a, point_b) {
        let productModule = {
            first: Math.sqrt(Math.pow(point_a.x, 2) + Math.pow(point_a.y, 2)),
            second: Math.sqrt(Math.pow(point_b.x, 2) + Math.pow(point_b.y, 2))
        };
        let scaleProduct = Math.abs(
            point_a.x * point_b.x + point_a.y * point_b.y
        );
        return Math.acos(
            scaleProduct / (productModule.first * productModule.second)
        );
    }
}
