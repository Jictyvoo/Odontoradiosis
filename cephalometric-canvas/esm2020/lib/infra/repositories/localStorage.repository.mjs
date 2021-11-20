import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class LocalRepositoryImpl {
    constructor() {
        this.storage = window.localStorage;
    }
    get(key) {
        const value = this.storage.getItem(key);
        if (value === null) {
            return null;
        }
        return JSON.parse(value);
    }
    set(key, value) {
        this.storage.setItem(key, JSON.stringify(value));
    }
    remove(key) {
        this.storage.removeItem(key);
    }
}
LocalRepositoryImpl.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: LocalRepositoryImpl, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
LocalRepositoryImpl.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: LocalRepositoryImpl, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: LocalRepositoryImpl, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxTdG9yYWdlLnJlcG9zaXRvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jZXBoYWxvbWV0cmljLWNhbnZhcy9zcmMvbGliL2luZnJhL3JlcG9zaXRvcmllcy9sb2NhbFN0b3JhZ2UucmVwb3NpdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQU0zQyxNQUFNLE9BQU8sbUJBQW1CO0lBRzVCO1FBQ0ksSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDO0lBQ3ZDLENBQUM7SUFFTSxHQUFHLENBQUksR0FBVztRQUNyQixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN4QyxJQUFJLEtBQUssS0FBSyxJQUFJLEVBQUU7WUFDaEIsT0FBTyxJQUFJLENBQUM7U0FDZjtRQUNELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRU0sR0FBRyxDQUFJLEdBQVcsRUFBRSxLQUFRO1FBQy9CLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVNLE1BQU0sQ0FBQyxHQUFXO1FBQ3JCLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7O2dIQXJCUSxtQkFBbUI7b0hBQW5CLG1CQUFtQixjQUZoQixNQUFNOzJGQUVULG1CQUFtQjtrQkFIL0IsVUFBVTttQkFBQztvQkFDUixVQUFVLEVBQUUsTUFBTTtpQkFDckIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IElMb2NhbFJlcG9zaXRvcnkgfSBmcm9tICcuLi8uLi9kb21haW4vdXRpbC9pbnRlcmZhY2VzL3JlcG9zaXRvcmllcyc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgICBwcm92aWRlZEluOiAncm9vdCcsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBMb2NhbFJlcG9zaXRvcnlJbXBsIGltcGxlbWVudHMgSUxvY2FsUmVwb3NpdG9yeSB7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHN0b3JhZ2U6IFN0b3JhZ2U7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5zdG9yYWdlID0gd2luZG93LmxvY2FsU3RvcmFnZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0PFQ+KGtleTogc3RyaW5nKTogVCB8IG51bGwge1xyXG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5zdG9yYWdlLmdldEl0ZW0oa2V5KTtcclxuICAgICAgICBpZiAodmFsdWUgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0PFQ+KGtleTogc3RyaW5nLCB2YWx1ZTogVCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc3RvcmFnZS5zZXRJdGVtKGtleSwgSlNPTi5zdHJpbmdpZnkodmFsdWUpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVtb3ZlKGtleTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KTtcclxuICAgIH1cclxufVxyXG4iXX0=