import { Injectable } from '@angular/core';
import { ICurvePointLocation } from '../util/interfaces/curveManipulation';
import { IMousePosition } from '../util/interfaces/interfaces';

@Injectable({
    providedIn: 'root',
})
class OdontoradiosisKeeper {
    public isMouseDown: boolean;
    public isInsideBox: boolean;
    public isOnBoxVertex: { isOn: boolean; index: number };
    public isOnCurvePoints: ICurvePointLocation | null;
    public mousePosition: IMousePosition;
    public isCurveFunction: boolean;
    public selectedOptions: {
        curve: string;
        landmark: string;
        isAllCurves: boolean;
    };

    constructor() {
        this.isMouseDown = false;
        this.isInsideBox = false;
        this.isOnBoxVertex = { isOn: false, index: 0 };
        this.isOnCurvePoints = null;
        this.mousePosition = { x: 0, y: 0, disabled: true };
        this.isCurveFunction = false;
        this.selectedOptions = { curve: '', landmark: '', isAllCurves: false };
    }
}

export default OdontoradiosisKeeper;
