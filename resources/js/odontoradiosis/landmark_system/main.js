const canvasOdontoradiosis = new CanvasOdontoradiosis(
    document.getElementById("stack-canvas")
);
const imageEffects = new ImageEffects(canvasOdontoradiosis);
const mainController = new MainController(
    {
        image: "",
        curves: curves_url,
        landmarks: landmarks_url,
        reference_images: reference_images_url
    },
    canvasOdontoradiosis
);

const eventsController = new EventsOdontoradiosis(mainController, imageEffects);

function openImage(path = "", id = -1) {
    mainController.tracingController.setBezierPoints([]);
    mainController.setUrl("image", path);
    canvasOdontoradiosis.openImage(path, null, id);
    imageEffects.reset();
}

window.onload = function() {
    eventsController.applyAllEvents();
};
