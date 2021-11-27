import { default as LandmarksController } from '../../controllers/subcontrollers/landmarksController';
import { default as TracingController } from '../../controllers/subcontrollers/tracingController';
import { IRoutineHelpVar } from '../../util/interfaces/interfaces.js';
import { IRoutinesSemiautomatic } from '../../util/interfaces/landmarkManipulation';
import { IRoutineDescription, ISymbolTable } from './interfaces';

class SemiautomaticLandmarks {
    public routinesDescription: IRoutinesSemiautomatic[];
    public tracingController: TracingController;
    public landmarksController: LandmarksController;
    public symbolTable: ISymbolTable;
    public helpVariables: IRoutineHelpVar;
    public preFunctions: { [key: string]: any };

    /**
     *
     * @param {array} routinesDescription Have all json data informing all routines
     * @param {TracingController} tracingController
     * @param {LandmarksController} landmarksController
     */
    constructor(
        routinesDescription: IRoutineDescription[],
        tracingController: TracingController,
        landmarksController: LandmarksController
    ) {
        this.routinesDescription = routinesDescription;
        this.tracingController = tracingController;
        this.landmarksController = landmarksController;
        const symbolTable: ISymbolTable = {};
        const helpVariables = { accessed_curves: [], landmarkName: '' };
        this.symbolTable = symbolTable;
        this.helpVariables = helpVariables;
        const getParamValue = function (parameter: string): string {
            return symbolTable[parameter] != null
                ? (symbolTable[parameter] as string)
                : parameter;
        };
        this.preFunctions = {
            load_curve: function (
                firstParam: string | undefined,
                secondParam: string | null | undefined,
                resultName: string
            ) {
                const loadedCurves = [
                    tracingController.getCurvePoints(firstParam),
                ];
                if (secondParam != null) {
                    loadedCurves.push(
                        tracingController.getCurvePoints(secondParam)
                    );
                    symbolTable[resultName + '_1'] = loadedCurves[0];
                    symbolTable[resultName + '_2'] = loadedCurves[1];
                } else {
                    symbolTable[resultName] = loadedCurves[0];
                }
                return loadedCurves;
            },
            access_point: function (
                firstParam: number,
                secondParam: string | number,
                resultName: string | number
            ) {
                const accessed = { x: 0, y: 0 };
                let counter = 0;
                for (
                    let index = 0;
                    index < (symbolTable[secondParam]?.length ?? 0);
                    index++
                ) {
                    const element =
                        symbolTable[secondParam] != null
                            ? symbolTable[secondParam]![index] ?? ''
                            : '';
                    for (
                        let subindex = 1;
                        subindex < (element?.length ?? 0);
                        subindex += 2
                    ) {
                        counter++;
                        if (counter == firstParam) {
                            accessed.x = element[subindex - 1] as number;
                            accessed.y = element[subindex] as number;
                        }
                    }
                }
                symbolTable[resultName] = accessed;
                return accessed;
            },
            point_to_var: function (
                firstParam: string | number,
                secondParam: any,
                resultName: { [x: string]: string | number }
            ) {
                const toVar = symbolTable[firstParam];
                symbolTable[resultName['x']] = toVar.x;
                symbolTable[resultName['y']] = toVar.y;
            },
            add: function (
                firstParam: string,
                secondParam: string,
                resultName: string | number
            ) {
                const value_1 = getParamValue(firstParam);
                const value_2 = getParamValue(secondParam);
                symbolTable[resultName] = value_1 + value_2;
                return symbolTable[resultName];
            },
            sub: function (
                firstParam: string,
                secondParam: string,
                resultName: string | number
            ) {
                const value_1 = parseFloat(getParamValue(firstParam));
                const value_2 = parseFloat(getParamValue(secondParam));
                symbolTable[resultName] = value_1 - value_2;
                return symbolTable[resultName];
            },
            div: function (
                firstParam: string,
                secondParam: string,
                resultName: string | number
            ) {
                const value_1 = parseFloat(getParamValue(firstParam));
                const value_2 = parseFloat(getParamValue(secondParam));
                symbolTable[resultName] = value_1 / value_2;
                return symbolTable[resultName];
            },
            mul: function (
                firstParam: string,
                secondParam: string,
                resultName: string | number
            ) {
                const value_1 = parseFloat(getParamValue(firstParam));
                const value_2 = parseFloat(getParamValue(secondParam));
                symbolTable[resultName] = value_1 * value_2;
                return symbolTable[resultName];
            },
            mod: function (
                firstParam: string,
                secondParam: string,
                resultName: string | number
            ) {
                const value_1 = parseFloat(getParamValue(firstParam));
                const value_2 = parseFloat(getParamValue(secondParam));
                symbolTable[resultName] = value_1 % value_2;
                return symbolTable[resultName];
            },
            average: function (
                firstParam: string | string[],
                secondParam: any,
                resultName: string | number
            ) {
                let average = { x: 0, y: 0 };
                const total = firstParam.length;
                for (let index = 0; index < firstParam.length; index++) {
                    const element = firstParam[index];
                    if (symbolTable[element]) {
                        average.x += symbolTable[element].x;
                        average.y += symbolTable[element].y;
                    }
                }
                symbolTable[resultName] = {
                    x: average.x / total,
                    y: average.y / total,
                };
                return symbolTable[resultName];
            },
            return: function (
                firstParam: string | number,
                secondParam: string | number,
                resultName: any
            ) {
                const result = {
                    x: parseFloat(symbolTable[firstParam] as string),
                    y: parseFloat(symbolTable[secondParam] as string),
                };
                landmarksController.setLandmark(
                    helpVariables.landmarkName,
                    result
                );
                landmarksController.redrawLandmarks();
                return result;
            },
        };
    }

    /**
     * Start all routines
     */
    public start(): boolean {
        for (let index = 0; index < this.routinesDescription.length; index++) {
            const currentRoutine = this.routinesDescription[index];
            this.helpVariables.landmarkName = currentRoutine.landmark;
            this.helpVariables.accessed_curves = currentRoutine.accessed_curves;
            for (
                let position = 0;
                position < currentRoutine.routines.length;
                position++
            ) {
                const element = currentRoutine.routines[position];
                this.preFunctions[element[0]](
                    element[1],
                    element[2],
                    element[3]
                );
            }
        }
        return true;
    }
}

export default SemiautomaticLandmarks;
