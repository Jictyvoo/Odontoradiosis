class SemiautomaticLandmarks {
  public routinesDescription: any;
  public tracingController: any;
  public landmarksController: any;
  public symbolTable: any;
  public helpVariables: any;
  public preFunctions: any;

  /**
     *
     * @param {array} routinesDescription Have all json data informing all routines
     * @param {TracingController} tracingController
     * @param {LandmarksController} landmarksController
     */
  constructor(routinesDescription, tracingController, landmarksController) {
    this.routinesDescription = routinesDescription;
    this.tracingController = tracingController;
    this.landmarksController = landmarksController;
    const symbolTable = [];
    const helpVariables = { accessed_curves: [], landmarkName: "" };
    this.symbolTable = symbolTable;
    this.helpVariables = helpVariables;
    const getParamValue = function (parameter) {
      return symbolTable[parameter] != null
        ? symbolTable[parameter]
        : parameter;
    };
    this.preFunctions = {
      load_curve: function (param_1, param_2, resultName) {
        const loadedCurves = [tracingController.getCurve(param_1)];
        if (param_2 != null) {
          loadedCurves.push(tracingController.getCurve(param_2));
          symbolTable[resultName + "_1"] = loadedCurves[0];
          symbolTable[resultName + "_2"] = loadedCurves[1];
        } else {
          symbolTable[resultName] = loadedCurves[0];
        }
        return loadedCurves;
      },
      access_point: function (param_1, param_2, resultName) {
        const accessed = { x: 0, y: 0 };
        let counter = 0;
        for (
          let index = 0;
          index < symbolTable[param_2].length;
          index++
        ) {
          const element = symbolTable[param_2][index];
          for (
            let subindex = 1;
            subindex < element.length;
            subindex += 2
          ) {
            counter++;
            if (counter == param_1) {
              accessed.x = element[subindex - 1];
              accessed.y = element[subindex];
            }
          }
        }
        symbolTable[resultName] = accessed;
        return accessed;
      },
      point_to_var: function (param_1, param_2, resultName) {
        const toVar = symbolTable[param_1];
        symbolTable[resultName["x"]] = toVar.x;
        symbolTable[resultName["y"]] = toVar.y;
      },
      add: function (param_1, param_2, resultName) {
        const value_1 = getParamValue(param_1);
        const value_2 = getParamValue(param_2);
        symbolTable[resultName] = value_1 + value_2;
        return symbolTable[resultName];
      },
      sub: function (param_1, param_2, resultName) {
        const value_1 = getParamValue(param_1);
        const value_2 = getParamValue(param_2);
        symbolTable[resultName] = value_1 - value_2;
        return symbolTable[resultName];
      },
      div: function (param_1, param_2, resultName) {
        const value_1 = getParamValue(param_1);
        const value_2 = getParamValue(param_2);
        symbolTable[resultName] = value_1 / value_2;
        return symbolTable[resultName];
      },
      mul: function (param_1, param_2, resultName) {
        const value_1 = getParamValue(param_1);
        const value_2 = getParamValue(param_2);
        symbolTable[resultName] = value_1 * value_2;
        return symbolTable[resultName];
      },
      mod: function (param_1, param_2, resultName) {
        const value_1 = getParamValue(param_1);
        const value_2 = getParamValue(param_2);
        symbolTable[resultName] = value_1 % value_2;
        return symbolTable[resultName];
      },
      average: function (param_1, param_2, resultName) {
        let average = 0;
        const total = param_1.length;
        for (let index = 0; index < param_1.length; index++) {
          average += param_1[index];
        }
        symbolTable[resultName] = average / total;
        return symbolTable[resultName];
      },
      return: function (param_1, param_2, resultName) {
        const result = {
          X: symbolTable[param_1],
          Y: symbolTable[param_2],
        };
        landmarksController.setLandmark(
          helpVariables.landmarkName,
          result,
        );
        landmarksController.redrawLandmarks();
        return result;
      },
    };
  }

  generateButtonEvent() {
    const self = this;
    document.getElementById("semiautomatic_button").onclick = function () {
      self.start.call(self);
    };
  }

  /**
     * Start all routines
     */
  start() {
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
          element[3],
        );
      }
    }
    return true;
  }
}
