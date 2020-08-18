const scaleManager = new ScaleManager();
const canvasOdontoradiosis = new CanvasOdontoradiosis(
    document.getElementById("stack-canvas"),
    scaleManager,
    { image: 0, bezier: 1, landmarks: 2 }
);
const imageEffects = new ImageEffects(canvasOdontoradiosis);
const infoKeeper = new OdontoradiosisKeeper();
const mainController = new MainController(
    {
        image: "",
        curves: curves_url,
        landmarks: landmarks_url,
        reference_images: reference_images_url
    },
    canvasOdontoradiosis,
    scaleManager,
    infoKeeper
);

const eventsController = new EventsOdontoradiosis(
    mainController,
    infoKeeper,
    imageEffects
);

function openImage(path = "", id = -1) {
    mainController.tracingController.setBezierPoints([]);
    mainController.setUrl("image", path);
    canvasOdontoradiosis.openImage(
        path,
        function() {
            mainController.loadJsonCurve(id);
            mainController.loadJsonLandmarks(id);
        },
        id
    );
    imageEffects.reset();
}

window.onload = function() {
    eventsController.applyAllEvents();
};
