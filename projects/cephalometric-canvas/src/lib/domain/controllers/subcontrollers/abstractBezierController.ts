import { AnatomicalTracingCurve } from '../../models/tracingCurve';

export abstract class AbstractBezierController {
    protected abstract getTracing(
        curveName: string
    ): AnatomicalTracingCurve | null;

    /**
     * Translate a curve
     * @param {string} curveName
     * @param {float} amountX
     * @param {float} amountY
     */
    translateBezier(curveName: string, amountX: number, amountY: number): void {
        this.getTracing(curveName)?.updatePoints(
            function (pointX: number) {
                return pointX - amountX;
            },
            function (pointY: number) {
                return pointY - amountY;
            },
            false
        );
    }

    /**
     * Rotate a bezier curve
     * @param {string} curveName
     * @param {float} angle
     */
    rotateBezier(curveName: string, angle: number): void {
        this.getTracing(curveName)?.updatePoints(
            function (pointX: number, pointY: number) {
                return pointX * Math.cos(angle) - pointY * Math.sin(angle);
            },
            function (pointY: number, pointX: number) {
                return pointX * Math.sin(angle) + pointY * Math.cos(angle);
            }
        );
    }

    /**
     * Reescale all bezier curves, based on scales given
     * @param {string} curveName
     * @param {float} scaleX
     * @param {float} scaleY
     */
    rescaleBezier(curveName: string, scaleX: number, scaleY: number): void {
        this.getTracing(curveName)?.updatePoints(
            function (pointX: number) {
                return pointX * scaleX;
            },
            function (pointY: number) {
                return pointY * scaleY;
            }
        );
    }
}
