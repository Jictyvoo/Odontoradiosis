import { Injectable } from '@angular/core';
import { IPointBidimensional } from './interfaces/interfaces';

@Injectable({
    providedIn: 'root',
})
class ScaleManager {
    public pointRadius: number;
    public lineWidth: number;
    public nameScale: number;
    public textRelativePosition: { x: number; y: number };
    public scaleDrawValue: {
        pointRadius: number;
        nameScale: number;
        lineWidth: number;
        textRelativePosition: { x: number; y: number };
    };

    constructor() {
        this.pointRadius = 4;
        this.lineWidth = 1;
        this.nameScale = 10;
        this.textRelativePosition = { x: 15, y: 15 };
        this.scaleDrawValue = Object.freeze({
            pointRadius: 4,
            nameScale: 10,
            lineWidth: 2,
            textRelativePosition: Object.freeze({ x: 15, y: 15 }),
        });
    }

    /**
     * Calculate the scale to make canvas dynamic and returns it
     * @param {number} valueToResize
     * @param {boolean} isX
     * @param {CanvasRenderingContext2D} clientRect
     * @param {ClientRect} clientRect
     */
    dynamicCanvasScale(
        valueToResize: number = 1,
        isX: boolean = false,
        context: CanvasRenderingContext2D,
        clientRect: ClientRect
    ): number {
        const canvasDimensions = {
            width: clientRect.width,
            height: clientRect.height,
        };
        const imageDimensions = {
            width: context.canvas.width,
            height: context.canvas.height,
        };
        if (isX) {
            return (
                (imageDimensions.width * valueToResize) / canvasDimensions.width
            );
        } else {
            return (
                (imageDimensions.height * valueToResize) /
                canvasDimensions.height
            );
        }
    }

    /**
     * Calculates all scales variables
     * @param {HTMLCanvasElement} canvas
     */
    calculateScales(canvas: HTMLCanvasElement): void {
        const rect = canvas.getBoundingClientRect();
        const context = canvas.getContext('2d') as CanvasRenderingContext2D;
        const imageDimensions = {
            width: context.canvas.width,
            height: context.canvas.height,
        };
        const isX = imageDimensions.width > imageDimensions.height;
        this.pointRadius = this.dynamicCanvasScale(
            this.scaleDrawValue.pointRadius,
            isX,
            context,
            rect
        );
        this.nameScale = this.dynamicCanvasScale(
            this.scaleDrawValue.nameScale,
            isX,
            context,
            rect
        );
        this.lineWidth = this.dynamicCanvasScale(
            this.scaleDrawValue.lineWidth,
            isX,
            context,
            rect
        );
        this.textRelativePosition.x = this.dynamicCanvasScale(
            this.scaleDrawValue.textRelativePosition.x,
            isX,
            context,
            rect
        );
        this.textRelativePosition.y = this.dynamicCanvasScale(
            this.scaleDrawValue.textRelativePosition.y,
            isX,
            context,
            rect
        );
    }

    /**
     * Returns an object containing the relative mouse position in Canvas
     * @param {HTMLElement} canvas
     * @param {Event} point
     */
    getMousePos(
        canvas: HTMLCanvasElement,
        point: IPointBidimensional
    ): { x: number; y: number } {
        const rect = canvas.getBoundingClientRect();
        const context = canvas.getContext('2d') as CanvasRenderingContext2D;
        return {
            x: this.dynamicCanvasScale(
                point.x - rect.left,
                true,
                context,
                rect
            ),
            y: this.dynamicCanvasScale(
                point.y - rect.top,
                false,
                context,
                rect
            ),
        };
    }
}

export default ScaleManager;
