(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("framer"), require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["framer", "react"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("framer"), require("react")) : factory(root["Framer"], root["React"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function(__WEBPACK_EXTERNAL_MODULE_framer__, __WEBPACK_EXTERNAL_MODULE_react__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		try { modules[moduleId].call(module.exports, module, module.exports, __webpack_require__); } catch (error) { module.exports = { error } }
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// asset url
/******/ 	var __module_i = eval("typeof module !== 'undefined' ? module.i : ''");
/******/ 	var __framer_package = (/(node_modules[/].*)[/]build.index.js/.exec(__module_i) || [])[1]
/******/ 	function __asset_url__(src) { return __WEBPACK_EXTERNAL_MODULE_framer__.serverURL(__framer_package, src) };
/******/ 	installedModules['framer/resource'] = { i: 'framer/resource', l: true, exports: { url: __asset_url__ } };
/******/
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./package.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./code sync recursive \\.(t|j)s(x?)|\\.css$":
/*!***************************************!*\
  !*** ./code sync \.(t|j)s(x?)|\.css$ ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./MagicMove.tsx": "./code/MagicMove.tsx",
	"./canvas.tsx": "./code/canvas.tsx"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	var module = __webpack_require__(id);
	return module;
}
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) { // check for number or string
		var e = new Error('Cannot find module "' + req + '".');
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return id;
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./code sync recursive \\.(t|j)s(x?)|\\.css$";

/***/ }),

/***/ "./code/MagicMove.tsx":
/*!****************************!*\
  !*** ./code/MagicMove.tsx ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst React = __webpack_require__(/*! react */ \"react\");\nconst framer_1 = __webpack_require__(/*! framer */ \"framer\");\nclass MagicMove extends React.Component {\n    constructor() {\n        super(...arguments);\n        this.state = {\n            foundIDs: [],\n        };\n        this.magicList = [];\n        this.elements = {};\n        this.i = 0;\n        this.runMagic = () => {\n            window[\"__checkBudget__\"]();\n            this.magicList.forEach(exec => {\n                window[\"__checkBudget__\"]();\n                exec();\n            });\n        };\n        this.magic = (start, end) => {\n            window[\"__checkBudget__\"]();\n            const { props } = this;\n            const options = {};\n            const animated = framer_1.Animatable(start);\n            if (props.easing == 'spring') {\n                options['tension'] = props.tension;\n                options['friction'] = props.friction;\n            }\n            else {\n                options['duration'] = props.duration;\n            }\n            if (props.easing == 'bezier') {\n                options['curve'] = JSON.parse(`[${props.curve}]`);\n            }\n            this.magicList.push(() => framer_1.animate[props.easing](animated, end, options));\n            return animated;\n        };\n        this.cleanSide = (props, side, parentSize) => {\n            window[\"__checkBudget__\"]();\n            if (typeof props[side] == 'string') {\n                if (props[side].includes('fr')) {\n                    return parseFloat(props[side]) * parentSize[side];\n                }\n                return (parseFloat(props[side]) / 100) * parentSize[side];\n            }\n            return props[side];\n        };\n        this.getSize = props => {\n            window[\"__checkBudget__\"]();\n            const { left, right, top, bottom, parentSize } = props;\n            const size = {\n                width: [left, right],\n                height: [top, bottom],\n            };\n            const returnSize = {\n                width: null,\n                height: null,\n            };\n            for (const side in size) {\n                returnSize[side] = size[side].every(i => i != null)\n                    ? parentSize[side] - size[side][0] - size[side][1]\n                    : this.cleanSide(props, side, parentSize);\n            }\n            return returnSize;\n        };\n        this.getConstraints = props => {\n            window[\"__checkBudget__\"]();\n            const orientation = { top: 'Y', left: 'X' };\n            const constraints = ['top', 'left'];\n            const returnConstraints = {\n                top: null,\n                left: null,\n            };\n            constraints.forEach(side => {\n                window[\"__checkBudget__\"]();\n                const sizeSide = side == 'left' ? 'width' : 'height';\n                const oppositeSide = side == 'left' ? 'right' : 'bottom';\n                const cleanSide = this.cleanSide(props, sizeSide, props.parentSize);\n                if (constraints.every(i => props[i] != null)) {\n                    returnConstraints[side] = props[side];\n                }\n                else {\n                    if (![side, oppositeSide].every(i => props[i] == null)) {\n                        if (props[side] != null) {\n                            returnConstraints[side] = props[side];\n                        }\n                        else {\n                            returnConstraints[side] =\n                                props.parentSize[sizeSide] - props[oppositeSide] - cleanSide;\n                        }\n                    }\n                    else {\n                        returnConstraints[side] =\n                            (props.parentSize[sizeSide] *\n                                parseFloat(props['center' + orientation[side]])) /\n                                100 -\n                                cleanSide / 2;\n                    }\n                }\n            });\n            return returnConstraints;\n        };\n        this.handleProps = (element, render, isParent, parentSize, stopPropagation) => {\n            window[\"__checkBudget__\"]();\n            const props = {};\n            const { elements, i } = this;\n            if (!isParent && !render) {\n                if (elements[i] == null)\n                    elements[i] = [];\n                elements[i] = [...elements[i], Object.assign({}, element.props, { parentSize })];\n            }\n            if (render) {\n                const propsTransform = this.state.foundIDs.find(e => {\n                    window[\"__checkBudget__\"]();\n                    return e.start.id == element.props.id;\n                });\n                if (propsTransform) {\n                    const { start, end } = propsTransform;\n                    if (element.type.name == 'WithEventsHOC') {\n                        const { getConstraints, getSize, magic } = this;\n                        const constraints = [getConstraints(start), getConstraints(end)];\n                        const size = [getSize(start), getSize(end)];\n                        const found = Object.keys(start).filter(key => {\n                            window[\"__checkBudget__\"]();\n                            if (typeof start[key] == 'string' && start[key]) {\n                                if (start[key].includes('fr')) {\n                                    return true;\n                                }\n                            }\n                        });\n                        if (!found.length && !stopPropagation) {\n                            props['bottom'] = null;\n                            props['right'] = null;\n                            props['top'] = magic(constraints[0].top, constraints[1].top);\n                            props['left'] = magic(constraints[0].left, constraints[1].left);\n                            props['width'] = magic(size[0].width, size[1].width);\n                            props['height'] = magic(size[0].height, size[1].height);\n                            props['background'] = magic(start.background, end.background);\n                            props['opacity'] = magic(start.opacity, end.opacity);\n                            props['rotation'] = magic(start.rotation, end.rotation);\n                        }\n                    }\n                }\n            }\n            return props;\n        };\n        this.clone = (element, render = false, isParent = false, parentSize = null, stopPropagation = false) => {\n            window[\"__checkBudget__\"]();\n            if (isParent) {\n                this.i = 0;\n            }\n            this.i++;\n            if (element.type.name == 'Unwrap') {\n                stopPropagation = true;\n            }\n            return React.cloneElement(element, this.handleProps(element, render, isParent, parentSize, stopPropagation), React.Children.map(element.props.children, child => {\n                window[\"__checkBudget__\"]();\n                const { width, height } = element.type.name == 'Unwrap'\n                    ? parentSize\n                    : this.getSize(Object.assign({}, element.props, { parentSize }));\n                return this.clone(child, render, false, { width, height }, stopPropagation);\n            }));\n        };\n        this.processProps = () => {\n            window[\"__checkBudget__\"]();\n            const { children, target } = this.props;\n            const { elements } = this;\n            if (children.length && target.length) {\n                this.clone(children[0], false, true);\n                this.clone(target[0], false, true);\n                const foundElements = [];\n                Object.keys(elements).forEach(key => {\n                    window[\"__checkBudget__\"]();\n                    foundElements.push({\n                        start: elements[key][0],\n                        end: elements[key][1],\n                    });\n                });\n                this.setState({\n                    foundIDs: [...this.state.foundIDs, ...foundElements],\n                });\n            }\n        };\n    }\n    componentDidMount() {\n        window[\"__checkBudget__\"]();\n        this.processProps();\n    }\n    componentDidUpdate(prevProps) {\n        window[\"__checkBudget__\"]();\n        const { children, target, animate, delay } = this.props;\n        if (children !== prevProps.children || target !== prevProps.target) {\n            this.processProps();\n        }\n        if (animate == 'auto') {\n            this.runMagic();\n        }\n        if (animate == 'delay') {\n            setTimeout(() => {\n                window[\"__checkBudget__\"]();\n                this.runMagic();\n            }, delay * 1000);\n        }\n    }\n    render() {\n        window[\"__checkBudget__\"]();\n        const { width, height, children, target, animate } = this.props;\n        return children[0] && target[0] ? (React.createElement(\"div\", { onClick: animate == 'onTap' ? this.runMagic : undefined }, this.clone(children[0], true, true))) : (React.createElement(\"div\", { style: { width: width, height: height } },\n            React.createElement(\"div\", { style: Object.assign({}, messageBoxStyle, { width: width, height: height }) },\n                React.createElement(\"div\", { style: { display: 'flex' } },\n                    React.createElement(\"div\", { style: Object.assign({}, (children[0] ? numberStyleOff : numberStyle), { marginRight: 15 }) }, \"Source\"),\n                    React.createElement(\"div\", { style: target[0] ? numberStyleOff : numberStyle }, \"Target\")),\n                React.createElement(\"div\", { style: textStyle }, \"Connect to source and target\"))));\n    }\n}\nMagicMove.defaultProps = {\n    width: 250,\n    height: 250,\n    animate: 'onTap',\n    delay: 1,\n    easing: 'spring',\n    tension: 550,\n    friction: 25,\n    curve: '0.25, 0.1, 0.25, 1',\n    duration: 0.4,\n};\nMagicMove.propertyControls = {\n    children: {\n        type: framer_1.ControlType.ComponentInstance,\n        title: 'Source',\n    },\n    target: {\n        type: framer_1.ControlType.ComponentInstance,\n        title: 'Target',\n    },\n    animate: {\n        type: framer_1.ControlType.SegmentedEnum,\n        title: 'Animate',\n        options: ['auto', 'delay', 'onTap'],\n        optionTitles: ['Auto', 'Delay', 'onTap'],\n    },\n    delay: {\n        type: framer_1.ControlType.Number,\n        title: 'Delay',\n        max: 10,\n        step: 0.1,\n        hidden(props) {\n            window[\"__checkBudget__\"]();\n            return props.animate != 'delay';\n        },\n    },\n    easing: {\n        type: framer_1.ControlType.Enum,\n        title: 'Easing',\n        options: [\n            'spring',\n            'bezier',\n            'linear',\n            'ease',\n            'easeIn',\n            'easeOut',\n            'easeInOut',\n        ],\n        optionTitles: [\n            'Spring',\n            'Bézier curve',\n            'Linear',\n            'Ease',\n            'Ease-in',\n            'Ease-out',\n            'Ease-in-out',\n        ],\n    },\n    tension: {\n        type: framer_1.ControlType.Number,\n        title: 'Tension',\n        max: 1000,\n        hidden(props) {\n            window[\"__checkBudget__\"]();\n            return props.easing != 'spring';\n        },\n    },\n    friction: {\n        type: framer_1.ControlType.Number,\n        title: 'Friction',\n        hidden(props) {\n            window[\"__checkBudget__\"]();\n            return props.easing != 'spring';\n        },\n    },\n    duration: {\n        type: framer_1.ControlType.Number,\n        title: 'Duration',\n        max: 10,\n        step: 0.1,\n        hidden(props) {\n            window[\"__checkBudget__\"]();\n            return props.easing == 'spring';\n        },\n    },\n    curve: {\n        type: framer_1.ControlType.String,\n        title: 'Curve',\n        hidden(props) {\n            window[\"__checkBudget__\"]();\n            return props.easing != 'bezier';\n        },\n    },\n};\nexports.MagicMove = MagicMove;\nconst messageBoxStyle = {\n    display: 'flex',\n    alignItems: 'center',\n    justifyContent: 'center',\n    flexDirection: 'column',\n    minWidth: 175,\n    height: 58,\n    padding: 16,\n    borderRadius: 3,\n    background: 'rgba(136, 85, 255, 0.1)',\n    boxShadow: 'inset 0 0 0 1px rgba(137, 87, 255, 0.5)',\n};\nconst numberStyle = {\n    display: 'flex',\n    alignItems: 'center',\n    justifyContent: 'center',\n    width: 66,\n    height: 34,\n    borderRadius: 3,\n    fontSize: 14,\n    fontWeight: 800,\n    background: '#8855FF',\n    color: 'white',\n};\nconst numberStyleOff = {\n    display: 'flex',\n    alignItems: 'center',\n    justifyContent: 'center',\n    width: 66,\n    height: 34,\n    borderRadius: 3,\n    fontSize: 14,\n    fontWeight: 800,\n    background: 'rgba(135, 85, 255, .3)',\n    color: 'white',\n};\nconst textStyle = {\n    fontSize: 16,\n    lineHeight: 1.3,\n    color: '#8855FF',\n    marginTop: 10,\n    textAlign: 'center',\n};\nconst subTextStyle = {\n    display: 'block',\n    fontSize: 11,\n    fontWeight: 500,\n    opacity: 0.8,\n};\nexports.__info__ = [{ name: \"MagicMove\", children: true, type: \"component\" }];\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9jb2RlL01hZ2ljTW92ZS50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsUUFBUTtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRCxZQUFZO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVDQUF1QztBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsY0FBYztBQUNqQztBQUNBO0FBQ0E7QUFDQSwrREFBK0Qsa0JBQWtCLGFBQWE7QUFDOUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLDJCQUEyQixhQUFhO0FBQ3hDO0FBQ0EsK0JBQStCLGlDQUFpQztBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLGdCQUFnQjtBQUN2QztBQUNBLG1EQUFtRCxrQkFBa0IsYUFBYTtBQUNsRix5REFBeUQsZ0JBQWdCO0FBQ3pFLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsbUJBQW1CO0FBQ3RDLG1CQUFtQixXQUFXO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQixpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLG1DQUFtQztBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsMkNBQTJDO0FBQzFELHVFQUF1RSwwREFBMEQsdUVBQXVFLFNBQVMsK0JBQStCLEVBQUU7QUFDbFAsd0NBQXdDLHdCQUF3QixvQkFBb0IsK0JBQStCLEdBQUc7QUFDdEgsNENBQTRDLFNBQVMsa0JBQWtCLEVBQUU7QUFDekUsZ0RBQWdELHdCQUF3QixpREFBaUQsa0JBQWtCLEdBQUc7QUFDOUksZ0RBQWdELGtEQUFrRDtBQUNsRyw0Q0FBNEMsbUJBQW1CO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVEQUF1RCIsImZpbGUiOiIuL2NvZGUvTWFnaWNNb3ZlLnRzeC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgUmVhY3QgPSByZXF1aXJlKFwicmVhY3RcIik7XG5jb25zdCBmcmFtZXJfMSA9IHJlcXVpcmUoXCJmcmFtZXJcIik7XG5jbGFzcyBNYWdpY01vdmUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgZm91bmRJRHM6IFtdLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLm1hZ2ljTGlzdCA9IFtdO1xuICAgICAgICB0aGlzLmVsZW1lbnRzID0ge307XG4gICAgICAgIHRoaXMuaSA9IDA7XG4gICAgICAgIHRoaXMucnVuTWFnaWMgPSAoKSA9PiB7XG4gICAgICAgICAgICB3aW5kb3dbXCJfX2NoZWNrQnVkZ2V0X19cIl0oKTtcbiAgICAgICAgICAgIHRoaXMubWFnaWNMaXN0LmZvckVhY2goZXhlYyA9PiB7XG4gICAgICAgICAgICAgICAgd2luZG93W1wiX19jaGVja0J1ZGdldF9fXCJdKCk7XG4gICAgICAgICAgICAgICAgZXhlYygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMubWFnaWMgPSAoc3RhcnQsIGVuZCkgPT4ge1xuICAgICAgICAgICAgd2luZG93W1wiX19jaGVja0J1ZGdldF9fXCJdKCk7XG4gICAgICAgICAgICBjb25zdCB7IHByb3BzIH0gPSB0aGlzO1xuICAgICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHt9O1xuICAgICAgICAgICAgY29uc3QgYW5pbWF0ZWQgPSBmcmFtZXJfMS5BbmltYXRhYmxlKHN0YXJ0KTtcbiAgICAgICAgICAgIGlmIChwcm9wcy5lYXNpbmcgPT0gJ3NwcmluZycpIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zWyd0ZW5zaW9uJ10gPSBwcm9wcy50ZW5zaW9uO1xuICAgICAgICAgICAgICAgIG9wdGlvbnNbJ2ZyaWN0aW9uJ10gPSBwcm9wcy5mcmljdGlvbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIG9wdGlvbnNbJ2R1cmF0aW9uJ10gPSBwcm9wcy5kdXJhdGlvbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwcm9wcy5lYXNpbmcgPT0gJ2JlemllcicpIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zWydjdXJ2ZSddID0gSlNPTi5wYXJzZShgWyR7cHJvcHMuY3VydmV9XWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5tYWdpY0xpc3QucHVzaCgoKSA9PiBmcmFtZXJfMS5hbmltYXRlW3Byb3BzLmVhc2luZ10oYW5pbWF0ZWQsIGVuZCwgb3B0aW9ucykpO1xuICAgICAgICAgICAgcmV0dXJuIGFuaW1hdGVkO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmNsZWFuU2lkZSA9IChwcm9wcywgc2lkZSwgcGFyZW50U2l6ZSkgPT4ge1xuICAgICAgICAgICAgd2luZG93W1wiX19jaGVja0J1ZGdldF9fXCJdKCk7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHByb3BzW3NpZGVdID09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgaWYgKHByb3BzW3NpZGVdLmluY2x1ZGVzKCdmcicpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZUZsb2F0KHByb3BzW3NpZGVdKSAqIHBhcmVudFNpemVbc2lkZV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiAocGFyc2VGbG9hdChwcm9wc1tzaWRlXSkgLyAxMDApICogcGFyZW50U2l6ZVtzaWRlXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBwcm9wc1tzaWRlXTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5nZXRTaXplID0gcHJvcHMgPT4ge1xuICAgICAgICAgICAgd2luZG93W1wiX19jaGVja0J1ZGdldF9fXCJdKCk7XG4gICAgICAgICAgICBjb25zdCB7IGxlZnQsIHJpZ2h0LCB0b3AsIGJvdHRvbSwgcGFyZW50U2l6ZSB9ID0gcHJvcHM7XG4gICAgICAgICAgICBjb25zdCBzaXplID0ge1xuICAgICAgICAgICAgICAgIHdpZHRoOiBbbGVmdCwgcmlnaHRdLFxuICAgICAgICAgICAgICAgIGhlaWdodDogW3RvcCwgYm90dG9tXSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjb25zdCByZXR1cm5TaXplID0ge1xuICAgICAgICAgICAgICAgIHdpZHRoOiBudWxsLFxuICAgICAgICAgICAgICAgIGhlaWdodDogbnVsbCxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHNpZGUgaW4gc2l6ZSkge1xuICAgICAgICAgICAgICAgIHJldHVyblNpemVbc2lkZV0gPSBzaXplW3NpZGVdLmV2ZXJ5KGkgPT4gaSAhPSBudWxsKVxuICAgICAgICAgICAgICAgICAgICA/IHBhcmVudFNpemVbc2lkZV0gLSBzaXplW3NpZGVdWzBdIC0gc2l6ZVtzaWRlXVsxXVxuICAgICAgICAgICAgICAgICAgICA6IHRoaXMuY2xlYW5TaWRlKHByb3BzLCBzaWRlLCBwYXJlbnRTaXplKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXR1cm5TaXplO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmdldENvbnN0cmFpbnRzID0gcHJvcHMgPT4ge1xuICAgICAgICAgICAgd2luZG93W1wiX19jaGVja0J1ZGdldF9fXCJdKCk7XG4gICAgICAgICAgICBjb25zdCBvcmllbnRhdGlvbiA9IHsgdG9wOiAnWScsIGxlZnQ6ICdYJyB9O1xuICAgICAgICAgICAgY29uc3QgY29uc3RyYWludHMgPSBbJ3RvcCcsICdsZWZ0J107XG4gICAgICAgICAgICBjb25zdCByZXR1cm5Db25zdHJhaW50cyA9IHtcbiAgICAgICAgICAgICAgICB0b3A6IG51bGwsXG4gICAgICAgICAgICAgICAgbGVmdDogbnVsbCxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjb25zdHJhaW50cy5mb3JFYWNoKHNpZGUgPT4ge1xuICAgICAgICAgICAgICAgIHdpbmRvd1tcIl9fY2hlY2tCdWRnZXRfX1wiXSgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHNpemVTaWRlID0gc2lkZSA9PSAnbGVmdCcgPyAnd2lkdGgnIDogJ2hlaWdodCc7XG4gICAgICAgICAgICAgICAgY29uc3Qgb3Bwb3NpdGVTaWRlID0gc2lkZSA9PSAnbGVmdCcgPyAncmlnaHQnIDogJ2JvdHRvbSc7XG4gICAgICAgICAgICAgICAgY29uc3QgY2xlYW5TaWRlID0gdGhpcy5jbGVhblNpZGUocHJvcHMsIHNpemVTaWRlLCBwcm9wcy5wYXJlbnRTaXplKTtcbiAgICAgICAgICAgICAgICBpZiAoY29uc3RyYWludHMuZXZlcnkoaSA9PiBwcm9wc1tpXSAhPSBudWxsKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm5Db25zdHJhaW50c1tzaWRlXSA9IHByb3BzW3NpZGVdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFbc2lkZSwgb3Bwb3NpdGVTaWRlXS5ldmVyeShpID0+IHByb3BzW2ldID09IG51bGwpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJvcHNbc2lkZV0gIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybkNvbnN0cmFpbnRzW3NpZGVdID0gcHJvcHNbc2lkZV07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5Db25zdHJhaW50c1tzaWRlXSA9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzLnBhcmVudFNpemVbc2l6ZVNpZGVdIC0gcHJvcHNbb3Bwb3NpdGVTaWRlXSAtIGNsZWFuU2lkZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybkNvbnN0cmFpbnRzW3NpZGVdID1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAocHJvcHMucGFyZW50U2l6ZVtzaXplU2lkZV0gKlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJzZUZsb2F0KHByb3BzWydjZW50ZXInICsgb3JpZW50YXRpb25bc2lkZV1dKSkgL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxMDAgLVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGVhblNpZGUgLyAyO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gcmV0dXJuQ29uc3RyYWludHM7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuaGFuZGxlUHJvcHMgPSAoZWxlbWVudCwgcmVuZGVyLCBpc1BhcmVudCwgcGFyZW50U2l6ZSwgc3RvcFByb3BhZ2F0aW9uKSA9PiB7XG4gICAgICAgICAgICB3aW5kb3dbXCJfX2NoZWNrQnVkZ2V0X19cIl0oKTtcbiAgICAgICAgICAgIGNvbnN0IHByb3BzID0ge307XG4gICAgICAgICAgICBjb25zdCB7IGVsZW1lbnRzLCBpIH0gPSB0aGlzO1xuICAgICAgICAgICAgaWYgKCFpc1BhcmVudCAmJiAhcmVuZGVyKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnRzW2ldID09IG51bGwpXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRzW2ldID0gW107XG4gICAgICAgICAgICAgICAgZWxlbWVudHNbaV0gPSBbLi4uZWxlbWVudHNbaV0sIE9iamVjdC5hc3NpZ24oe30sIGVsZW1lbnQucHJvcHMsIHsgcGFyZW50U2l6ZSB9KV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocmVuZGVyKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJvcHNUcmFuc2Zvcm0gPSB0aGlzLnN0YXRlLmZvdW5kSURzLmZpbmQoZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvd1tcIl9fY2hlY2tCdWRnZXRfX1wiXSgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZS5zdGFydC5pZCA9PSBlbGVtZW50LnByb3BzLmlkO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlmIChwcm9wc1RyYW5zZm9ybSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB7IHN0YXJ0LCBlbmQgfSA9IHByb3BzVHJhbnNmb3JtO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC50eXBlLm5hbWUgPT0gJ1dpdGhFdmVudHNIT0MnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB7IGdldENvbnN0cmFpbnRzLCBnZXRTaXplLCBtYWdpYyB9ID0gdGhpcztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbnN0cmFpbnRzID0gW2dldENvbnN0cmFpbnRzKHN0YXJ0KSwgZ2V0Q29uc3RyYWludHMoZW5kKV07XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzaXplID0gW2dldFNpemUoc3RhcnQpLCBnZXRTaXplKGVuZCldO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZm91bmQgPSBPYmplY3Qua2V5cyhzdGFydCkuZmlsdGVyKGtleSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93W1wiX19jaGVja0J1ZGdldF9fXCJdKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBzdGFydFtrZXldID09ICdzdHJpbmcnICYmIHN0YXJ0W2tleV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXJ0W2tleV0uaW5jbHVkZXMoJ2ZyJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWZvdW5kLmxlbmd0aCAmJiAhc3RvcFByb3BhZ2F0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHNbJ2JvdHRvbSddID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wc1sncmlnaHQnXSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHNbJ3RvcCddID0gbWFnaWMoY29uc3RyYWludHNbMF0udG9wLCBjb25zdHJhaW50c1sxXS50b3ApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzWydsZWZ0J10gPSBtYWdpYyhjb25zdHJhaW50c1swXS5sZWZ0LCBjb25zdHJhaW50c1sxXS5sZWZ0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wc1snd2lkdGgnXSA9IG1hZ2ljKHNpemVbMF0ud2lkdGgsIHNpemVbMV0ud2lkdGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzWydoZWlnaHQnXSA9IG1hZ2ljKHNpemVbMF0uaGVpZ2h0LCBzaXplWzFdLmhlaWdodCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHNbJ2JhY2tncm91bmQnXSA9IG1hZ2ljKHN0YXJ0LmJhY2tncm91bmQsIGVuZC5iYWNrZ3JvdW5kKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wc1snb3BhY2l0eSddID0gbWFnaWMoc3RhcnQub3BhY2l0eSwgZW5kLm9wYWNpdHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzWydyb3RhdGlvbiddID0gbWFnaWMoc3RhcnQucm90YXRpb24sIGVuZC5yb3RhdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcHJvcHM7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuY2xvbmUgPSAoZWxlbWVudCwgcmVuZGVyID0gZmFsc2UsIGlzUGFyZW50ID0gZmFsc2UsIHBhcmVudFNpemUgPSBudWxsLCBzdG9wUHJvcGFnYXRpb24gPSBmYWxzZSkgPT4ge1xuICAgICAgICAgICAgd2luZG93W1wiX19jaGVja0J1ZGdldF9fXCJdKCk7XG4gICAgICAgICAgICBpZiAoaXNQYXJlbnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmkgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5pKys7XG4gICAgICAgICAgICBpZiAoZWxlbWVudC50eXBlLm5hbWUgPT0gJ1Vud3JhcCcpIHtcbiAgICAgICAgICAgICAgICBzdG9wUHJvcGFnYXRpb24gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNsb25lRWxlbWVudChlbGVtZW50LCB0aGlzLmhhbmRsZVByb3BzKGVsZW1lbnQsIHJlbmRlciwgaXNQYXJlbnQsIHBhcmVudFNpemUsIHN0b3BQcm9wYWdhdGlvbiksIFJlYWN0LkNoaWxkcmVuLm1hcChlbGVtZW50LnByb3BzLmNoaWxkcmVuLCBjaGlsZCA9PiB7XG4gICAgICAgICAgICAgICAgd2luZG93W1wiX19jaGVja0J1ZGdldF9fXCJdKCk7XG4gICAgICAgICAgICAgICAgY29uc3QgeyB3aWR0aCwgaGVpZ2h0IH0gPSBlbGVtZW50LnR5cGUubmFtZSA9PSAnVW53cmFwJ1xuICAgICAgICAgICAgICAgICAgICA/IHBhcmVudFNpemVcbiAgICAgICAgICAgICAgICAgICAgOiB0aGlzLmdldFNpemUoT2JqZWN0LmFzc2lnbih7fSwgZWxlbWVudC5wcm9wcywgeyBwYXJlbnRTaXplIH0pKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jbG9uZShjaGlsZCwgcmVuZGVyLCBmYWxzZSwgeyB3aWR0aCwgaGVpZ2h0IH0sIHN0b3BQcm9wYWdhdGlvbik7XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMucHJvY2Vzc1Byb3BzID0gKCkgPT4ge1xuICAgICAgICAgICAgd2luZG93W1wiX19jaGVja0J1ZGdldF9fXCJdKCk7XG4gICAgICAgICAgICBjb25zdCB7IGNoaWxkcmVuLCB0YXJnZXQgfSA9IHRoaXMucHJvcHM7XG4gICAgICAgICAgICBjb25zdCB7IGVsZW1lbnRzIH0gPSB0aGlzO1xuICAgICAgICAgICAgaWYgKGNoaWxkcmVuLmxlbmd0aCAmJiB0YXJnZXQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jbG9uZShjaGlsZHJlblswXSwgZmFsc2UsIHRydWUpO1xuICAgICAgICAgICAgICAgIHRoaXMuY2xvbmUodGFyZ2V0WzBdLCBmYWxzZSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgY29uc3QgZm91bmRFbGVtZW50cyA9IFtdO1xuICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKGVsZW1lbnRzKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvd1tcIl9fY2hlY2tCdWRnZXRfX1wiXSgpO1xuICAgICAgICAgICAgICAgICAgICBmb3VuZEVsZW1lbnRzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IGVsZW1lbnRzW2tleV1bMF0sXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmQ6IGVsZW1lbnRzW2tleV1bMV0sXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICBmb3VuZElEczogWy4uLnRoaXMuc3RhdGUuZm91bmRJRHMsIC4uLmZvdW5kRWxlbWVudHNdLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgd2luZG93W1wiX19jaGVja0J1ZGdldF9fXCJdKCk7XG4gICAgICAgIHRoaXMucHJvY2Vzc1Byb3BzKCk7XG4gICAgfVxuICAgIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMpIHtcbiAgICAgICAgd2luZG93W1wiX19jaGVja0J1ZGdldF9fXCJdKCk7XG4gICAgICAgIGNvbnN0IHsgY2hpbGRyZW4sIHRhcmdldCwgYW5pbWF0ZSwgZGVsYXkgfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIGlmIChjaGlsZHJlbiAhPT0gcHJldlByb3BzLmNoaWxkcmVuIHx8IHRhcmdldCAhPT0gcHJldlByb3BzLnRhcmdldCkge1xuICAgICAgICAgICAgdGhpcy5wcm9jZXNzUHJvcHMoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYW5pbWF0ZSA9PSAnYXV0bycpIHtcbiAgICAgICAgICAgIHRoaXMucnVuTWFnaWMoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYW5pbWF0ZSA9PSAnZGVsYXknKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB3aW5kb3dbXCJfX2NoZWNrQnVkZ2V0X19cIl0oKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJ1bk1hZ2ljKCk7XG4gICAgICAgICAgICB9LCBkZWxheSAqIDEwMDApO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgd2luZG93W1wiX19jaGVja0J1ZGdldF9fXCJdKCk7XG4gICAgICAgIGNvbnN0IHsgd2lkdGgsIGhlaWdodCwgY2hpbGRyZW4sIHRhcmdldCwgYW5pbWF0ZSB9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgcmV0dXJuIGNoaWxkcmVuWzBdICYmIHRhcmdldFswXSA/IChSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgb25DbGljazogYW5pbWF0ZSA9PSAnb25UYXAnID8gdGhpcy5ydW5NYWdpYyA6IHVuZGVmaW5lZCB9LCB0aGlzLmNsb25lKGNoaWxkcmVuWzBdLCB0cnVlLCB0cnVlKSkpIDogKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBzdHlsZTogeyB3aWR0aDogd2lkdGgsIGhlaWdodDogaGVpZ2h0IH0gfSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBzdHlsZTogT2JqZWN0LmFzc2lnbih7fSwgbWVzc2FnZUJveFN0eWxlLCB7IHdpZHRoOiB3aWR0aCwgaGVpZ2h0OiBoZWlnaHQgfSkgfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHsgZGlzcGxheTogJ2ZsZXgnIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IHN0eWxlOiBPYmplY3QuYXNzaWduKHt9LCAoY2hpbGRyZW5bMF0gPyBudW1iZXJTdHlsZU9mZiA6IG51bWJlclN0eWxlKSwgeyBtYXJnaW5SaWdodDogMTUgfSkgfSwgXCJTb3VyY2VcIiksXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBzdHlsZTogdGFyZ2V0WzBdID8gbnVtYmVyU3R5bGVPZmYgOiBudW1iZXJTdHlsZSB9LCBcIlRhcmdldFwiKSksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IHN0eWxlOiB0ZXh0U3R5bGUgfSwgXCJDb25uZWN0IHRvIHNvdXJjZSBhbmQgdGFyZ2V0XCIpKSkpO1xuICAgIH1cbn1cbk1hZ2ljTW92ZS5kZWZhdWx0UHJvcHMgPSB7XG4gICAgd2lkdGg6IDI1MCxcbiAgICBoZWlnaHQ6IDI1MCxcbiAgICBhbmltYXRlOiAnb25UYXAnLFxuICAgIGRlbGF5OiAxLFxuICAgIGVhc2luZzogJ3NwcmluZycsXG4gICAgdGVuc2lvbjogNTUwLFxuICAgIGZyaWN0aW9uOiAyNSxcbiAgICBjdXJ2ZTogJzAuMjUsIDAuMSwgMC4yNSwgMScsXG4gICAgZHVyYXRpb246IDAuNCxcbn07XG5NYWdpY01vdmUucHJvcGVydHlDb250cm9scyA9IHtcbiAgICBjaGlsZHJlbjoge1xuICAgICAgICB0eXBlOiBmcmFtZXJfMS5Db250cm9sVHlwZS5Db21wb25lbnRJbnN0YW5jZSxcbiAgICAgICAgdGl0bGU6ICdTb3VyY2UnLFxuICAgIH0sXG4gICAgdGFyZ2V0OiB7XG4gICAgICAgIHR5cGU6IGZyYW1lcl8xLkNvbnRyb2xUeXBlLkNvbXBvbmVudEluc3RhbmNlLFxuICAgICAgICB0aXRsZTogJ1RhcmdldCcsXG4gICAgfSxcbiAgICBhbmltYXRlOiB7XG4gICAgICAgIHR5cGU6IGZyYW1lcl8xLkNvbnRyb2xUeXBlLlNlZ21lbnRlZEVudW0sXG4gICAgICAgIHRpdGxlOiAnQW5pbWF0ZScsXG4gICAgICAgIG9wdGlvbnM6IFsnYXV0bycsICdkZWxheScsICdvblRhcCddLFxuICAgICAgICBvcHRpb25UaXRsZXM6IFsnQXV0bycsICdEZWxheScsICdvblRhcCddLFxuICAgIH0sXG4gICAgZGVsYXk6IHtcbiAgICAgICAgdHlwZTogZnJhbWVyXzEuQ29udHJvbFR5cGUuTnVtYmVyLFxuICAgICAgICB0aXRsZTogJ0RlbGF5JyxcbiAgICAgICAgbWF4OiAxMCxcbiAgICAgICAgc3RlcDogMC4xLFxuICAgICAgICBoaWRkZW4ocHJvcHMpIHtcbiAgICAgICAgICAgIHdpbmRvd1tcIl9fY2hlY2tCdWRnZXRfX1wiXSgpO1xuICAgICAgICAgICAgcmV0dXJuIHByb3BzLmFuaW1hdGUgIT0gJ2RlbGF5JztcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIGVhc2luZzoge1xuICAgICAgICB0eXBlOiBmcmFtZXJfMS5Db250cm9sVHlwZS5FbnVtLFxuICAgICAgICB0aXRsZTogJ0Vhc2luZycsXG4gICAgICAgIG9wdGlvbnM6IFtcbiAgICAgICAgICAgICdzcHJpbmcnLFxuICAgICAgICAgICAgJ2JlemllcicsXG4gICAgICAgICAgICAnbGluZWFyJyxcbiAgICAgICAgICAgICdlYXNlJyxcbiAgICAgICAgICAgICdlYXNlSW4nLFxuICAgICAgICAgICAgJ2Vhc2VPdXQnLFxuICAgICAgICAgICAgJ2Vhc2VJbk91dCcsXG4gICAgICAgIF0sXG4gICAgICAgIG9wdGlvblRpdGxlczogW1xuICAgICAgICAgICAgJ1NwcmluZycsXG4gICAgICAgICAgICAnQsOpemllciBjdXJ2ZScsXG4gICAgICAgICAgICAnTGluZWFyJyxcbiAgICAgICAgICAgICdFYXNlJyxcbiAgICAgICAgICAgICdFYXNlLWluJyxcbiAgICAgICAgICAgICdFYXNlLW91dCcsXG4gICAgICAgICAgICAnRWFzZS1pbi1vdXQnLFxuICAgICAgICBdLFxuICAgIH0sXG4gICAgdGVuc2lvbjoge1xuICAgICAgICB0eXBlOiBmcmFtZXJfMS5Db250cm9sVHlwZS5OdW1iZXIsXG4gICAgICAgIHRpdGxlOiAnVGVuc2lvbicsXG4gICAgICAgIG1heDogMTAwMCxcbiAgICAgICAgaGlkZGVuKHByb3BzKSB7XG4gICAgICAgICAgICB3aW5kb3dbXCJfX2NoZWNrQnVkZ2V0X19cIl0oKTtcbiAgICAgICAgICAgIHJldHVybiBwcm9wcy5lYXNpbmcgIT0gJ3NwcmluZyc7XG4gICAgICAgIH0sXG4gICAgfSxcbiAgICBmcmljdGlvbjoge1xuICAgICAgICB0eXBlOiBmcmFtZXJfMS5Db250cm9sVHlwZS5OdW1iZXIsXG4gICAgICAgIHRpdGxlOiAnRnJpY3Rpb24nLFxuICAgICAgICBoaWRkZW4ocHJvcHMpIHtcbiAgICAgICAgICAgIHdpbmRvd1tcIl9fY2hlY2tCdWRnZXRfX1wiXSgpO1xuICAgICAgICAgICAgcmV0dXJuIHByb3BzLmVhc2luZyAhPSAnc3ByaW5nJztcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIGR1cmF0aW9uOiB7XG4gICAgICAgIHR5cGU6IGZyYW1lcl8xLkNvbnRyb2xUeXBlLk51bWJlcixcbiAgICAgICAgdGl0bGU6ICdEdXJhdGlvbicsXG4gICAgICAgIG1heDogMTAsXG4gICAgICAgIHN0ZXA6IDAuMSxcbiAgICAgICAgaGlkZGVuKHByb3BzKSB7XG4gICAgICAgICAgICB3aW5kb3dbXCJfX2NoZWNrQnVkZ2V0X19cIl0oKTtcbiAgICAgICAgICAgIHJldHVybiBwcm9wcy5lYXNpbmcgPT0gJ3NwcmluZyc7XG4gICAgICAgIH0sXG4gICAgfSxcbiAgICBjdXJ2ZToge1xuICAgICAgICB0eXBlOiBmcmFtZXJfMS5Db250cm9sVHlwZS5TdHJpbmcsXG4gICAgICAgIHRpdGxlOiAnQ3VydmUnLFxuICAgICAgICBoaWRkZW4ocHJvcHMpIHtcbiAgICAgICAgICAgIHdpbmRvd1tcIl9fY2hlY2tCdWRnZXRfX1wiXSgpO1xuICAgICAgICAgICAgcmV0dXJuIHByb3BzLmVhc2luZyAhPSAnYmV6aWVyJztcbiAgICAgICAgfSxcbiAgICB9LFxufTtcbmV4cG9ydHMuTWFnaWNNb3ZlID0gTWFnaWNNb3ZlO1xuY29uc3QgbWVzc2FnZUJveFN0eWxlID0ge1xuICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXG4gICAgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsXG4gICAgbWluV2lkdGg6IDE3NSxcbiAgICBoZWlnaHQ6IDU4LFxuICAgIHBhZGRpbmc6IDE2LFxuICAgIGJvcmRlclJhZGl1czogMyxcbiAgICBiYWNrZ3JvdW5kOiAncmdiYSgxMzYsIDg1LCAyNTUsIDAuMSknLFxuICAgIGJveFNoYWRvdzogJ2luc2V0IDAgMCAwIDFweCByZ2JhKDEzNywgODcsIDI1NSwgMC41KScsXG59O1xuY29uc3QgbnVtYmVyU3R5bGUgPSB7XG4gICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcbiAgICB3aWR0aDogNjYsXG4gICAgaGVpZ2h0OiAzNCxcbiAgICBib3JkZXJSYWRpdXM6IDMsXG4gICAgZm9udFNpemU6IDE0LFxuICAgIGZvbnRXZWlnaHQ6IDgwMCxcbiAgICBiYWNrZ3JvdW5kOiAnIzg4NTVGRicsXG4gICAgY29sb3I6ICd3aGl0ZScsXG59O1xuY29uc3QgbnVtYmVyU3R5bGVPZmYgPSB7XG4gICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcbiAgICB3aWR0aDogNjYsXG4gICAgaGVpZ2h0OiAzNCxcbiAgICBib3JkZXJSYWRpdXM6IDMsXG4gICAgZm9udFNpemU6IDE0LFxuICAgIGZvbnRXZWlnaHQ6IDgwMCxcbiAgICBiYWNrZ3JvdW5kOiAncmdiYSgxMzUsIDg1LCAyNTUsIC4zKScsXG4gICAgY29sb3I6ICd3aGl0ZScsXG59O1xuY29uc3QgdGV4dFN0eWxlID0ge1xuICAgIGZvbnRTaXplOiAxNixcbiAgICBsaW5lSGVpZ2h0OiAxLjMsXG4gICAgY29sb3I6ICcjODg1NUZGJyxcbiAgICBtYXJnaW5Ub3A6IDEwLFxuICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXG59O1xuY29uc3Qgc3ViVGV4dFN0eWxlID0ge1xuICAgIGRpc3BsYXk6ICdibG9jaycsXG4gICAgZm9udFNpemU6IDExLFxuICAgIGZvbnRXZWlnaHQ6IDUwMCxcbiAgICBvcGFjaXR5OiAwLjgsXG59O1xuZXhwb3J0cy5fX2luZm9fXyA9IFt7IG5hbWU6IFwiTWFnaWNNb3ZlXCIsIGNoaWxkcmVuOiB0cnVlLCB0eXBlOiBcImNvbXBvbmVudFwiIH1dO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./code/MagicMove.tsx\n");

/***/ }),

/***/ "./code/canvas.tsx":
/*!*************************!*\
  !*** ./code/canvas.tsx ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// WARNING: this file is auto generated, any changes will be lost
const framer_1 = __webpack_require__(/*! framer */ "framer");
const canvas = framer_1.CanvasStore.shared(); // CANVAS_DATA;


/***/ }),

/***/ "./package.js":
/*!********************!*\
  !*** ./package.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// The template for the dynamic webpack entry. Be aware of the variables

const packageJson = __webpack_require__(/*! ./package.json */ "./package.json")

const package = {
    packageJson,
    sourceModules: {},
    dependencies: {},
}

// This is a special webpack thing that watches the whole directory
// https://github.com/webpack/docs/wiki/context
const ctx = __webpack_require__("./code sync recursive \\.(t|j)s(x?)|\\.css$")

ctx.keys().forEach(key => {
    package.sourceModules[key] = () => ctx(key)
})

// The packages are passed in through a template
const packages = {}

                packages["framer"] = () => {
                    var package = {}
                    try {
                        package = __webpack_require__(/*! framer */ "framer")
                    } catch (e) {
                        console.log(e)
                    }
                    package.__framer__ = package.__framer__ || {}
                    package.__framer__.packageJson = {"name":"framer","version":"0.10.1","main":"build/framer.js","author":"Framer","license":"MIT","scripts":{"coverage":"jest --config jest.json --coverage","test":"jest --config jest.json","watch":"jest --config jest.json --watch"},"devDependencies":{"@microsoft/api-documenter":"^1.5.47","@microsoft/api-extractor":"^7.0.2","@types/chalk":"^2.2.0","@types/draft-js":"0.10.19","@types/enzyme":"^3.1.10","@types/hsluv":"https://github.com/framer/typed_hsluv#bump","@types/jest":"^23.0.0","@types/jest-diff":"^20.0.0","@types/node":"^9.6.0","@types/react":"^16","@types/react-dom":"^16","cache-loader":"^1.2.2","chalk":"^2.4.1","convert-tsconfig-paths-to-webpack-aliases":"^0.9.2","css.escape":"^1.5.1","draft-js":"0.10.4","enzyme":"^3.3.0","enzyme-adapter-react-16":"^1.1.1","eventemitter3":"^3.1.0","fork-ts-checker-webpack-plugin":"^0.4.1","hoist-non-react-statics":"^2.5.0","hsluv":"^0.0.3","immutable":"^3.8.2","jest":"^23.1.0","jest-diff":"^22.0.3","jest-junit":"^3.4.1","progress-bar-webpack-plugin":"^1.11.0","raf":"^3.4.0","react":"~16.4","react-dev-utils":"^5.0.1","react-dom":"~16.4","semver":"^5.6.0","ts-jest":"^22.4.5","ts-loader":"^4.1.0","typescript":"^3.0.1","watch":"^1.0.2","webpack":"^4.4.1","webpack-cli":"^2.0.13","webpack-dev-server":"^3.1.4","xcssmatrix":"^0.2.2"},"peerDependencies":{"react":"^16.3","react-dom":"^16.3"},"tsdoc":{"tsdocFlavor":"AEDoc"},"framer":{"components":[{"name":"Scroll","children":true,"properties":[{"key":"direction","title":"Direction","kind":"enum","options":["horizontal","vertical","both"]}]},{"name":"Page"},{"name":"Stack"},{"name":"FramerAppleWatch38","type":"device"},{"name":"FramerAppleWatch42","type":"device"},{"name":"FramerSonySmartWatch","type":"device"},{"name":"FramerAppleIPhoneSE","type":"device"},{"name":"FramerAppleIPhone8","type":"device"},{"name":"FramerAppleIPhone8Plus","type":"device"},{"name":"FramerAppleIPhoneXS","type":"device"},{"name":"FramerAppleIPhoneXR","type":"device"},{"name":"FramerAppleIPhoneXSMax","type":"device"},{"name":"FramerGooglePixel2","type":"device"},{"name":"FramerGooglePixel2XL","type":"device"},{"name":"FramerGooglePixel3","type":"device"},{"name":"FramerGooglePixel3XL","type":"device"},{"name":"FramerSamsungNote5","type":"device"},{"name":"FramerSamsungGalaxyS9","type":"device"},{"name":"FramerAppleIPadAir","type":"device"},{"name":"FramerAppleIPadMini","type":"device"},{"name":"FramerAppleIPadPro","type":"device"},{"name":"FramerGoogleNexusTablet","type":"device"},{"name":"FramerMicrosoftSurfacePro3","type":"device"},{"name":"FramerMicrosoftSurfacePro4","type":"device"},{"name":"FramerAppleIMac","type":"device"},{"name":"FramerAppleThunderboltDisplay","type":"device"},{"name":"FramerAppleMacBook","type":"device"},{"name":"FramerAppleMacBookAir","type":"device"},{"name":"FramerAppleMacBookPro","type":"device"},{"name":"FramerDellXPS","type":"device"},{"name":"FramerMicrosoftSurfaceBook","type":"device"},{"name":"FramerSonyW850C","type":"device"},{"name":"FramerStoreArtwork","type":"device"},{"name":"FramerStoreIcon","type":"device"}]}}
                    return package
                }

package.dependencies = packages

exports.__framer__ = package


/***/ }),

/***/ "./package.json":
/*!**********************!*\
  !*** ./package.json ***!
  \**********************/
/*! exports provided: main, license, devDependencies, peerDependencies, framer, author, name, version, default */
/***/ (function(module) {

module.exports = {"main":"dist/index.js","license":"MIT","devDependencies":{"@types/react":"^16.4.16","framer":"^0.10.0"},"peerDependencies":{"framer":"^0.10.0","react":"^16.3.0","react-dom":"^16.3.0"},"framer":{"id":"312dcc85-8f45-492d-acf6-0c6d39046726","displayName":"Magic Move"},"author":"Henrique Gusso","name":"@framer/gusso.magic-move","version":"1.2.0"};

/***/ }),

/***/ "framer":
/*!******************************************************************************************!*\
  !*** external {"root":"Framer","commonjs2":"framer","commonjs":"framer","amd":"framer"} ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_framer__;

/***/ }),

/***/ "react":
/*!**************************************************************************************!*\
  !*** external {"root":"React","commonjs2":"react","commonjs":"react","amd":"react"} ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_react__;

/***/ })

/******/ });
});