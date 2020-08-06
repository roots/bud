/**
 * Palette plugin
 *
 * @property {string} name - extension name
 * @property {Bud} bud - bud instance
 * @property {function () => void}    make - primary action of plugin
 * @property {function () => boolean} when - when false, plugin is skipped
 */
declare const palettePlugin: {
    name: string;
    make: () => void;
};
export { palettePlugin };
//# sourceMappingURL=roots-palette-plugin.d.ts.map