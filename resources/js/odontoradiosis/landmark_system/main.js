let canvasOdontoradiosis = new CanvasOdontoradiosis(
    document.getElementById("stack-canvas")
);
let imageEffects = new ImageEffects(canvasOdontoradiosis);
let mainController = new MainController(
    {
        curves: curves_url,
        landmarks: landmarks_url,
        reference_images: reference_images_url
    },
    canvasOdontoradiosis
);

const eventsController = new EventsOdontoradiosis(
    mainController.tracingController,
    imageEffects
);

function image(path, id) {
    global_points = [];
    global_effects = [];
    canvasOdontoradiosis.openImage(path, null, id);
    imageEffects.reset();
}

window.onload = function() {
    eventsController.applyAllEvents();
};
