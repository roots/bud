"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tryBuild = void 0;
const bud_support_1 = require("@roots/bud-support");
const preflight = __importStar(require("./preflight"));
const tryBuild = (cfgPath) => __awaiter(void 0, void 0, void 0, function* () {
    /**
     * Is this even an actual file?
     */
    try {
        bud_support_1.fs.statSync(cfgPath);
    }
    catch (err) {
        console.error(err);
        process.exit();
    }
    /**
     * Fingers crossed, yo.
     */
    Promise.resolve().then(() => __importStar(require(cfgPath))).then(cfg => {
        /**
         * If it is a default export from an esm module
         * then we'll invoke it.
         */
        (cfg === null || cfg === void 0 ? void 0 : cfg.hasOwnProperty('default')) &&
            typeof cfg.default == 'function' &&
            preflight.compile();
        /**
         * If it is a cjs export we'll call the
         * function that was passed in, bless em.
         */
        cfg && typeof cfg == 'function' && preflight.compile();
    })
        .catch(() => {
        require(cfgPath);
    });
});
exports.tryBuild = tryBuild;
//# sourceMappingURL=tryBuild.js.map