import { default as TracingController } from '../../controllers/subcontrollers/TracingController';
import { default as LandmarksController } from '../../controllers/subcontrollers/LandmarksController';
import {
	IRoutineHelpVar,
	IRoutinesSemiautomatic,
} from '../../models/Interfaces.js';

class SemiautomaticLandmarks {
	public routinesDescription: IRoutinesSemiautomatic[];
	public tracingController: TracingController;
	public landmarksController: LandmarksController;
	public symbolTable: Record<string, unknown>;
	public helpVariables: IRoutineHelpVar;
	public preFunctions: { [key: string]: any };

	/**
	 *
	 * @param {array} routinesDescription Have all json data informing all routines
	 * @param {TracingController} tracingController
	 * @param {LandmarksController} landmarksController
	 */
	constructor(
		routinesDescription: any[],
		tracingController: TracingController,
		landmarksController: LandmarksController
	) {
		this.routinesDescription = routinesDescription;
		this.tracingController = tracingController;
		this.landmarksController = landmarksController;
		const symbolTable = {};
		const helpVariables = { accessed_curves: [], landmarkName: '' };
		this.symbolTable = symbolTable;
		this.helpVariables = helpVariables;
		const getParamValue = function(parameter: string) {
			return symbolTable[parameter] != null
				? symbolTable[parameter]
				: parameter;
		};
		this.preFunctions = {
			load_curve: function(
				firstParam: string | undefined,
				secondParam: string | null | undefined,
				resultName: string
			) {
				const loadedCurves = [tracingController.getCurve(firstParam)];
				if (secondParam != null) {
					loadedCurves.push(tracingController.getCurve(secondParam));
					symbolTable[resultName + '_1'] = loadedCurves[0];
					symbolTable[resultName + '_2'] = loadedCurves[1];
				} else {
					symbolTable[resultName] = loadedCurves[0];
				}
				return loadedCurves;
			},
			access_point: function(
				firstParam: number,
				secondParam: string | number,
				resultName: string | number
			) {
				const accessed = { x: 0, y: 0 };
				let counter = 0;
				for (let index = 0; index < symbolTable[secondParam].length; index++) {
					const element = symbolTable[secondParam][index];
					for (let subindex = 1; subindex < element.length; subindex += 2) {
						counter++;
						if (counter == firstParam) {
							accessed.x = element[subindex - 1];
							accessed.y = element[subindex];
						}
					}
				}
				symbolTable[resultName] = accessed;
				return accessed;
			},
			point_to_var: function(
				firstParam: string | number,
				secondParam: any,
				resultName: { [x: string]: string | number }
			) {
				const toVar = symbolTable[firstParam];
				symbolTable[resultName['x']] = toVar.x;
				symbolTable[resultName['y']] = toVar.y;
			},
			add: function(
				firstParam: string,
				secondParam: string,
				resultName: string | number
			) {
				const value_1 = getParamValue(firstParam);
				const value_2 = getParamValue(secondParam);
				symbolTable[resultName] = value_1 + value_2;
				return symbolTable[resultName];
			},
			sub: function(
				firstParam: string,
				secondParam: string,
				resultName: string | number
			) {
				const value_1 = getParamValue(firstParam);
				const value_2 = getParamValue(secondParam);
				symbolTable[resultName] = value_1 - value_2;
				return symbolTable[resultName];
			},
			div: function(
				firstParam: string,
				secondParam: string,
				resultName: string | number
			) {
				const value_1 = getParamValue(firstParam);
				const value_2 = getParamValue(secondParam);
				symbolTable[resultName] = value_1 / value_2;
				return symbolTable[resultName];
			},
			mul: function(
				firstParam: string,
				secondParam: string,
				resultName: string | number
			) {
				const value_1 = getParamValue(firstParam);
				const value_2 = getParamValue(secondParam);
				symbolTable[resultName] = value_1 * value_2;
				return symbolTable[resultName];
			},
			mod: function(
				firstParam: string,
				secondParam: string,
				resultName: string | number
			) {
				const value_1 = getParamValue(firstParam);
				const value_2 = getParamValue(secondParam);
				symbolTable[resultName] = value_1 % value_2;
				return symbolTable[resultName];
			},
			average: function(
				firstParam: string | any[],
				secondParam: any,
				resultName: string | number
			) {
				let average = 0;
				const total = firstParam.length;
				for (let index = 0; index < firstParam.length; index++) {
					average += firstParam[index];
				}
				symbolTable[resultName] = average / total;
				return symbolTable[resultName];
			},
			return: function(
				firstParam: string | number,
				secondParam: string | number,
				resultName: any
			) {
				const result = {
					X: symbolTable[firstParam],
					Y: symbolTable[secondParam],
				};
				landmarksController.setLandmark(helpVariables.landmarkName, result);
				landmarksController.redrawLandmarks();
				return result;
			},
		};
	}

	generateButtonEvent(): void {
		const self = this;
		const semiautomaticButton = document.getElementById(
			'semiautomatic_button'
		) as HTMLButtonElement;
		if (semiautomaticButton) {
			semiautomaticButton.onclick = function() {
				self.start.call(self);
			};
		}
	}

	/**
	 * Start all routines
	 */
	start(): boolean {
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
				this.preFunctions[element[0]](element[1], element[2], element[3]);
			}
		}
		return true;
	}
}

export default SemiautomaticLandmarks;
