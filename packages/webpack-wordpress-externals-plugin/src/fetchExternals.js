"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const windowVariables_1 = require("./windowVariables");
/** Gutenberg repo package.json @ master */
const GUTENBERG_PACKAGE_JSON = 'https://raw.githubusercontent.com/WordPress/gutenberg/master/package.json';
/**
 * Fetch declared dependencies from the wordpress/gutenberg repo
 */
const fetchExternals = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield node_fetch_1.default(GUTENBERG_PACKAGE_JSON);
        const { dependencies } = yield data.json();
        return Object.assign(Object.assign({}, transformPkgNames(dependencies)), windowVariables_1.windowVariables);
    }
    catch (err) {
        throw err;
    }
});
exports.default = fetchExternals;
/**
 * Filter and transform fetched packages
 */
const transformPkgNames = entries => Object.keys(entries)
    .filter(isWpDependency)
    .reduce(pkgNameReducer, {});
/**
 * Return true if package is in wordpress org scope
 */
const isWpDependency = dep => /^@wordpress\//.test(dep);
/**
 * Reduce scoped module names to a hash matching
 * them against their equivalent window var
 */
const pkgNameReducer = (mappedPkgs, pkgName) => (Object.assign(Object.assign({}, mappedPkgs), { [pkgName]: {
        window: windowName(pkgName),
        enqueue: enqueueName(pkgName),
    } }));
/**
 * Transform module names.
 */
const enqueueName = name => name.replace(/^@wordpress\/(.*)$/, (m, g) => `wp-${g}`);
/**
 * Transform module names.
 */
const windowName = name => name
    .replace(/^@wordpress\/(.*)$/, (m, g) => `wp.${g}`)
    .replace(/-(.)/g, (m, g) => g.toUpperCase());
//# sourceMappingURL=fetchExternals.js.map