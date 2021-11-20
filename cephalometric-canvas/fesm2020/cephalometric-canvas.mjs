import * as i0 from '@angular/core';
import { Injectable, Component, ViewChild, NgModule } from '@angular/core';

class OdontoradiosisKeeper {
    constructor() {
        this.isMouseDown = false;
        this.isInsideBox = false;
        this.isOnBoxVertex = { isOn: false, index: 0 };
        this.isOnCurvePoints = null;
        this.mousePosition = { x: 0, y: 0, disabled: true };
        this.isCurveFunction = false;
        this.selectedOptions = { curve: '', landmark: '' };
    }
}
OdontoradiosisKeeper.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: OdontoradiosisKeeper, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
OdontoradiosisKeeper.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: OdontoradiosisKeeper, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: OdontoradiosisKeeper, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return []; } });

class ScaleManager {
    constructor() {
        this.pointRadius = 4;
        this.lineWidth = 1;
        this.nameScale = 10;
        this.textRelativePosition = { x: 15, y: 15 };
        this.scaleDrawValue = Object.freeze({
            pointRadius: 4,
            nameScale: 10,
            lineWidth: 2,
            textRelativePosition: Object.freeze({ x: 15, y: 15 }),
        });
    }
    /**
     * Calculate the scale to make canvas dynamic and returns it
     * @param {number} valueToResize
     * @param {boolean} isX
     * @param {CanvasRenderingContext2D} clientRect
     * @param {ClientRect} clientRect
     */
    dynamicCanvasScale(valueToResize = 1, isX = false, context, clientRect) {
        const canvasDimensions = {
            width: clientRect.width,
            height: clientRect.height,
        };
        const imageDimensions = {
            width: context.canvas.width,
            height: context.canvas.height,
        };
        if (isX) {
            return ((imageDimensions.width * valueToResize) / canvasDimensions.width);
        }
        else {
            return ((imageDimensions.height * valueToResize) /
                canvasDimensions.height);
        }
    }
    /**
     * Calculates all scales variables
     * @param {HTMLCanvasElement} canvas
     */
    calculateScales(canvas) {
        const rect = canvas.getBoundingClientRect();
        const context = canvas.getContext('2d');
        const imageDimensions = {
            width: context.canvas.width,
            height: context.canvas.height,
        };
        const isX = imageDimensions.width > imageDimensions.height;
        this.pointRadius = this.dynamicCanvasScale(this.scaleDrawValue.pointRadius, isX, context, rect);
        this.nameScale = this.dynamicCanvasScale(this.scaleDrawValue.nameScale, isX, context, rect);
        this.lineWidth = this.dynamicCanvasScale(this.scaleDrawValue.lineWidth, isX, context, rect);
        this.textRelativePosition.x = this.dynamicCanvasScale(this.scaleDrawValue.textRelativePosition.x, isX, context, rect);
        this.textRelativePosition.y = this.dynamicCanvasScale(this.scaleDrawValue.textRelativePosition.y, isX, context, rect);
    }
    /**
     * Returns an object containing the relative mouse position in Canvas
     * @param {HTMLElement} canvas
     * @param {Event} point
     */
    getMousePos(canvas, point) {
        const rect = canvas.getBoundingClientRect();
        const context = canvas.getContext('2d');
        return {
            x: this.dynamicCanvasScale(point.x - rect.left, true, context, rect),
            y: this.dynamicCanvasScale(point.y - rect.top, false, context, rect),
        };
    }
}
ScaleManager.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: ScaleManager, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
ScaleManager.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: ScaleManager, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: ScaleManager, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return []; } });

class UsefulMethods {
    /**
     * Returns canvas style, based on parameters
     * @param {number} zIndex
     * @param {string} position
     * @param {number} left
     * @param {number} top
     */
    static canvasStyle(zIndex = 0, position = 'absolute', left = 0, top = 0) {
        return `position: ${position}; left: ${left}; top: ${top}; z-index: ${zIndex};`;
    }
    /**
     * Normalize name
     * @param {string} toNormalize
     * @returns {string}
     */
    static normalizeTracingName(toNormalize) {
        return toNormalize.replace(/ /g, '-').toLowerCase();
    }
    /**
     * Return scale to angle
     * @param {object} oldPosition
     * @param {object} currentPosition
     */
    static highLowAngle(oldPosition, currentPosition) {
        const maxX = Math.abs(oldPosition.x - currentPosition.x), maxY = Math.abs(oldPosition.y - currentPosition.y);
        if (Math.max(maxX, maxY) === maxX) {
            return oldPosition.x > currentPosition.x ? -1 : 1;
        }
        return oldPosition.y > currentPosition.y ? -1 : 1;
    }
    /**
     * Subtract the origin from points
     * @param {object} pointA
     * @param {object} pointB
     * @param {object} origin
     */
    static normalizeValues(pointA, pointB, origin) {
        const normalized = [
            { x: pointA.x, y: pointA.y },
            { x: pointB.x, y: pointB.y },
        ];
        normalized[0].x -= origin.x;
        normalized[0].y -= origin.y;
        normalized[1].x -= origin.x;
        normalized[1].y -= origin.y;
        return normalized;
    }
    /**
     * Calculate angle between two points
     * @param {object} pointA
     * @param {object} pointB
     */
    static calculateAngle(pointA, pointB) {
        const productModule = {
            first: Math.sqrt(Math.pow(pointA.x, 2) + Math.pow(pointA.y, 2)),
            second: Math.sqrt(Math.pow(pointB.x, 2) + Math.pow(pointB.y, 2)),
        };
        const scaleProduct = Math.abs(pointA.x * pointB.x + pointA.y * pointB.y);
        return Math.acos(scaleProduct / (productModule.first * productModule.second));
    }
}

const defaultValues = Object.freeze({
    brightness: 100,
    contrast: 100,
    grayscale: 0,
    invert: 0,
});
class ImageEffects {
    /**
     *
     * @param {ICanvasDraw} canvas
     */
    constructor(canvas) {
        this.brightness = defaultValues.brightness;
        this.contrast = defaultValues.contrast;
        this.grayscale = defaultValues.grayscale;
        this.invert = defaultValues.invert;
        this.canvasManager = canvas;
    }
    static get defaultValues() {
        return defaultValues;
    }
    /**
     * Returns css style values
     * @returns {string}
     */
    getValues() {
        const filterStyle = `brightness(${this.brightness}%) contrast(${this.contrast}%) grayscale(${this.grayscale}%) invert(${this.invert}%)`;
        return filterStyle;
    }
    /**
     * Event function that apply read and apply effects on image
     */
    updateFilterValues() {
        const filterValue = this.getValues();
        this.canvasManager.setStyle('image', 'filter', filterValue);
    }
    /**
     * Reset all effects
     */
    reset() {
        this.brightness = 100;
        this.contrast = 100;
        this.grayscale = 0;
        this.invert = 0;
        this.updateFilterValues();
    }
}

class LocalRepositoryImpl {
    constructor() {
        this.storage = window.localStorage;
    }
    get(key) {
        const value = this.storage.getItem(key);
        if (value === null) {
            return null;
        }
        return JSON.parse(value);
    }
    set(key, value) {
        this.storage.setItem(key, JSON.stringify(value));
    }
    remove(key) {
        this.storage.removeItem(key);
    }
}
LocalRepositoryImpl.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: LocalRepositoryImpl, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
LocalRepositoryImpl.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: LocalRepositoryImpl, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: LocalRepositoryImpl, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return []; } });

class LandmarksController {
    /**
     *
     * @param {ICanvasDraw} canvasOdontoradiosis
     */
    constructor(canvasOdontoradiosis) {
        this.landmarks = {};
        this.canvas = canvasOdontoradiosis;
        this.localRepository = new LocalRepositoryImpl();
    }
    /**
     * @returns {ILandmarkArray} this.landmarks
     */
    getLandmarks() {
        return this.landmarks;
    }
    /**
     * Lardmarks setter
     * @param {ILandmarkArray} newLandmarks
     */
    setLandmarks(newLandmarks) {
        this.landmarks = newLandmarks;
    }
    /**
     * Set a single landmark value
     * @param {string} name
     * @param {ILandmark} value
     */
    setLandmark(name, value = { x: 0, y: 0 }) {
        this.landmarks[name] = value;
    }
    /**
     * Verify if landmark exists. If not and toCreate is true, it'll create
     * @param {string} name
     * @param {boolean} toCreate
     * @returns {ILandmark}
     */
    verifyLandmark(name, toCreate = false) {
        if (!this.landmarks[name] && toCreate) {
            this.landmarks[name] = { x: 0, y: 0 };
        }
        return this.landmarks[name];
    }
    /**
     * Save all landmarks in a hidden form
     */
    saveLandmarks() {
        const data_json = JSON.stringify(this.landmarks);
        this.localRepository.set('saved_points', data_json);
    }
    /**
     * Draw a landmark with its name
     * @param {CanvasRenderingContext2D} canvasContext
     * @param {string} landmarkName
     */
    drawLandmark(canvasContext, landmarkName) {
        const locations = this.landmarks[landmarkName];
        const context = canvasContext;
        const readyToShowName = landmarkName.match(/\(.+\)/);
        if (readyToShowName) {
            this.canvas.drawCircleCtx('landmarks', locations.x, locations.y, this.canvas.scales.pointRadius, 1, LandmarksController.color.fill, LandmarksController.color.stroke);
            context.beginPath();
            context.fillStyle = LandmarksController.color.fill;
            context.font = this.canvas.scales.nameScale + 'px Arial';
            context.fillText(readyToShowName.toString(), Math.floor(locations.x - this.canvas.scales.textRelativePosition.x), Math.floor(locations.y + this.canvas.scales.textRelativePosition.y));
            context.fill();
            context.lineWidth = 1;
            context.strokeStyle = LandmarksController.color.stroke;
            context.stroke();
        }
    }
    /**
     * Redraw all landmarks
     */
    redrawLandmarks() {
        const landmarksCanvas = this.canvas.getCanvas('landmarks');
        const context = landmarksCanvas.getContext('2d');
        context.clearRect(0, 0, landmarksCanvas.width, landmarksCanvas.height);
        const self = this;
        Object.keys(this.landmarks).forEach(function (element, _index, _array) {
            self.drawLandmark.call(self, context, element);
        });
    }
}
LandmarksController.color = Object.freeze({ fill: 'red', stroke: '#330005' });

class AnatomicalTracingImpl {
    /**
     * Constructor
     * @param {ICanvasDraw} canvas
     */
    constructor(canvas) {
        this.canvas = canvas;
        this.allCurves = {};
    }
    /**
     * Bezier curves setter
     * @param {IBezierCurves} curves
     */
    setAllCurves(curves) {
        this.allCurves = curves;
    }
    drawCurve(curvePoints) {
        for (let position = 0; position < curvePoints.length; position += 1) {
            const points = curvePoints[position];
            if (position === 0) {
                this.canvas.drawBezier(this.canvas.getContext('bezier'), points[0], points[1], points[2], points[3], points[4], points[5], points[6], points[7], AnatomicalTracingImpl.color.stroke);
            }
            else {
                const temporary = curvePoints[position - 1];
                this.canvas.drawBezier(this.canvas.getContext('bezier'), temporary[temporary.length - 2], temporary[temporary.length - 1], points[0], points[1], points[2], points[3], points[4], points[5], AnatomicalTracingImpl.color.stroke);
            }
        }
    }
    /**
     * Draw all curves
     */
    drawAllCurves() {
        this.canvas.clearCanvas('bezier');
        for (const entry of Object.entries(this.allCurves)) {
            const element = entry[1];
            this.drawCurve(element);
        }
    }
    /**
     * Draw all control points in a given curve
     * @param {string} curveName
     */
    drawPointCircle(curveName) {
        if (this.allCurves[curveName] != null) {
            const context = this.canvas.getContext('bezier');
            //context.beginPath();
            for (let index = 0; index < this.allCurves[curveName].length; index++) {
                const element = this.allCurves[curveName][index];
                for (let subindex = 1; subindex < element.length; subindex += 2) {
                    this.canvas.drawCircle(context, element[subindex - 1], element[subindex]);
                }
            }
        }
    }
    /**
     *
     * @param {CanvasRenderingContext2D} context
     * @param {array} boxDimensions
     */
    drawBoxVertex(context, boxDimensions) {
        const selfCanvas = this.canvas;
        [
            [boxDimensions[0], boxDimensions[1]],
            [boxDimensions[0], boxDimensions[1] + boxDimensions[3]],
            [boxDimensions[0] + boxDimensions[2], boxDimensions[1]],
            [
                boxDimensions[0] + boxDimensions[2],
                boxDimensions[1] + boxDimensions[3],
            ],
        ].forEach(function (element, _index, _array) {
            selfCanvas.drawCircle.call(selfCanvas, context, element[0], element[1]);
        });
    }
    /**
     *
     * @param {string} currentCurve
     * @param {array} boxDimensions
     */
    drawCurveBox(currentCurve, boxDimensions) {
        if (currentCurve != null) {
            const context = this.canvas.getContext('bezier');
            context.beginPath();
            context.lineWidth = this.canvas.scales.lineWidth;
            context.rect(boxDimensions[0], boxDimensions[1], boxDimensions[2], boxDimensions[3]);
            context.stroke();
            this.drawBoxVertex(context, boxDimensions);
        }
    }
}
AnatomicalTracingImpl.color = Object.freeze({ fill: 'green', stroke: '#00e379' });

var maxila = [
	[
		356,
		442,
		307,
		366,
		198,
		384,
		156,
		376
	],
	[
		219,
		366,
		309,
		367,
		397,
		379
	],
	[
		381,
		398,
		377,
		428,
		390,
		452
	]
];
var deafultBezierCurves = {
	"perfil-mole": [
	[
		417,
		115,
		373,
		236,
		463,
		310,
		478,
		337
	],
	[
		506,
		374,
		448,
		373,
		446,
		404
	],
	[
		437,
		439,
		490,
		462,
		454,
		481
	],
	[
		447,
		487,
		438,
		494,
		430,
		496
	],
	[
		446,
		505,
		449,
		522,
		443,
		530
	],
	[
		399,
		566,
		402,
		561,
		397,
		619
	],
	[
		351,
		726,
		273,
		638,
		185,
		654
	],
	[
		161,
		665,
		161,
		693,
		144,
		737
	]
],
	"sela-túrcica": [
	[
		68,
		232,
		80,
		231,
		94,
		231,
		109,
		228
	],
	[
		94,
		269,
		148,
		261,
		135,
		231
	],
	[
		138,
		220,
		154,
		213,
		165,
		204
	]
],
	"sutura-fronto-nasal": [
	[
		391,
		173,
		391,
		200,
		380,
		237,
		414,
		274
	],
	[
		383,
		232,
		367,
		225,
		348,
		215
	]
],
	"borda-póstero-inferior": [
	[
		317,
		185,
		250,
		265,
		318,
		316,
		356,
		293
	]
],
	"fissura-pterigomaxilar": [
	[
		132,
		395,
		123,
		244,
		193,
		287,
		134,
		392
	]
],
	"pório-anatômico": [
	[
		41,
		339,
		40,
		319,
		70,
		319,
		71,
		339
	],
	[
		71,
		359,
		42,
		359,
		41,
		339
	]
],
	maxila: maxila,
	"mandíbula": [
	[
		220,
		504,
		102,
		455,
		183,
		388,
		173,
		351
	],
	[
		131,
		328,
		152,
		392,
		106,
		369
	],
	[
		87,
		342,
		73,
		328,
		66,
		373
	],
	[
		76,
		453,
		30,
		522,
		313,
		638
	],
	[
		277,
		619,
		282,
		571,
		319,
		546
	],
	[
		373,
		571,
		363,
		629,
		336,
		662
	]
],
	"incisivo-central-superior": [
	[
		365,
		402,
		453,
		615,
		331,
		467,
		363,
		400
	]
],
	"incisivo-central-inferior": [
	[
		331,
		609,
		453,
		431,
		313,
		530,
		333,
		608
	]
],
	"dente-posterior-superior": [
	[
		246,
		410,
		229,
		470,
		213,
		478,
		254,
		484
	],
	[
		283,
		496,
		275,
		456,
		270,
		409
	],
	[
		265,
		449,
		250,
		455,
		248,
		411
	]
],
	"dente-posterior-inferior": [
	[
		210,
		558,
		214,
		485,
		230,
		464,
		243,
		491
	],
	[
		266,
		479,
		277,
		494,
		235,
		560
	],
	[
		254,
		522,
		216,
		517,
		213,
		557
	]
]
};

class TracingController {
    /**
     * Constructor
     * @param {ICanvasDraw} canvasOdontoradiosis
     */
    constructor(canvasOdontoradiosis) {
        this.canvasOdontoradiosis = canvasOdontoradiosis;
        // Create AnatomicalTracing and set this curvePoints
        this.anatomicalTracing = new AnatomicalTracingImpl(canvasOdontoradiosis);
        this.anatomicalTracing.setAllCurves(deafultBezierCurves);
        this.bezierPoints = deafultBezierCurves;
        this.currentBoxPoints = [0, 0, 0, 0];
        this.localRepository = new LocalRepositoryImpl();
    }
    /**
     * Bezier points setter
     * @param {IBezierCurves} points
     */
    setBezierPoints(points = deafultBezierCurves) {
        this.bezierPoints = points;
        this.anatomicalTracing.setAllCurves(points);
    }
    /**
     * Verify if curve exists
     * @param {string} curveId
     * @returns {boolean}
     */
    curveExists(curveId = '') {
        const allCurves = Object.keys(this.bezierPoints);
        return allCurves.includes(curveId);
    }
    /**
     * Verify if curve exists and returns it or null
     * @param {string} curveId
     */
    getCurve(curveId = '') {
        if (this.curveExists(curveId)) {
            return this.bezierPoints[curveId];
        }
        return null;
    }
    /**
     * Save all bezier curves in a hidden form
     */
    saveBezierCurve() {
        const curvesJson = JSON.stringify(this.bezierPoints);
        this.localRepository.set('bezier_curves', curvesJson);
    }
    /**
     * Returns all points in a curve box
     * @param {string} curveName
     * @param {boolean} recalculate
     */
    getBoxPoints(curveName, recalculate) {
        if (this.currentBoxPoints != null && !recalculate) {
            return this.currentBoxPoints;
        }
        let minX = Number.POSITIVE_INFINITY, minY = Number.POSITIVE_INFINITY;
        let maxX = Number.NEGATIVE_INFINITY, maxY = Number.NEGATIVE_INFINITY;
        for (let element of this.bezierPoints[curveName]) {
            for (let position = 0; position < element.length; position++) {
                const point = element[position];
                if (position % 2 !== 0) {
                    minY = Math.min(minY, point);
                    maxY = Math.max(maxY, point);
                }
                else {
                    minX = Math.min(minX, point);
                    maxX = Math.max(maxX, point);
                }
            }
        }
        this.currentBoxPoints = [minX, minY, maxX, maxY];
        return this.currentBoxPoints;
    }
    /**
     * Returns an array with box dimensions of a specific curve
     * @param {string} curveName
     * @param {number} borderSize
     * @param {boolean} recalculate
     */
    getBoxDimensions(curveName, borderSize = 20, recalculate = false) {
        const points = this.getBoxPoints(curveName, recalculate);
        const minPoint = {
            x: points[0],
            y: points[1],
        };
        const maxPoint = {
            x: points[2],
            y: points[3],
        };
        const width = maxPoint.x - minPoint.x, height = maxPoint.y - minPoint.y;
        return [
            minPoint.x - borderSize,
            minPoint.y - borderSize,
            width + borderSize * 2,
            height + borderSize * 2,
        ];
    }
    /**
     * Call AnatomicalTracing method to draw bezierCurves
     */
    drawAllCurves() {
        this.anatomicalTracing.drawAllCurves();
        this.saveBezierCurve();
    }
    /**
     * Draw Curve box
     * @param {string} currentCurve
     * @param {boolean} recalculate
     */
    drawCurveBox(currentCurve, recalculate) {
        this.anatomicalTracing.drawCurveBox(currentCurve, this.getBoxDimensions(currentCurve, 20, recalculate));
    }
    /**
     * Draw all control points in a given curve
     * @param {string} curveName
     */
    drawPointCircle(curveName) {
        this.anatomicalTracing.drawPointCircle(curveName);
    }
    /**
     * Returns a object containing a boolean if is on a boxVertex, and it index
     * @param {*} relativeMouse
     * @param {string} curveName
     * @returns {object} { isOn: isOn, index: vertexIndex }
     */
    verifyMouseOnBoxVertex(relativeMouse, curveName) {
        const boxVertex = this.getBoxDimensions(curveName, 20, true);
        let isOn = false;
        let vertexIndex = 0;
        const pointRadius = this.canvasOdontoradiosis.scales.pointRadius;
        [
            [boxVertex[0], boxVertex[1]],
            [boxVertex[0], boxVertex[1] + boxVertex[3]],
            [boxVertex[0] + boxVertex[2], boxVertex[1]],
            [boxVertex[0] + boxVertex[2], boxVertex[1] + boxVertex[3]],
        ].forEach(function (element, index, _array) {
            if (relativeMouse.x >= element[0] - pointRadius &&
                relativeMouse.x <= element[0] + pointRadius &&
                relativeMouse.y >= element[1] - pointRadius &&
                relativeMouse.y <= element[1] + pointRadius) {
                isOn = true;
                vertexIndex = index;
            }
        });
        return { isOn: isOn, index: vertexIndex };
    }
    /**
     * Returns the current position of the mouse if it is on a curve point
     * @param {IPointBidimensional} relativeMouse
     * @param {string} curveName
     * @returns {array} [element, subindex, subindex + 1]
     */
    verifyMouseOnCurvePoint(relativeMouse, curveName) {
        const pointRadius = this.canvasOdontoradiosis.scales.pointRadius;
        for (let index = 0; index < this.bezierPoints[curveName].length; index++) {
            const element = this.bezierPoints[curveName][index];
            for (let subindex = 0; subindex < element.length; subindex += 2) {
                if (relativeMouse.x >= element[subindex] - pointRadius &&
                    relativeMouse.x <= element[subindex] + pointRadius &&
                    relativeMouse.y >= element[subindex + 1] - pointRadius &&
                    relativeMouse.y <= element[subindex + 1] + pointRadius) {
                    return [element, subindex, subindex + 1];
                }
            }
        }
        return null;
    }
    /**
     * Iterate all curves and changes it value
     * @param {string} curveName
     * @param {function} callback_1
     * @param {funtion} callback_2
     * @param {boolean} _recalculate
     */
    runPointsAndChange(curveName, callback_1, callback_2, _recalculate = false) {
        if (this.bezierPoints[curveName] != null) {
            for (let points of this.bezierPoints[curveName]) {
                for (let position = 0; position < points.length; position++) {
                    if (position % 2 === 0) {
                        points[position] = callback_1(points[position], points[position + 1]);
                    }
                    else {
                        points[position] = callback_2(points[position], points[position - 1]);
                    }
                }
            }
            //this.anatomicalTracing.setAllCurves(this.bezierPoints);
        }
    }
    /**
     * Translate a curve
     * @param {string} curveName
     * @param {float} amountX
     * @param {float} amountY
     */
    translateBezier(curveName, amountX, amountY) {
        this.currentBoxPoints[0] -= amountX;
        this.currentBoxPoints[1] -= amountY;
        this.currentBoxPoints[2] -= amountX;
        this.currentBoxPoints[3] -= amountY;
        this.runPointsAndChange(curveName, function (pointX) {
            return pointX - amountX;
        }, function (pointY) {
            return pointY - amountY;
        }, true);
    }
    /**
     * Rotate a bezier curve
     * @param {string} curveName
     * @param {float} angle
     */
    rotateBezier(curveName, angle) {
        this.runPointsAndChange(curveName, function (pointX, pointY) {
            return pointX * Math.cos(angle) - pointY * Math.sin(angle);
        }, function (pointY, pointX) {
            return pointX * Math.sin(angle) + pointY * Math.cos(angle);
        }, true);
    }
    /**
     * Reescale all bezier curves, based on scales given
     * @param {string} curveName
     * @param {float} scaleX
     * @param {float} scaleY
     */
    rescaleBezier(curveName, scaleX, scaleY) {
        this.runPointsAndChange(curveName, function (pointX) {
            return pointX * scaleX;
        }, function (pointY) {
            return pointY * scaleY;
        }, true);
    }
}

class MainController {
    /**
     * Constructor
     * @param {ICanvasDraw} canvasOdontoradiosis
     * @param {ScaleManager} scaleManager
     * @param {OdontoradiosisKepper} infoKeeper
     */
    constructor(canvasOdontoradiosis, scaleManager, infoKeeper) {
        this.canvasOdontoradiosis = canvasOdontoradiosis;
        this.scaleManager = scaleManager;
        this.tracingController = new TracingController(canvasOdontoradiosis);
        this.landmarksController = new LandmarksController(canvasOdontoradiosis);
        this.infoKeeper = infoKeeper;
    }
    /**
     * Loads json file with landmarks location
     * @param {int} id image id
     */
    loadJsonLandmarks(jsonContent) {
        if (jsonContent.length > 0) {
            const decodedLandmarks = JSON.parse(jsonContent);
            const validLandmarks = {};
            for (const landmark of Object.entries(decodedLandmarks)) {
                const landmarkName = landmark[0];
                const landmarkPosition = landmark[1];
                if (typeof landmarkPosition == 'object') {
                    validLandmarks[landmarkName] = {
                        x: landmarkPosition?.x,
                        y: landmarkPosition?.y,
                    };
                }
            }
            this.landmarksController.setLandmarks(validLandmarks);
            this.landmarksController.redrawLandmarks();
        }
    }
    /**
     * Loads json file with bezier anatomical tracing points
     * @param {string} jsonContent image id
     */
    loadJsonCurve(jsonContent) {
        // Load JsonCurves from default json file
        this.tracingController.setBezierPoints();
        if (jsonContent.length > 0) {
            // Load from uploaded json file
            // TODO: implement
            this.tracingController.setBezierPoints(JSON.parse(jsonContent));
        }
        this.tracingController.drawAllCurves();
    }
    /**
     * Adapt reference landmarks
     */
    referenceLandmarks() {
        const currentLandmark = this.infoKeeper.selectedOptions.landmark;
        const imagePaths = {};
        imagePaths['Sela (S)'] = 'selaTurcica.png';
        imagePaths['Násio (N)'] = 'nasio.png';
        imagePaths['Espinha nasal anterior (ENA)'] = 'ENA.png';
        imagePaths['Espinha nasal posterior (ENP)'] = 'ENP.png';
        imagePaths['Ponto subespinhal (A)'] = 'A.png';
        imagePaths['Ponto pupramental (B)'] = 'B.png';
        imagePaths['Pogônio (Pog)'] = 'pogonio.png';
        imagePaths['Gnátio (Gn)'] = 'Gnatio.png';
        imagePaths['Mento (Me)'] = 'mento.png';
        imagePaths['Condílio (Co)'] = 'condilio.png';
        imagePaths['Pró-nasal (Pn)'] = 'proNasal.png';
        imagePaths['Pogônio Mole (Pg)'] = 'pogonioMole.png';
        imagePaths['Palato Mole (pm)'] = 'palatoMole.png';
        imagePaths['Gônio (Go)'] = '';
        imagePaths['Órbitário (Or)'] = '';
        imagePaths['Pório (Po)'] = '';
        imagePaths['Ponta do Nariz (PtN)'] = '';
        imagePaths['Fossa Ptérigo Maxilar (Fpm)'] = '';
        imagePaths['Pterigóide (Pt)'] = '';
        if (currentLandmark !== 'Selecione' && imagePaths[currentLandmark]) {
            const img = new Image();
            const referenceCanvas = document.getElementById('referenceLandmark');
            if (referenceCanvas.getContext) {
                const context = referenceCanvas.getContext('2d');
                img.onload = function () {
                    context.canvas.width = img.width; //maybe don't work
                    context.canvas.height = img.height;
                    const canvasReferenceElement = document.getElementById('canvas-reference');
                    canvasReferenceElement.setAttribute('style', 'height: ' +
                        context.canvas.height +
                        'px' +
                        'width: ' +
                        context.canvas.width +
                        'px');
                    context.drawImage(img, 0, 0, context.canvas.width, context.canvas.height); //draw background image
                    context.fillStyle = 'rgba(1, 1, 1, 0)'; //draw a box over the top
                };
            }
            /*img.src =
                this.urls['referenceImages'] + imagePaths[currentLandmark];*/
        }
    }
    /**
     * Change or set point location on current mouse position
     * @param {IPointBidimensional} point
     */
    markLandmarkPoint(landmarkName, point) {
        if (landmarkName.length > 0 && landmarkName !== 'Selecione') {
            const landmarkCanvas = this.canvasOdontoradiosis.getCanvas('landmarks');
            const currentLandmark = this.landmarksController.verifyLandmark(landmarkName, true);
            const currentMousePosition = this.scaleManager.getMousePos(landmarkCanvas, point);
            currentLandmark.x = currentMousePosition.x;
            currentLandmark.y = currentMousePosition.y;
            this.landmarksController.saveLandmarks();
            this.landmarksController.redrawLandmarks();
        }
    }
}

class SemiautomaticLandmarks {
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
        const symbolTable = {};
        const helpVariables = { accessed_curves: [], landmarkName: '' };
        this.symbolTable = symbolTable;
        this.helpVariables = helpVariables;
        const getParamValue = function (parameter) {
            return symbolTable[parameter] != null
                ? symbolTable[parameter]
                : parameter;
        };
        this.preFunctions = {
            load_curve: function (firstParam, secondParam, resultName) {
                const loadedCurves = [tracingController.getCurve(firstParam)];
                if (secondParam != null) {
                    loadedCurves.push(tracingController.getCurve(secondParam));
                    symbolTable[resultName + '_1'] = loadedCurves[0];
                    symbolTable[resultName + '_2'] = loadedCurves[1];
                }
                else {
                    symbolTable[resultName] = loadedCurves[0];
                }
                return loadedCurves;
            },
            access_point: function (firstParam, secondParam, resultName) {
                const accessed = { x: 0, y: 0 };
                let counter = 0;
                for (let index = 0; index < (symbolTable[secondParam]?.length ?? 0); index++) {
                    const element = symbolTable[secondParam] != null
                        ? symbolTable[secondParam][index] ?? ''
                        : '';
                    for (let subindex = 1; subindex < (element?.length ?? 0); subindex += 2) {
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
            point_to_var: function (firstParam, secondParam, resultName) {
                const toVar = symbolTable[firstParam];
                symbolTable[resultName['x']] = toVar.x;
                symbolTable[resultName['y']] = toVar.y;
            },
            add: function (firstParam, secondParam, resultName) {
                const value_1 = getParamValue(firstParam);
                const value_2 = getParamValue(secondParam);
                symbolTable[resultName] = value_1 + value_2;
                return symbolTable[resultName];
            },
            sub: function (firstParam, secondParam, resultName) {
                const value_1 = parseFloat(getParamValue(firstParam));
                const value_2 = parseFloat(getParamValue(secondParam));
                symbolTable[resultName] = value_1 - value_2;
                return symbolTable[resultName];
            },
            div: function (firstParam, secondParam, resultName) {
                const value_1 = parseFloat(getParamValue(firstParam));
                const value_2 = parseFloat(getParamValue(secondParam));
                symbolTable[resultName] = value_1 / value_2;
                return symbolTable[resultName];
            },
            mul: function (firstParam, secondParam, resultName) {
                const value_1 = parseFloat(getParamValue(firstParam));
                const value_2 = parseFloat(getParamValue(secondParam));
                symbolTable[resultName] = value_1 * value_2;
                return symbolTable[resultName];
            },
            mod: function (firstParam, secondParam, resultName) {
                const value_1 = parseFloat(getParamValue(firstParam));
                const value_2 = parseFloat(getParamValue(secondParam));
                symbolTable[resultName] = value_1 % value_2;
                return symbolTable[resultName];
            },
            average: function (firstParam, secondParam, resultName) {
                let average = 0;
                const total = firstParam.length;
                for (let index = 0; index < firstParam.length; index++) {
                    average += firstParam[index];
                }
                symbolTable[resultName] = average / total;
                return symbolTable[resultName];
            },
            return: function (firstParam, secondParam, resultName) {
                const result = {
                    x: parseFloat(symbolTable[firstParam]),
                    y: parseFloat(symbolTable[secondParam]),
                };
                landmarksController.setLandmark(helpVariables.landmarkName, result);
                landmarksController.redrawLandmarks();
                return result;
            },
        };
    }
    generateButtonEvent() {
        const self = this;
        const semiautomaticButton = document.getElementById('semiautomatic_button');
        if (semiautomaticButton) {
            semiautomaticButton.onclick = function () {
                self.start.call(self);
            };
        }
    }
    /**
     * Start all routines
     */
    start() {
        for (let index = 0; index < this.routinesDescription.length; index++) {
            const currentRoutine = this.routinesDescription[index];
            this.helpVariables.landmarkName = currentRoutine.landmark;
            this.helpVariables.accessed_curves = currentRoutine.accessed_curves;
            for (let position = 0; position < currentRoutine.routines.length; position++) {
                const element = currentRoutine.routines[position];
                this.preFunctions[element[0]](element[1], element[2], element[3]);
            }
        }
        return true;
    }
}

var landmark$4 = "Ponto subespinhal (A)";
var accessed_curves$4 = [
	"maxila"
];
var routines$4 = [
	[
		"load_curve",
		"maxila",
		null,
		"curvePoints"
	],
	[
		"access_point",
		8,
		"curvePoints",
		"foundedA"
	],
	[
		"point_to_var",
		"foundedA",
		null,
		{
			x: "x",
			y: "y"
		}
	],
	[
		"return",
		"x",
		"y",
		null
	]
];
var aJson = {
	landmark: landmark$4,
	accessed_curves: accessed_curves$4,
	routines: routines$4
};

var landmark$3 = "Espinha nasal anterior (ENA)";
var accessed_curves$3 = [
	"maxila"
];
var routines$3 = [
	[
		"load_curve",
		"maxila",
		null,
		"curvePoints"
	],
	[
		"access_point",
		7,
		"curvePoints",
		"foundedENA"
	],
	[
		"point_to_var",
		"foundedENA",
		null,
		{
			x: "x",
			y: "y"
		}
	],
	[
		"return",
		"x",
		"y",
		null
	]
];
var enaJson = {
	landmark: landmark$3,
	accessed_curves: accessed_curves$3,
	routines: routines$3
};

var landmark$2 = "Gnátio (Gn)";
var accessed_curves$2 = [
	"mandíbula"
];
var routines$2 = [
	[
		"load_curve",
		"mandíbula",
		null,
		"curvePoints"
	],
	[
		"access_point",
		8,
		"curvePoints",
		"foundedGnatio"
	],
	[
		"point_to_var",
		"foundedGnatio",
		null,
		{
			x: "x",
			y: "y"
		}
	],
	[
		"return",
		"x",
		"y",
		null
	]
];
var gnatioJson = {
	landmark: landmark$2,
	accessed_curves: accessed_curves$2,
	routines: routines$2
};

var landmark$1 = "Násio (N)";
var accessed_curves$1 = [
	"sutura-fronto-nasal"
];
var routines$1 = [
	[
		"load_curve",
		"sutura-fronto-nasal",
		null,
		"curvePoints"
	],
	[
		"access_point",
		1,
		"curvePoints",
		"foundedNasio"
	],
	[
		"point_to_var",
		"foundedNasio",
		null,
		{
			x: "x",
			y: "y"
		}
	],
	[
		"return",
		"x",
		"y",
		null
	]
];
var nasioJson = {
	landmark: landmark$1,
	accessed_curves: accessed_curves$1,
	routines: routines$1
};

var landmark = "Sela (S)";
var accessed_curves = [
	"sela-túrcica"
];
var routines = [
	[
		"load_curve",
		"sela-túrcica",
		null,
		"curvePoints"
	],
	[
		"access_point",
		4,
		"curvePoints",
		"p1"
	],
	[
		"access_point",
		5,
		"curvePoints",
		"p2"
	],
	[
		"access_point",
		6,
		"curvePoints",
		"p3"
	],
	[
		"access_point",
		7,
		"curvePoints",
		"p1"
	],
	[
		"average",
		[
			"p1",
			"p2",
			"p3",
			"p4"
		],
		null,
		"result"
	],
	[
		"point_to_var",
		"result",
		null,
		{
			x: "x",
			y: "y"
		}
	],
	[
		"return",
		"x",
		"y",
		null
	]
];
var selaJson = {
	landmark: landmark,
	accessed_curves: accessed_curves,
	routines: routines
};

class CanvasOdontoradiosisImpl {
    /**
     * Constructor
     * @param {HTMLElement} stackCanvas
     * @param {ScaleManager} scaleManager
     * @param {array} layerSequence
     */
    constructor(stackCanvas, scaleManager, layerSequence = {}) {
        this.stackCanvas = stackCanvas;
        this.layerSequence = layerSequence;
        this.existentCanvas = {};
        this.scaleManager = scaleManager;
    }
    addCanvasElement(canvasId, element) {
        this.existentCanvas[canvasId] = element;
        element.setAttribute('style', UsefulMethods.canvasStyle(this.layerSequence[canvasId] ?? -1));
    }
    get scales() {
        return this.scaleManager;
    }
    set canvasCursor(newCursor) {
        this.stackCanvas.style.cursor = newCursor;
    }
    /**
     * Returns a canvas based on it id
     * @param {string} id
     * @returns {HTMLCanvasElement}
     */
    getCanvas(id) {
        return this.existentCanvas[id];
    }
    /**
     * Returns a canvas context based on it id
     * @param {string} id
     * @returns {CanvasRenderingContext2D}
     */
    getContext(id) {
        return this.existentCanvas[id].getContext('2d');
    }
    /**
     * Apply a style to the canvas using UsefulMethods
     * @param {string} id
     * @param {string} styleName
     * @param {string} newStyle
     */
    setStyle(id, styleName, newStyle) {
        this.getCanvas(id).style.setProperty(styleName, newStyle);
    }
    /**
     * Clear canvas that have the id passed
     * @param {string} canvasId
     */
    clearCanvas(canvasId) {
        const canvas = this.getCanvas(canvasId);
        const context = canvas.getContext('2d');
        if (context) {
            /*context.clearRect(0, 0, canvas.width, canvas.height);*/
            const canvasWidth = context.canvas.width;
            context.canvas.width = canvasWidth;
        }
    }
    /**
     * Draw a circle in selected context with selected colors
     * @param {CanvasRenderingContext2D} context
     * @param {number} x
     * @param {number} y
     * @param {number} pointRadius
     * @param {number} lineWidth
     * @param {string} fillStyle
     * @param {string} strokeStyle
     */
    drawCircle(context, x = 0, y = 0, pointRadius = this.scaleManager.pointRadius, lineWidth = this.scaleManager.lineWidth, fillStyle = '#184bed', strokeStyle = '#184bed') {
        context.beginPath();
        context.arc(x, y, pointRadius, 0, 2 * Math.PI);
        context.fillStyle = fillStyle;
        context.fill();
        context.lineWidth = lineWidth;
        context.strokeStyle = strokeStyle;
        context.stroke();
    }
    /**
     * Draw a circle in selected curve with selected colors
     * @param {string} layerId
     * @param {number} x
     * @param {number} y
     * @param {number} pointRadius
     * @param {number} lineWidth
     * @param {string} fillStyle
     * @param {string} strokeStyle
     */
    drawCircleCtx(layerId, x = 0, y = 0, pointRadius = this.scaleManager.pointRadius, lineWidth = this.scaleManager.lineWidth, fillStyle = '#184bed', strokeStyle = '#184bed') {
        this.drawCircle(this.getContext(layerId), x, y, pointRadius, lineWidth, fillStyle, strokeStyle);
    }
    /**
     *
     * @param {CanvasRenderingContext2D} context
     * @param {number} x1
     * @param {number} y1
     * @param {number} cx1
     * @param {number} cy1
     * @param {number} cx2
     * @param {number} cy2
     * @param {number} x2
     * @param {number} y2
     * @param {string} strokeStyle
     */
    drawBezier(context, x1, y1, cx1, cy1, cx2, cy2, x2, y2, strokeStyle) {
        context.strokeStyle = strokeStyle;
        context.moveTo(x1, y1);
        context.bezierCurveTo(cx1, cy1, cx2, cy2, x2, y2);
        context.lineWidth = this.scaleManager.lineWidth;
        context.stroke();
    }
    /**
     * Opens a given image and reset canvas size
     * @param {string} imageData
     * @param {VoidFunction} loadFunction
     */
    openImage(imageData = '', loadFunction) {
        const imageObject = new Image();
        if (this.existentCanvas['image'].getContext('2d')) {
            const context = this.existentCanvas['image'].getContext('2d');
            const self = this;
            const selfScaleManager = this.scaleManager;
            //OnLoad Image here
            imageObject.onload = function () {
                context.canvas.width = imageObject.width; //this.width
                context.canvas.height = imageObject.height; //this.height
                ['landmarks', 'bezier'].forEach((element) => {
                    const temporaryContext = self.existentCanvas[element].getContext('2d');
                    temporaryContext.canvas.width = context.canvas.width;
                    temporaryContext.canvas.height = context.canvas.height;
                });
                const cardCanvas = document.getElementById('card-canvas');
                if (cardCanvas) {
                    cardCanvas.setAttribute('style', 'height: ' + context.canvas.height + 'px');
                }
                selfScaleManager.calculateScales.call(selfScaleManager, self.existentCanvas['landmarks']);
                context.drawImage(imageObject, 0, 0, context.canvas.width, context.canvas.height); //draw background image
                context.fillStyle = 'rgba(1, 1, 1, 0)'; //draw a box over the top
                if (loadFunction) {
                    loadFunction();
                }
            };
        }
        imageObject.src = imageData;
    }
}

class CephalometricCanvasService {
    constructor(infoKeeper, scaleManager) {
        this.infoKeeper = infoKeeper;
        this.scaleManager = scaleManager;
        this.imageLoaded = false;
    }
    init(stackCanvas) {
        this.canvasOdontoradiosis = new CanvasOdontoradiosisImpl(stackCanvas, this.scaleManager, { image: 0, bezier: 1, landmarks: 2 });
        this.imageEffects = new ImageEffects(this.canvasOdontoradiosis);
        this.mainController = new MainController(this.canvasOdontoradiosis, this.scaleManager, this.infoKeeper);
    }
    /**
     * Adding the semiautomatic landmark indentification feature
     * @param tracingController
     * @param landmarksController
     * @returns
     */
    static newSemiautomaticLandmark(tracingController, landmarksController) {
        return new SemiautomaticLandmarks([aJson, enaJson, gnatioJson, nasioJson, selaJson], tracingController, landmarksController);
        // semiautomaticLandmarks.generateButtonEvent();
    }
    get effectsManager() {
        return this.imageEffects;
    }
    get defaultEffectValues() {
        return ImageEffects.defaultValues;
    }
    get tracingController() {
        return this.mainController.tracingController;
    }
    get cephalometricCanvas() {
        return this.mainController.canvasOdontoradiosis;
    }
    get controller() {
        return this.mainController;
    }
    get isImageOpened() {
        return this.imageLoaded;
    }
    openImage(imageData) {
        this.mainController.tracingController.setBezierPoints();
        const self = this;
        this.canvasOdontoradiosis.openImage(imageData, function () {
            self.mainController.loadJsonCurve('');
            self.mainController.loadJsonLandmarks('');
            self.imageLoaded = true;
        });
        this.imageEffects.reset();
    }
}
CephalometricCanvasService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: CephalometricCanvasService, deps: [{ token: OdontoradiosisKeeper }, { token: ScaleManager }], target: i0.ɵɵFactoryTarget.Injectable });
CephalometricCanvasService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: CephalometricCanvasService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: CephalometricCanvasService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: OdontoradiosisKeeper }, { type: ScaleManager }]; } });

class CephalometricCanvasComponent {
    constructor(canvasService, infoKeeper, scaleManager) {
        this.canvasService = canvasService;
        this.infoKeeper = infoKeeper;
        this.scaleManager = scaleManager;
    }
    ngOnInit() { }
    ngAfterViewInit() {
        this.canvasService.init(this.stackCanvasElement.nativeElement);
        this.canvasService.cephalometricCanvas.addCanvasElement('image', this.canvasImageElement.nativeElement);
        this.canvasService.cephalometricCanvas.addCanvasElement('bezier', this.canvasBezierElement.nativeElement);
        this.canvasService.cephalometricCanvas.addCanvasElement('landmarks', this.canvasLandmarksElement.nativeElement);
    }
    onMouseMove(event) {
        event.preventDefault();
        event.stopPropagation(); // tell the browser we're handling this event
        const canvasController = this.canvasService.cephalometricCanvas;
        const tracingController = this.canvasService.tracingController;
        const bezierCanvas = canvasController.getCanvas('bezier');
        const context = canvasController.getContext('bezier');
        context.translate(bezierCanvas.width / 2, bezierCanvas.height / 2);
        if (this.infoKeeper.isMouseDown && this.infoKeeper.isCurveFunction) {
            /* do drag things */
            canvasController.canvasCursor = 'move';
            const curveName = UsefulMethods.normalizeTracingName(this.infoKeeper.selectedOptions.curve);
            const referenceCanvas = canvasController.getCanvas('landmarks');
            const referenceContext = canvasController.getContext('landmarks');
            const referenceRect = referenceCanvas.getBoundingClientRect();
            const currentPosition = {
                x: this.scaleManager.dynamicCanvasScale(event.clientX, true, referenceContext, referenceRect),
                y: this.scaleManager.dynamicCanvasScale(event.clientY, false, referenceContext, referenceRect),
            };
            if (this.infoKeeper.mousePosition.disabled) {
                this.infoKeeper.mousePosition.x = currentPosition.x;
                this.infoKeeper.mousePosition.y = currentPosition.y;
                this.infoKeeper.mousePosition.disabled = false;
            }
            else {
                const boxVertexInfo = this.infoKeeper.isOnBoxVertex;
                if (boxVertexInfo.isOn) {
                    /*still need to fix problem when rescale with top points*/
                    let scaleX = currentPosition.x / this.infoKeeper.mousePosition.x;
                    if (boxVertexInfo.index < 2) {
                        scaleX =
                            this.infoKeeper.mousePosition.x / currentPosition.x;
                    }
                    let scaleY = currentPosition.y / this.infoKeeper.mousePosition.y;
                    if (boxVertexInfo.index % 2 === 0) {
                        scaleY =
                            this.infoKeeper.mousePosition.y / currentPosition.y;
                    }
                    tracingController.rescaleBezier(curveName, scaleX, scaleY);
                }
                else if (this.infoKeeper.isOnCurvePoints != null) {
                    const curvePoints = this.infoKeeper
                        .isOnCurvePoints[0];
                    curvePoints[this.infoKeeper.isOnCurvePoints[1]] -=
                        this.infoKeeper.mousePosition.x - currentPosition.x;
                    curvePoints[this.infoKeeper.isOnCurvePoints[2]] -=
                        this.infoKeeper.mousePosition.y - currentPosition.y;
                }
                else if (this.infoKeeper.isInsideBox) {
                    tracingController.translateBezier(curveName, this.infoKeeper.mousePosition.x - currentPosition.x, this.infoKeeper.mousePosition.y - currentPosition.y);
                }
                else {
                    let angle = UsefulMethods.calculateAngle(currentPosition, this.infoKeeper.mousePosition);
                    if (!isNaN(angle)) {
                        angle *= UsefulMethods.highLowAngle(this.infoKeeper.mousePosition, {
                            x: currentPosition.x,
                            y: currentPosition.y,
                        });
                        tracingController.rotateBezier(curveName, angle);
                    }
                }
                this.infoKeeper.mousePosition.x = currentPosition.x;
                this.infoKeeper.mousePosition.y = currentPosition.y;
                this.infoKeeper.mousePosition.disabled = false;
                tracingController.drawAllCurves();
                tracingController.drawCurveBox(curveName, true);
                tracingController.drawPointCircle(curveName);
                tracingController.saveBezierCurve();
            }
        }
        else if (this.infoKeeper.isCurveFunction) {
            canvasController.canvasCursor = 'crosshair';
        }
    }
    /**
     * Receive a event and manage when to select curve or landmark functions
     * @param event
     */
    onMouseDown(event) {
        this.infoKeeper.isMouseDown = true;
        // Start handling the mouse position
        const currentCurve = this.infoKeeper.selectedOptions.curve;
        const curveName = UsefulMethods.normalizeTracingName(currentCurve);
        const tracingController = this.canvasService.tracingController;
        const canvasOdontoradiosis = this.canvasService.cephalometricCanvas;
        if (currentCurve.length <= 0 || currentCurve === 'Selecione') {
            this.infoKeeper.isCurveFunction = false;
            const landmarkName = this.infoKeeper.selectedOptions.landmark;
            this.canvasService.controller.markLandmarkPoint(landmarkName, {
                x: event.clientX,
                y: event.clientY,
            });
        }
        else if (tracingController.curveExists(curveName)) {
            this.infoKeeper.isCurveFunction = true;
            const points = tracingController.getBoxDimensions(curveName);
            const relativeMouse = this.scaleManager.getMousePos(canvasOdontoradiosis.getCanvas('bezier'), { x: event.clientX, y: event.clientY });
            this.infoKeeper.isInsideBox =
                relativeMouse.x >= points[0] &&
                    relativeMouse.x <= points[0] + points[2] &&
                    relativeMouse.y >= points[1] &&
                    relativeMouse.y <= points[1] + points[3];
            this.infoKeeper.isOnBoxVertex =
                tracingController.verifyMouseOnBoxVertex(relativeMouse, curveName);
            this.infoKeeper.isOnCurvePoints =
                tracingController.verifyMouseOnCurvePoint(relativeMouse, curveName);
        }
    }
    onMouseUp() {
        this.infoKeeper.isMouseDown = false;
        this.infoKeeper.isInsideBox = false;
        this.infoKeeper.isOnBoxVertex = { isOn: false, index: 0 };
        this.infoKeeper.isOnCurvePoints = null;
        /*this.infoKeeper.mousePosition.x = null;
        this.infoKeeper.mousePosition.y = null;*/
        this.infoKeeper.mousePosition.disabled = true;
    }
}
CephalometricCanvasComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: CephalometricCanvasComponent, deps: [{ token: CephalometricCanvasService }, { token: OdontoradiosisKeeper }, { token: ScaleManager }], target: i0.ɵɵFactoryTarget.Component });
CephalometricCanvasComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.0", type: CephalometricCanvasComponent, selector: "lib-cephalometric-canvas", viewQueries: [{ propertyName: "stackCanvasElement", first: true, predicate: ["stackCanvas"], descendants: true }, { propertyName: "canvasImageElement", first: true, predicate: ["canvasImage"], descendants: true }, { propertyName: "canvasBezierElement", first: true, predicate: ["canvasBezier"], descendants: true }, { propertyName: "canvasLandmarksElement", first: true, predicate: ["canvasLandmarks"], descendants: true }], ngImport: i0, template: "<div id=\"card-canvas\" class=\"card-body\">\r\n  <div\r\n    (pointerdown)=\"onMouseDown($event)\"\r\n    (pointerup)=\"onMouseUp()\"\r\n    (pointermove)=\"onMouseMove($event)\"\r\n    #stackCanvas\r\n    id=\"stack-canvas\"\r\n  >\r\n    <canvas #canvasImage id=\"image\"> </canvas>\r\n    <canvas #canvasBezier id=\"bezier\"> </canvas>\r\n    <canvas #canvasLandmarks id=\"landmarks\"> </canvas>\r\n  </div>\r\n</div>\r\n", styles: ["#stack-canvas{position:relative;cursor:crosshair}#stack-canvas>canvas{max-width:100%;height:auto;position:absolute;left:0;top:0}#stack-canvas>canvas .image{z-index:0}#stack-canvas>canvas .bezier{z-index:1}#stack-canvas>canvas .landmarks{z-index:2}.card-body{max-width:100%;min-height:20rem;min-width:20rem}\n"] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: CephalometricCanvasComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-cephalometric-canvas', template: "<div id=\"card-canvas\" class=\"card-body\">\r\n  <div\r\n    (pointerdown)=\"onMouseDown($event)\"\r\n    (pointerup)=\"onMouseUp()\"\r\n    (pointermove)=\"onMouseMove($event)\"\r\n    #stackCanvas\r\n    id=\"stack-canvas\"\r\n  >\r\n    <canvas #canvasImage id=\"image\"> </canvas>\r\n    <canvas #canvasBezier id=\"bezier\"> </canvas>\r\n    <canvas #canvasLandmarks id=\"landmarks\"> </canvas>\r\n  </div>\r\n</div>\r\n", styles: ["#stack-canvas{position:relative;cursor:crosshair}#stack-canvas>canvas{max-width:100%;height:auto;position:absolute;left:0;top:0}#stack-canvas>canvas .image{z-index:0}#stack-canvas>canvas .bezier{z-index:1}#stack-canvas>canvas .landmarks{z-index:2}.card-body{max-width:100%;min-height:20rem;min-width:20rem}\n"] }]
        }], ctorParameters: function () { return [{ type: CephalometricCanvasService }, { type: OdontoradiosisKeeper }, { type: ScaleManager }]; }, propDecorators: { stackCanvasElement: [{
                type: ViewChild,
                args: ['stackCanvas']
            }], canvasImageElement: [{
                type: ViewChild,
                args: ['canvasImage']
            }], canvasBezierElement: [{
                type: ViewChild,
                args: ['canvasBezier']
            }], canvasLandmarksElement: [{
                type: ViewChild,
                args: ['canvasLandmarks']
            }] } });

class CephalometricCanvasModule {
}
CephalometricCanvasModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: CephalometricCanvasModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CephalometricCanvasModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: CephalometricCanvasModule, declarations: [CephalometricCanvasComponent], exports: [CephalometricCanvasComponent] });
CephalometricCanvasModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: CephalometricCanvasModule, imports: [[]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: CephalometricCanvasModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [CephalometricCanvasComponent],
                    imports: [],
                    exports: [CephalometricCanvasComponent],
                }]
        }] });

/*
 * Public API Surface of cephalometric-canvas
 */

/**
 * Generated bundle index. Do not edit.
 */

export { CephalometricCanvasComponent, CephalometricCanvasModule, CephalometricCanvasService, OdontoradiosisKeeper, ScaleManager, UsefulMethods };
