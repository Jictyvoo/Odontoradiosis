import { ICurvePointLocation, IMousePosition } from '../util/interfaces/interfaces';
import * as i0 from "@angular/core";
declare class OdontoradiosisKeeper {
    isMouseDown: boolean;
    isInsideBox: boolean;
    isOnBoxVertex: {
        isOn: boolean;
        index: number;
    };
    isOnCurvePoints: ICurvePointLocation | null;
    mousePosition: IMousePosition;
    isCurveFunction: boolean;
    selectedOptions: {
        curve: string;
        landmark: string;
    };
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<OdontoradiosisKeeper, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OdontoradiosisKeeper>;
}
export default OdontoradiosisKeeper;
