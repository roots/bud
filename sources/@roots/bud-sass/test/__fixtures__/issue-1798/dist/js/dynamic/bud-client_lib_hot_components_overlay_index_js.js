"use strict";
(self["webpackChunk_tests_issue_1798"] = self["webpackChunk_tests_issue_1798"] || []).push([["bud-client_lib_hot_components_overlay_index_js"],{

/***/ "../../../../bud-client/lib/hot/components/overlay/index.js":
/*!******************************************************************!*\
  !*** ../../../../bud-client/lib/hot/components/overlay/index.js ***!
  \******************************************************************/
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
const overlay_component_js_1 = __webpack_require__(/*! ./overlay.component.js */ "../../../../bud-client/lib/hot/components/overlay/overlay.component.js");
const overlay_controller_js_1 = __webpack_require__(/*! ./overlay.controller.js */ "../../../../bud-client/lib/hot/components/overlay/overlay.controller.js");
const make = () => __awaiter(void 0, void 0, void 0, function* () {
    if (customElements.get(`bud-error`))
        return;
    customElements.define(`bud-error`, overlay_component_js_1.Component);
    return new overlay_controller_js_1.Controller();
});
exports.make = make;


/***/ }),

/***/ "../../../../bud-client/lib/hot/components/overlay/overlay.component.js":
/*!******************************************************************************!*\
  !*** ../../../../bud-client/lib/hot/components/overlay/overlay.component.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Component = void 0;
/**
 * Component container
 *
 * @public
 */
class Component extends HTMLElement {
    constructor() {
        super();
        this.name = `bud-overlay`;
        this.renderShadow();
    }
    get message() {
        return this.getAttribute(`message`);
    }
    renderShadow() {
        const container = document.createElement(`div`);
        container.classList.add(`overlay`);
        container.innerHTML = `
      <style>
        .overlay {
          width: 100vw;
          backdrop-filter: blur(10px);
          display: flex;
          height: 100vh;
          border-top: 2px solid transparent;
          overflow-x: hidden;
          overflow-y: scroll;
          position: absolute;
          top: -1000px;
          left: 0;
          right: 0;
          bottom: 0;
          opacity: 0;
          transition: opacity 0.2s ease-in-out, border 0.4s ease-in-out;
          justify-content: center;
        }

        .visible {
          position: fixed;
          top: 0;
          z-index: 9998;
          opacity: 1;
          border-top: 5px solid red;
          transition: opacity 0.2s ease-in-out, border 0.4s ease-in-out;
          max-width: 100vw;
        }

        .messages {
          background-color: white;
          border-radius: 5px;
          filter: drop-shadow(0 1px 2px rgb(0 0 0 / 0.1)) drop-shadow(0 1px 1px rgb(0 0 0 / 0.06));
          display: flex;
          align-self: center;
          width: 800px;
          max-width: 90vw;
          margin-left: auto;
          margin-right: auto;
          flex-direction: column;
          flex-wrap: wrap;
          align-items: center;
          align-content: center;
          padding: 2rem 2rem 0rem 2rem;
        }

        .visible .messages > div {
          position: relative;
          top: 0;
          opacity: 1;
          transition: all: 0.2s ease-in-out;
        }

        .messages > div {
          position: relative;
          top: 20px;
          opacity: 0;
          transition: all: 0.2s ease-in-out;
          align-items: center;
          align-content: center;
          color: rgba(0, 0, 0, 0.87);
          flex-direction: column;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
          padding: 0rem 2rem 2rem 2rem;
          width: 100%;
          max-width:95vw;
        }

        .messages > div > pre {
          font-weight: 300;
          font-size: 0.8rem;
          overflow-x: scroll;
        }

        pre {
          background: #303030;
          color: #f1f1f1;
          padding: 10px 16px;
          border-radius: 2px;
          border-top: 4px solid #dd0303;
          -moz-box-shadow: inset 0 0 10px #000;
          box-shadow: inset 0 0 10px #000;
          counter-reset: line;
        }

        pre span {
          display: block;
          line-height: 1.5rem;
        }

        pre span:before {
          counter-increment: line;
          content: counter(line);
          display: inline-block;
          border-right: 1px solid #ddd;
          padding: 0 .5em;
          margin-right: .5em;
          color: #888;
          width: 30px;
        }
      </style>
      <div class="messages"></div>
    `;
        this.attachShadow({ mode: `open` }).appendChild(container);
    }
    static get observedAttributes() {
        return [`message`];
    }
    attributeChangedCallback() {
        var _a, _b, _c;
        if (!this.documentBodyStyle)
            this.documentBodyStyle = (_a = document.body) === null || _a === void 0 ? void 0 : _a.style;
        if (this.getAttribute(`message`)) {
            document.body.style.overflow = `hidden`;
            this.shadowRoot.querySelector(`.overlay`).classList.add(`visible`);
            this.shadowRoot.querySelector(`.messages`).innerHTML =
                this.getAttribute(`message`);
            return;
        }
        if (((_b = this.documentBodyStyle) === null || _b === void 0 ? void 0 : _b.overflow) && ((_c = document === null || document === void 0 ? void 0 : document.body) === null || _c === void 0 ? void 0 : _c.style)) {
            document.body.style.overflow = this.documentBodyStyle.overflow;
        }
        this.shadowRoot.querySelector(`.overlay`).classList.remove(`visible`);
    }
    connectedCallback() {
        var _a;
        if ((_a = document.body) === null || _a === void 0 ? void 0 : _a.style)
            this.documentBodyStyle = document.body.style;
    }
}
exports.Component = Component;


/***/ }),

/***/ "../../../../bud-client/lib/hot/components/overlay/overlay.controller.js":
/*!*******************************************************************************!*\
  !*** ../../../../bud-client/lib/hot/components/overlay/overlay.controller.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Controller = void 0;
const ansiPattern = [
    `[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)`,
    `(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))`,
].join(`|`);
const stripAnsi = (body) => { var _a, _b; return (_b = (_a = body === null || body === void 0 ? void 0 : body.replace) === null || _a === void 0 ? void 0 : _a.call(body, new RegExp(ansiPattern, `g`), ``)) !== null && _b !== void 0 ? _b : body; };
/**
 * Overlay controller
 * @public
 */
class Controller {
    /**
     * Class constructor
     *
     * @public
     */
    constructor() {
        this.update = this.update.bind(this);
        this.element = document.createElement(`bud-error`);
    }
    /**
     * Formatted error message
     * @public
     */
    get message() {
        var _a;
        return (_a = this.payload.errors) === null || _a === void 0 ? void 0 : _a.reduce((a, c) => {
            var _a, _b;
            const msg = (_b = (_a = c === null || c === void 0 ? void 0 : c.message) !== null && _a !== void 0 ? _a : c === null || c === void 0 ? void 0 : c.error) !== null && _b !== void 0 ? _b : c;
            if (!msg)
                return a;
            return `${a}
        <div>
          <pre>${stripAnsi(msg)}</pre>
        </div>`;
        }, ``);
    }
    /**
     * Append `bud-error` element to the DOM
     *
     * @public
     */
    createError() {
        var _a;
        !document.body.querySelector(`bud-error`) &&
            ((_a = document.body) === null || _a === void 0 ? void 0 : _a.appendChild(this.element));
    }
    /**
     * Remove `bud-error` element from the DOM (if present)
     *
     * @public
     */
    removeError() {
        var _a;
        (_a = document.body.querySelector(`bud-error`)) === null || _a === void 0 ? void 0 : _a.remove();
    }
    /**
     * Update DOM
     *
     * @public
     */
    update(payload) {
        var _a, _b;
        this.payload = payload;
        this.element.setAttribute(`message`, (_a = this.message) !== null && _a !== void 0 ? _a : ``);
        if (((_b = this.payload.errors) === null || _b === void 0 ? void 0 : _b.length) > 0) {
            return this.createError();
        }
        this.removeError();
    }
}
exports.Controller = Controller;


/***/ })

}]);