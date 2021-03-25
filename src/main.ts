import Vue from 'vue';
import App from './App.vue';
import router from './router';

import { default as OdontoradiosisKeeper } from './scripts/landmark_system/models/OdontoradiosisKeeper';
import { default as ScaleManager } from './scripts/landmark_system/util/ScaleManager';
import { default as CanvasOdontoradiosis } from './scripts/landmark_system/views/Canvas';
import { default as ImageEffects } from './scripts/landmark_system/controllers/ImageEffects';
import { default as MainController } from './scripts/landmark_system/controllers/MainController';
import { default as EventsOdontoradiosis } from './scripts/landmark_system/events/EventsController';
import { default as SemiautomaticLandmarks } from './scripts/landmark_system/features/semiautomatic_landmark/init';

Vue.config.productionTip = false;

new Vue({
	router,
	render: (h) => h(App),
}).$mount('#odontoradiosis-app');

const scaleManager = new ScaleManager();
const canvasOdontoradiosis = new CanvasOdontoradiosis(
	document.getElementById('stack-canvas') as HTMLElement,
	scaleManager,
	{ image: 0, bezier: 1, landmarks: 2 }
);
const imageEffects = new ImageEffects(canvasOdontoradiosis);
const infoKeeper = new OdontoradiosisKeeper();
const mainController = new MainController(
	{
		image: '',
		curves: '/public/js/bezier_curves.json',
		landmarks: 'landmarks_url(temporary by file loaded)',
		referenceImages: 'reference_images_url',
	},
	canvasOdontoradiosis,
	scaleManager,
	infoKeeper
);

/**
 * Adding the semiautomatic landmark indentification feature
 */
import { default as aJson } from './scripts/landmark_system/features/semiautomatic_landmark/routines/a.ldmk.json';
import { default as enaJson } from './scripts/landmark_system/features/semiautomatic_landmark/routines/ena.ldmk.json';
import { default as gnatioJson } from './scripts/landmark_system/features/semiautomatic_landmark/routines/gnatio.ldmk.json';
import { default as nasioJson } from './scripts/landmark_system/features/semiautomatic_landmark/routines/nasio.ldmk.json';
import { default as selaJson } from './scripts/landmark_system/features/semiautomatic_landmark/routines/sela.ldmk.json';
const semiautomaticLandmarks = new SemiautomaticLandmarks(
	[aJson, enaJson, gnatioJson, nasioJson, selaJson],
	mainController.tracingController,
	mainController.landmarksController
);

const eventsController = new EventsOdontoradiosis(
	mainController,
	infoKeeper,
	imageEffects
);

function openImage(path = '', id = -1): void {
	mainController.tracingController.setBezierPoints();
	mainController.setUrl('image', path);
	canvasOdontoradiosis.openImage(path, function() {
		mainController.loadJsonCurve(id);
		mainController.loadJsonLandmarks(id);
	});
	imageEffects.reset();
}

window.onload = function() {
	eventsController.applyAllEvents();
	semiautomaticLandmarks.generateButtonEvent();
};
