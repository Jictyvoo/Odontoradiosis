import LandmarksController from '../../../controllers/subcontrollers/landmarksController';
import { AnatomicalTracingCurve } from '../../../models/tracingCurve';
import { IPointBidimensional } from '../../../util/interfaces/interfaces';
import { IRoutineDescription } from '../interfaces';
import { ElementsStorage } from '../models/elements_storage';

export class RoutineExecutor {
    private readonly routine: IRoutineDescription;
    private elementsStorage: ElementsStorage;
    private readonly accessedTracings: Map<string, AnatomicalTracingCurve>;
    private readonly landmarksController: LandmarksController;

    constructor(
        tracingController: Map<string, AnatomicalTracingCurve>,
        landmarksController: LandmarksController,
        routine: IRoutineDescription
    ) {
        this.routine = routine;
        this.elementsStorage = new ElementsStorage();
        this.accessedTracings = tracingController;
        this.landmarksController = landmarksController;
    }

    private load_curve(firstParam: string, resultName: string): void {
        const loadedCurves = this.accessedTracings.get(firstParam);

        if (loadedCurves) {
            this.elementsStorage.addCurveAccess(resultName, loadedCurves);
        }
    }

    private access_point(
        pointIndex: number,
        tracingKey: string,
        resultName: string
    ): void {
        const point = this.elementsStorage.getCurvePoint(
            tracingKey,
            pointIndex
        );

        // Save obtained point if it exists
        if (point) {
            this.elementsStorage.addPoint(resultName, point);
        }
    }

    private point_to_var(
        firstParam: string,
        resultName: { x: string; y: string }
    ): void {
        const toVar = this.elementsStorage.getPoint(firstParam);
        if (toVar) {
            this.elementsStorage.addNumber(resultName.x, toVar.x);
            this.elementsStorage.addNumber(resultName.y, toVar.y);
        }
    }

    private add(
        firstParam: string,
        secondParam: string,
        resultName: string
    ): number {
        const value_1 = this.elementsStorage.getNumber(firstParam) ?? 0;
        const value_2 = this.elementsStorage.getNumber(secondParam) ?? 0;
        const result = value_1 + value_2;
        this.elementsStorage.addNumber(resultName, result);
        return result;
    }

    private sub(
        firstParam: string,
        secondParam: string,
        resultName: string
    ): number {
        const value_1 = this.elementsStorage.getNumber(firstParam) ?? 0;
        const value_2 = this.elementsStorage.getNumber(secondParam) ?? 0;
        const result = value_1 - value_2;
        this.elementsStorage.addNumber(resultName, result);
        return result;
    }

    private div(
        firstParam: string,
        secondParam: string,
        resultName: string
    ): number {
        const value_1 = this.elementsStorage.getNumber(firstParam) ?? 0;
        const value_2 = this.elementsStorage.getNumber(secondParam) ?? 0;
        const result = value_1 / value_2;
        this.elementsStorage.addNumber(resultName, result);
        return result;
    }

    private mul(
        firstParam: string,
        secondParam: string,
        resultName: string
    ): number {
        const value_1 = this.elementsStorage.getNumber(firstParam) ?? 0;
        const value_2 = this.elementsStorage.getNumber(secondParam) ?? 0;
        const result = value_1 * value_2;
        this.elementsStorage.addNumber(resultName, result);
        return result;
    }

    private mod(
        firstParam: string,
        secondParam: string,
        resultName: string
    ): number {
        const value_1 = this.elementsStorage.getNumber(firstParam) ?? 0;
        const value_2 = this.elementsStorage.getNumber(secondParam) ?? 0;
        const result = value_1 % value_2;
        this.elementsStorage.addNumber(resultName, result);
        return result;
    }

    private average(
        firstParam: string[],
        resultName: string
    ): IPointBidimensional {
        let average = { x: 0, y: 0 };
        const total = firstParam.length;
        for (const element of firstParam) {
            const tempPoint = this.elementsStorage.getPoint(element);
            if (tempPoint) {
                average.x += tempPoint.x;
                average.y += tempPoint.y;
            }
        }
        const resultPoint = {
            x: average.x / total,
            y: average.y / total,
        };

        this.elementsStorage.addPoint(resultName, resultPoint);
        return resultPoint;
    }

    private returnPoint(
        firstParam: string,
        secondParam: string
    ): IPointBidimensional {
        const result = {
            x: this.elementsStorage.getNumber(firstParam) ?? 0,
            y: this.elementsStorage.getNumber(secondParam) ?? 0,
        };
        this.landmarksController.setLandmark(this.routine.landmark, result);
        return result;
    }

    /**
     * Start all routines
     */
    public start(): IPointBidimensional | null {
        for (const element of this.routine.instructions) {
            // Saving elements in temp variables, to help with the execution of the routine
            const functionName = element[0];
            const firstParam = element[1] as any;
            const secondParam = element[2] as any;
            const resultName = element[3] as any;

            // Select the function to execute
            switch (functionName) {
                case 'load_curve':
                    this.load_curve(firstParam, resultName);
                    break;
                case 'access_point':
                    this.access_point(firstParam, secondParam, resultName);
                    break;
                case 'point_to_var':
                    this.point_to_var(firstParam, {
                        x: resultName.x ?? 'x',
                        y: resultName.y ?? 'y',
                    });
                    break;
                case 'add':
                    this.add(firstParam, secondParam, resultName);
                    break;
                case 'sub':
                    this.sub(firstParam, secondParam, resultName);
                    break;
                case 'div':
                    this.div(firstParam, secondParam, resultName);
                    break;
                case 'mul':
                    this.mul(firstParam, secondParam, resultName);
                    break;
                case 'mod':
                    this.mod(firstParam, secondParam, resultName);
                    break;
                case 'average':
                    this.average(firstParam, resultName);
                    break;
                case 'return':
                    return this.returnPoint(firstParam, secondParam);
                default:
                    console.error('Unknown routine');
                    break;
            }
        }

        return null;
    }
}
