"use strict";
(self["webpackChunk_tests_issue_1798"] = self["webpackChunk_tests_issue_1798"] || []).push([["bud-client_lib_hot_components_indicator_index_js"],{

/***/ "../../../../bud-client/lib/hot/components/indicator/index.js":
/*!********************************************************************!*\
  !*** ../../../../bud-client/lib/hot/components/indicator/index.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.make = void 0;
const indicator_component_js_1 = __webpack_require__(/*! ./indicator.component.js */ "../../../../bud-client/lib/hot/components/indicator/indicator.component.js");
const indicator_controller_js_1 = __webpack_require__(/*! ./indicator.controller.js */ "../../../../bud-client/lib/hot/components/indicator/indicator.controller.js");
const make = () => __awaiter(void 0, void 0, void 0, function* () {
    if (customElements.get(`bud-activity-indicator`))
        return;
    customElements.define(`bud-activity-indicator`, indicator_component_js_1.Component);
    return new indicator_controller_js_1.Controller();
});
exports.make = make;


/***/ }),

/***/ "../../../../bud-client/lib/hot/components/indicator/indicator.component.js":
/*!**********************************************************************************!*\
  !*** ../../../../bud-client/lib/hot/components/indicator/indicator.component.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Component = void 0;
const indicator_pulse_js_1 = __webpack_require__(/*! ./indicator.pulse.js */ "../../../../bud-client/lib/hot/components/indicator/indicator.pulse.js");
/**
 * Indicator web component
 * @public
 */
class Component extends HTMLElement {
    /**
     * Class constructor
     * @public
     */
    constructor() {
        super();
        /**
         * Component name
         * @public
         */
        this.name = `bud-activity-indicator`;
        /**
         * Status indicator colors
         * @public
         */
        this.colors = {
            success: [4, 120, 87, 1],
            error: [220, 38, 38, 1],
            warn: [252, 211, 77, 1],
            pending: [59, 130, 246, 1],
        };
        this.renderShadow();
    }
    /**
     * Root div querySelector selector
     * @public
     */
    get selector() {
        return `.${this.name}`;
    }
    /**
     * Get accessor: has errors
     * @public
     */
    get hasErrors() {
        return this.getAttribute(`has-errors`) == `true`;
    }
    /**
     * Get accessor: has warnings
     * @public
     */
    get hasWarnings() {
        return this.getAttribute(`has-warnings`) == `true`;
    }
    /**
     * Render status indicator
     * @public
     */
    renderShadow() {
        const container = document.createElement(`div`);
        container.classList.add(this.name);
        container.innerHTML = `
    <style>
    .bud-activity-indicator {
      position: fixed;
      width: 10px;
      height: 10px;
      left: 10px;
      bottom: 10px;
      z-index: 9999;
      margin: 5px;
      padding: 5px;
      -webkit-transition:
        all .6s ease-in-out,
      transition:
        all .6s ease-in-out;
      animation-fill-mode: forwards;
      pointer-events: none;
      border-radius: 50%;
      transform: scale(0);
      opacity: 0;
    }

    .show {
      opacity: 1;
      background-color: rgba(255, 255, 255, 1);
      transform: scale(1);
      transition:
        all .6s ease-in-out;
    }

    ${(0, indicator_pulse_js_1.pulse)(`success`, this.colors.success)}
    ${(0, indicator_pulse_js_1.pulse)(`error`, this.colors.error)}
    ${(0, indicator_pulse_js_1.pulse)(`warning`, this.colors.warn)}
    ${(0, indicator_pulse_js_1.pulse)(`pending`, this.colors.pending)}

    </style>
    `;
        this.attachShadow({ mode: `open` }).appendChild(container);
    }
    /**
     * Show status indicator
     * @public
     */
    show() {
        this.hideTimeout && clearTimeout(this.hideTimeout);
        this.shadowRoot.querySelector(this.selector).classList.add(`show`);
    }
    /**
     * Hide status indicator
     */
    hide() {
        this.hideTimeout = setTimeout(() => {
            this.shadowRoot.querySelector(this.selector).classList.remove(`show`);
        }, 2000);
    }
    /**
     * Status is pending
     * @public
     */
    onPending() {
        this.show();
        this.shadowRoot
            .querySelector(this.selector)
            .classList.remove(`error`, `warning`, `success`);
        this.shadowRoot.querySelector(this.selector).classList.add(`pending`);
        this.hide();
    }
    /**
     * Status is success
     * @public
     */
    onSuccess() {
        this.show();
        this.shadowRoot
            .querySelector(this.selector)
            .classList.remove(`error`, `warning`, `pending`);
        this.shadowRoot.querySelector(this.selector).classList.add(`success`);
        this.hide();
    }
    /**
     * Status is error
     * @public
     */
    onError() {
        this.show();
        this.shadowRoot
            .querySelector(this.selector)
            .classList.remove(`warning`, `success`, `pending`);
        this.shadowRoot.querySelector(this.selector).classList.add(`error`);
    }
    /**
     * Status is warning
     * @public
     */
    onWarning() {
        this.show();
        this.shadowRoot
            .querySelector(this.selector)
            .classList.remove(`error`, `success`, `pending`);
        this.shadowRoot.querySelector(this.selector).classList.add(`warning`);
    }
    static get observedAttributes() {
        return [`has-errors`, `has-warnings`, `action`];
    }
    attributeChangedCallback() {
        if (this.hasAttribute(`has-errors`))
            return this.onError();
        if (this.hasAttribute(`has-warnings`))
            return this.onWarning();
        if (!this.hasAttribute(`has-errors`) &&
            !this.hasAttribute(`has-warnings`) &&
            this.getAttribute(`action`) === `built`)
            return this.onSuccess();
        if (this.getAttribute(`action`) == `building` ||
            this.getAttribute(`action`) == `sync`)
            return this.onPending();
    }
}
exports.Component = Component;


/***/ }),

/***/ "../../../../bud-client/lib/hot/components/indicator/indicator.controller.js":
/*!***********************************************************************************!*\
  !*** ../../../../bud-client/lib/hot/components/indicator/indicator.controller.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Controller = void 0;
/**
 * Activity indicator controller
 * @public
 */
class Controller {
    /**
     * Initialization
     * @public
     */
    constructor() {
        /**
         * Active WHM payload
         * @public
         */
        this.payload = null;
        this.node = document.createElement(`bud-activity-indicator`);
        this.update = this.update.bind(this);
    }
    /**
     * Append `bud-error` element to the DOM
     *
     * @public
     */
    addNode() {
        var _a;
        if (document.body.querySelector(`bud-activity-indicator`)) {
            if (typeof this.timer.unref === `function`)
                this.timer.unref();
            this.removeNode();
        }
        (_a = document.body) === null || _a === void 0 ? void 0 : _a.appendChild(this.node);
        this.timer = setTimeout(this.removeNode, 3000);
    }
    /**
     * Remove `bud-error` element from the DOM (if present)
     *
     * @public
     */
    removeNode() {
        var _a;
        (_a = document.body.querySelector(`bud-activity-indicator`)) === null || _a === void 0 ? void 0 : _a.remove();
    }
    /**
     * Update activity indicator
     * @public
     */
    update(payload) {
        var _a, _b;
        this.node.toggleAttribute(`has-errors`, ((_a = payload.errors) === null || _a === void 0 ? void 0 : _a.length) ? true : false);
        this.node.toggleAttribute(`has-warnings`, ((_b = payload.warnings) === null || _b === void 0 ? void 0 : _b.length) ? true : false);
        this.node.setAttribute(`action`, payload.action);
        this.addNode();
    }
}
exports.Controller = Controller;


/***/ }),

/***/ "../../../../bud-client/lib/hot/components/indicator/indicator.pulse.js":
/*!******************************************************************************!*\
  !*** ../../../../bud-client/lib/hot/components/indicator/indicator.pulse.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.pulse = void 0;
/**
 * CSS animation for reload indicator
 * @public
 */
const pulse = (name, color) => `
  .${name} {
    box-shadow: 0 0 0 0 rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]});
    animation: ${name}__pulse 2s infinite;
    transition: all 0.4s ease-in-out;
  }

  .${name}:not(.show) {
    background-color: rgba(${color[0]}, ${color[1]}, ${color[2]}, 0);
  }

  .${name}.show {
    background-color: rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]});
  }

  @keyframes ${name}__pulse {
    0% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.7);
    }

    70% {
      transform: scale(1);
      box-shadow: 0 0 0 10px rgba(${color[0]}, ${color[1]}, ${color[2]}, 0);
    }

    100% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(${color[0]}, ${color[1]}, ${color[2]}, 0);
    }
  }
`;
exports.pulse = pulse;


/***/ })

}]);