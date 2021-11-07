import { Injectable } from '@angular/core';
import { ILocalRepository } from './interface';

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
        if (value === null) {
            return null;
        }
        return JSON.parse(value);
    }

    public set<T>(key: string, value: T): void {
        this.storage.setItem(key, JSON.stringify(value));
    }

    public remove(key: string): void {
        this.storage.removeItem(key);
    }
}
