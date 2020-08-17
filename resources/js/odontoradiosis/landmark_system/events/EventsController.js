class EventsOdontoradiosis {
    /**
     * Constructor
     * @param {MainController} mainController
     * @param {ImageEffects} imageEffects
     */
    constructor(mainController, imageEffects) {
        this.mainController = mainController;
        this.imageEffects = imageEffects;
        this.isMouseDown = false;
        this.isInsideBox = false;
        this.isOnBoxVertex = { isOn: false, index: 0 };
        this.isOnCurvePoints = null;
        this.mousePosition = { x: null, y: null };

        document
            .getElementById("stack-canvas")
            .setAttribute("onmousedown", "bezier_coordinate(event)");
        document
            .getElementById("stack-canvas")
            .setAttribute("onmousemove", "bezier_functions(event)");
    }

    /**
     * Adds all effects events
     */
    addEffectsEvent() {
        let elements = ["contrast", "brightness", "invert", "grayscale"];
        //document.getElementsByTagName('input');
        for (let i = 0; i < elements.length; i++) {
            document
                .getElementById(elements[i])
                .addEventListener("input", this.imageEffects.onChangeValue);
        }
    }

    addCanvasEvents() {
        let curveSelect = document.getElementById("curvesId");
        curveSelect.addEventListener("input", function() {
            const selectedIndex = document.getElementById("curvesId")
                .selectedIndex;
            const currentCurve = document.getElementById("curvesId").options[
                selectedIndex
            ].text;
            this.mainController.tracingController.drawCurveBox(currentCurve);
            this.mainController.tracingController.drawPointCircle(currentCurve);
            if (currentCurve !== "Selecione") {
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
            currentObject.isMouseDown = true;
        };
        document.onmouseup = function() {
            currentObject.isMouseDown = false;
            currentObject.isInsideBox = false;
            currentObject.isOnBoxVertex = { isOn: false, index: 0 };
            currentObject.isOnCurvePoints = null;

            currentObject.mousePosition.x = null;
            currentObject.mousePosition.y = null;
        };
    }

    /**
     * Apply all events functions
     */
    applyAllEvents() {
        this.addEffectsEvent();
        this.generateMouseEvents();
    }
}