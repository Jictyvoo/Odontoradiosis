class EventsOdontoradiosis {
    /**
     * Constructor
     * @param {MainController} mainController
     * @param {OdontoradiosisKepper} infoKeeper
     * @param {ImageEffects} imageEffects
     */
    constructor(mainController, infoKeeper, imageEffects) {
        this.mainController = mainController;
        this.infoKeeper = infoKeeper;
        this.imageEffects = imageEffects;

        document.getElementById("stack-canvas").onmousedown = function(event) {
            mainController.manageMouseDown.call(mainController, event);
        };
        document.getElementById("stack-canvas").onmousemove = function(event) {
            mainController.manageMouseMove.call(mainController, event);
        };
        document.getElementById("pointsId").onselect = function() {
            mainController.referenceLandmarks.call(mainController);
        };
    }

    /**
     * Adds all effects events
     */
    addEffectsEvent() {
        let elements = ["contrast", "brightness", "invert", "grayscale"];
        //document.getElementsByTagName('input');
        const selfImageEffects = this.imageEffects;
        for (let i = 0; i < elements.length; i++) {
            document
                .getElementById(elements[i])
                .addEventListener("input", function() {
                    selfImageEffects.onChangeValue.call(selfImageEffects);
                });
        }
        document.getElementById("undone-effects").onclick = function() {
            selfImageEffects.reset.call(selfImageEffects);
        };
    }

    /**
     * Add canvas events
     */
    addCanvasEvents() {
        let curveSelect = document.getElementById("curvesId");
        const tracingController = this.mainController.tracingController;
        curveSelect.addEventListener("input", function() {
            const selectedIndex = document.getElementById("curvesId")
                .selectedIndex;
            let currentSelection = document.getElementById("curvesId").options[
                selectedIndex
            ].text;
            tracingController.drawAllCurves();
            if (currentSelection !== "Selecione") {
                const currentCurve = currentSelection
                    .replace(/ /g, "-")
                    .toLowerCase();
                tracingController.drawCurveBox.call(
                    tracingController,
                    currentCurve,
                    true
                );
                tracingController.drawPointCircle.call(
                    tracingController,
                    currentCurve
                );
                document.getElementById("stack-canvas").style.cursor = "move";
            } else {
                document.getElementById("stack-canvas").style.cursor =
                    "crosshair";
            }
        });
    }

    /**
     * Add onmousedown and onmouseup events
     */
    generateMouseEvents() {
        const currentObject = this;
        const odontoradiosisKeeper = this.infoKeeper;
        document.onmousedown = function() {
            let hiddenForm = document.getElementById("current_image");
            const splicedSource = currentObject.mainController
                .getUrl("image")
                .split("/");
            hiddenForm.setAttribute(
                "value",
                splicedSource[splicedSource.length - 2] +
                    "/" +
                    splicedSource[splicedSource.length - 1]
            );
            odontoradiosisKeeper.isMouseDown = true;
        };
        document.onmouseup = function() {
            odontoradiosisKeeper.isMouseDown = false;
            odontoradiosisKeeper.isInsideBox = false;
            odontoradiosisKeeper.isOnBoxVertex = { isOn: false, index: 0 };
            odontoradiosisKeeper.isOnCurvePoints = null;

            odontoradiosisKeeper.mousePosition.x = null;
            odontoradiosisKeeper.mousePosition.y = null;
        };
    }

    /**
     * Apply all events functions
     */
    applyAllEvents() {
        this.addEffectsEvent();
        this.addCanvasEvents();
        this.generateMouseEvents();
    }
}
