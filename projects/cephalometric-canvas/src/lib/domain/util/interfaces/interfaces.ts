export interface IStringMap {
    [key: string]: string;
}

export interface IEffectValues {
    brightness: number;
    contrast: number;
    grayscale: number;
    invert: number;
}

export interface IPointBidimensional {
    x: number;
    y: number;
}

export interface IMousePosition extends IPointBidimensional {
    disabled: boolean;
}
