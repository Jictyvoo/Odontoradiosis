import { ILocalRepository } from '../../domain/util/interfaces/repositories';
import * as i0 from "@angular/core";
export declare class LocalRepositoryImpl implements ILocalRepository {
    private readonly storage;
    constructor();
    get<T>(key: string): T | null;
    set<T>(key: string, value: T): void;
    remove(key: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<LocalRepositoryImpl, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<LocalRepositoryImpl>;
}
