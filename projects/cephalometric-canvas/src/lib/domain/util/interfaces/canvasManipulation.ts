import { IBezierCurves } from './curveManipulation';
import { ILandmarkArray } from './landmarkManipulation';

export interface ICanvasElements {
    [key: string]: HTMLCanvasElement;
}

export interface IExportableData {
    imageData: string;
    landmarks: ILandmarkArray;
    curves: IBezierCurves;
}

export interface ICanvasImage {
    imageData: string;
    isLoaded: boolean;
    isFromStorage: boolean;
}

export enum ICanvasLayers {
    BACKGROUND = 'image',
    LANDMARKS = 'landmarks',
    ANATOMICAL_TRACING = 'bezier',
}
