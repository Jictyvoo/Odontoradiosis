export enum EStorageKey {
    BEZIER_CURVES = 'bezier_curves',
    LANDMARKS = 'saved_points',
    IMAGE_DATA = 'imageData',
}

export interface ILocalRepository {
    get<T>(key: string): T | null;

    set<T>(key: string, value: T): void;

    remove(key: string): void;
}
