import { ICurveAccess } from '../../../util/interfaces/curveAccess';
import { IPointBidimensional } from '../../../util/interfaces/interfaces';

export class ElementsStorage {
    private points: Map<string, IPointBidimensional>;
    private strings: Map<string, string>;
    private numbers: Map<string, number>;
    private curveAccess: Map<string, ICurveAccess>;

    public constructor() {
        this.points = new Map<string, IPointBidimensional>();
        this.strings = new Map<string, string>();
        this.numbers = new Map<string, number>();
        this.curveAccess = new Map<string, ICurveAccess>();
    }

    public addPoint(key: string, value: IPointBidimensional): void {
        this.points.set(key, value);
    }

    public addString(key: string, value: string): void {
        this.strings.set(key, value);
    }

    public addNumber(key: string, value: number): void {
        this.numbers.set(key, value);
    }

    public addCurveAccess(key: string, value: ICurveAccess): void {
        this.curveAccess.set(key, value);
    }

    public getPoint(key: string): IPointBidimensional | null {
        return this.points.get(key) ?? null;
    }

    public getString(key: string): string | null {
        return this.strings.get(key) ?? null;
    }

    public getNumber(key: string): number | null {
        // This is a workaround since pre-defined functions only accept strings
        const tryFloat = parseFloat(key);
        if (!isNaN(tryFloat)) {
            return tryFloat;
        }
        return this.numbers.get(key) ?? null;
    }

    public getCurvePoint(
        key: string,
        index: number
    ): IPointBidimensional | null {
        const curveElement = this.curveAccess.get(key);
        if (curveElement) {
            return curveElement.getPoint(index);
        }
        return null;
    }
}
