class UsefulMethods {
  /**
   * Returns canvas style, based on parameters
   * @param {float} z_index
   * @param {string} position
   * @param {float} left
   * @param {float} top
   */
  static canvasStyle(z_index = 0, position = "absolute", left = 0, top = 0) {
    return `position: ${position}; left: ${left}; top: ${top}; z-index: ${z_index};`;
  }

  /**
   * Normalize name
   * @param {string} toNormalize
   * @returns {string}
   */
  static normalizeTracingName(toNormalize) {
    return toNormalize.replace(/ /g, "-").toLowerCase();
  }

  /**
   * Return scale to angle
   * @param {object} oldPosition
   * @param {object} currentPosition
   */
  static highLowAngle(oldPosition, currentPosition) {
    let maxX = Math.abs(oldPosition.x - currentPosition.x),
      maxY = Math.abs(oldPosition.y - currentPosition.y);
    if (Math.max(maxX, maxY) === maxX) {
      return oldPosition.x > currentPosition.x ? -1 : 1;
    }
    return oldPosition.y > currentPosition.y ? -1 : 1;
  }

  /**
   * Subtract the origin from points
   * @param {object} point_a
   * @param {object} point_b
   * @param {object} origin
   */
  normalizeValues(point_a, point_b, origin) {
    let normalized = [
      { x: point_a.x, y: point_a.y },
      { x: point_b.x, y: point_b.y },
    ];
    normalized[0].x -= origin.x;
    normalized[0].y -= origin.y;

    normalized[1].x -= origin.x;
    normalized[1].y -= origin.y;

    return normalized;
  }

  /**
   * Calculate angle between two points
   * @param {object} point_a
   * @param {object} point_b
   */
  static calculateAngle(point_a, point_b) {
    let productModule = {
      first: Math.sqrt(Math.pow(point_a.x, 2) + Math.pow(point_a.y, 2)),
      second: Math.sqrt(Math.pow(point_b.x, 2) + Math.pow(point_b.y, 2)),
    };
    let scaleProduct = Math.abs(point_a.x * point_b.x + point_a.y * point_b.y);
    return Math.acos(
      scaleProduct / (productModule.first * productModule.second)
    );
  }
}

export default UsefulMethods;
