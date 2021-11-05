import { default as ImageEffects } from '../controllers/imageEffects';
import { default as MainController } from '../controllers/mainController';
import { default as OdontoradiosisKeeper } from '../models/odontoradiosisKeeper';

class EventsOdontoradiosis {
    public mainController: MainController;
    public infoKeeper: OdontoradiosisKeeper;
    public imageEffects: ImageEffects;

    /**
     * Constructor
     * @param {MainController} mainController
     * @param {OdontoradiosisKeeper} infoKeeper
     * @param {ImageEffects} imageEffects
     */
    constructor(
        mainController: MainController,
        infoKeeper: OdontoradiosisKeeper,
        imageEffects: ImageEffects
    ) {
        this.mainController = mainController;
        this.infoKeeper = infoKeeper;
        this.imageEffects = imageEffects;

        const stackCanvasElement = document.getElementById(
            'stack-canvas'
        ) as HTMLElement;

        stackCanvasElement.onmousedown = function (event: MouseEvent) {
            mainController.manageMouseDown.call(mainController, event);
        };
        stackCanvasElement.onmousemove = function (event: MouseEvent) {
            mainController.manageMouseMove.call(mainController, event);
        };
    }

    /**
     * Add onmousedown and onmouseup events
     */
    generateMouseEvents(): void {
        const currentObject = this;
        const odontoradiosisKeeper = this.infoKeeper;
        document.onmousedown = function () {
            const hiddenForm = document.getElementById(
                'current_image'
            ) as HTMLInputElement;
            const splicedSource = currentObject.mainController
                .getUrl('image')
                .split('/');
            hiddenForm.setAttribute(
                'value',
                splicedSource[splicedSource.length - 2] +
                    '/' +
                    splicedSource[splicedSource.length - 1]
            );
            odontoradiosisKeeper.isMouseDown = true;
        };
        document.onmouseup = function () {
            odontoradiosisKeeper.isMouseDown = false;
            odontoradiosisKeeper.isInsideBox = false;
            odontoradiosisKeeper.isOnBoxVertex = { isOn: false, index: 0 };
            odontoradiosisKeeper.isOnCurvePoints = null;

            /*odontoradiosisKeeper.mousePosition.x = null;
            odontoradiosisKeeper.mousePosition.y = null;*/
            odontoradiosisKeeper.mousePosition.disabled = true;
        };
    }

    /**
     * Apply all events functions
     */
    applyAllEvents(): void {
        this.generateMouseEvents();
    }
}

export default EventsOdontoradiosis;
