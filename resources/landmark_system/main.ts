import { default as OdontoradiosisKeeper } from "./models/OdontoradiosisKeeper.ts";
import { default as ScaleManager } from "./util/ScaleManager.ts";
import { default as CanvasOdontoradiosis } from "./views/Canvas.ts";
import { default as AnatomicalTracing } from "./views/AnatomicalTracing.ts";
import { default as ImageEffects } from "./controllers/ImageEffects.ts";
import { default as TracingController } from "./controllers/subcontrollers/TracingController.ts";
import { default as LandmarksController } from "./controllers/subcontrollers/LandmarksController.ts";
import { default as MainController } from "./controllers/MainController.ts";
import { default as EventsOdontoradiosis } from "./events/EventsController.ts";
import { default as SemiautomaticLandmarks } from "./features/semiautomatic_landmark/init.ts";

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
    curves: "/public/js/bezier_curves.json",
    landmarks: "landmarks_url(temporary by file loaded)",
    reference_images: "reference_images_url",
  },
  canvasOdontoradiosis,
  scaleManager,
  infoKeeper
);

/**
 * Adding the semiautomatic landmark indentification feature
 */
/*import { default as a__json } from "./features/semiautomatic_landmark/routines/a.ldmk.json";
import { default as ena__json } from "./features/semiautomatic_landmark/routines/ena.ldmk.json";
import { default as gnatio__json } from "./features/semiautomatic_landmark/routines/gnatio.ldmk.json";
import { default as nasio__json } from "./features/semiautomatic_landmark/routines/nasio.ldmk.json";
import { default as sela__json } from "./features/semiautomatic_landmark/routines/sela.ldmk.json";
const semiautomaticLandmarks = new SemiautomaticLandmarks(
  [a__json, ena__json, gnatio__json, nasio__json, sela__json],
  mainController.tracingController,
  mainController.landmarksController
);*/

const eventsController = new EventsOdontoradiosis(
  mainController,
  infoKeeper,
  imageEffects
);

function openImage(path = "", id = -1) {
  mainController.tracingController.setBezierPoints([]);
  mainController.setUrl("image", path);
  canvasOdontoradiosis.openImage(path, function() {
    mainController.loadJsonCurve(id);
    mainController.loadJsonLandmarks(id);
  });
  imageEffects.reset();
}

window.onload = function() {
  eventsController.applyAllEvents();
  //semiautomaticLandmarks.generateButtonEvent();
};
