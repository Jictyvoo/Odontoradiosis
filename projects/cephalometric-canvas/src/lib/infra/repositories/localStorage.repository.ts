import { Injectable } from '@angular/core';
import { ILocalRepository } from '../../domain/util/interfaces/repositories';

@Injectable({
    providedIn: 'root',
})
export class LocalRepositoryImpl implements ILocalRepository {
    private readonly storage: Storage;

    constructor() {
        this.storage = window.localStorage;
    }

    public get<T>(key: string): T | null {
        const value = this.storage.getItem(key);
        if (value) {
            return JSON.parse(value) as T;
        }
        return null;
    }

    public set<T>(key: string, value: T): void {
        this.storage.setItem(key, JSON.stringify(value));
    }

    public remove(key: string): void {
        this.storage.removeItem(key);
    }
}
