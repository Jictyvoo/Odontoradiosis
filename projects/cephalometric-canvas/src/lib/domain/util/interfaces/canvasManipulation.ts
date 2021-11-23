export interface ICanvasElements {
    [key: string]: HTMLCanvasElement;
}

export interface ICanvasImage {
    imageData: string;
    isLoaded: boolean;
}

export enum ICanvasLayers {
    BACKGROUND = 'image',
    LANDMARKS = 'landmarks',
    ANATOMICAL_TRACING = 'bezier',
}
