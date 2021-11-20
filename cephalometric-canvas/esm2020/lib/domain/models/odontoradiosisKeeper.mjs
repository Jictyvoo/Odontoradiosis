import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
class OdontoradiosisKeeper {
    constructor() {
        this.isMouseDown = false;
        this.isInsideBox = false;
        this.isOnBoxVertex = { isOn: false, index: 0 };
        this.isOnCurvePoints = null;
        this.mousePosition = { x: 0, y: 0, disabled: true };
        this.isCurveFunction = false;
        this.selectedOptions = { curve: '', landmark: '' };
    }
}
OdontoradiosisKeeper.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: OdontoradiosisKeeper, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
OdontoradiosisKeeper.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: OdontoradiosisKeeper, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: OdontoradiosisKeeper, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return []; } });
export default OdontoradiosisKeeper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2RvbnRvcmFkaW9zaXNLZWVwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jZXBoYWxvbWV0cmljLWNhbnZhcy9zcmMvbGliL2RvbWFpbi9tb2RlbHMvb2RvbnRvcmFkaW9zaXNLZWVwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFNM0MsTUFHTSxvQkFBb0I7SUFTdEI7UUFDSSxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztRQUN6QixJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztRQUN6QixJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUM7UUFDL0MsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDNUIsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7UUFDcEQsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7UUFDN0IsSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3ZELENBQUM7O2lIQWpCQyxvQkFBb0I7cUhBQXBCLG9CQUFvQixjQUZWLE1BQU07MkZBRWhCLG9CQUFvQjtrQkFIekIsVUFBVTttQkFBQztvQkFDUixVQUFVLEVBQUUsTUFBTTtpQkFDckI7O0FBcUJELGVBQWUsb0JBQW9CLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7XHJcbiAgICBJQ3VydmVQb2ludExvY2F0aW9uLFxyXG4gICAgSU1vdXNlUG9zaXRpb24sXHJcbn0gZnJvbSAnLi4vdXRpbC9pbnRlcmZhY2VzL2ludGVyZmFjZXMnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxyXG59KVxyXG5jbGFzcyBPZG9udG9yYWRpb3Npc0tlZXBlciB7XHJcbiAgICBwdWJsaWMgaXNNb3VzZURvd246IGJvb2xlYW47XHJcbiAgICBwdWJsaWMgaXNJbnNpZGVCb3g6IGJvb2xlYW47XHJcbiAgICBwdWJsaWMgaXNPbkJveFZlcnRleDogeyBpc09uOiBib29sZWFuOyBpbmRleDogbnVtYmVyIH07XHJcbiAgICBwdWJsaWMgaXNPbkN1cnZlUG9pbnRzOiBJQ3VydmVQb2ludExvY2F0aW9uIHwgbnVsbDtcclxuICAgIHB1YmxpYyBtb3VzZVBvc2l0aW9uOiBJTW91c2VQb3NpdGlvbjtcclxuICAgIHB1YmxpYyBpc0N1cnZlRnVuY3Rpb246IGJvb2xlYW47XHJcbiAgICBwdWJsaWMgc2VsZWN0ZWRPcHRpb25zOiB7IGN1cnZlOiBzdHJpbmc7IGxhbmRtYXJrOiBzdHJpbmcgfTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmlzTW91c2VEb3duID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pc0luc2lkZUJveCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaXNPbkJveFZlcnRleCA9IHsgaXNPbjogZmFsc2UsIGluZGV4OiAwIH07XHJcbiAgICAgICAgdGhpcy5pc09uQ3VydmVQb2ludHMgPSBudWxsO1xyXG4gICAgICAgIHRoaXMubW91c2VQb3NpdGlvbiA9IHsgeDogMCwgeTogMCwgZGlzYWJsZWQ6IHRydWUgfTtcclxuICAgICAgICB0aGlzLmlzQ3VydmVGdW5jdGlvbiA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRPcHRpb25zID0geyBjdXJ2ZTogJycsIGxhbmRtYXJrOiAnJyB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBPZG9udG9yYWRpb3Npc0tlZXBlcjtcclxuIl19