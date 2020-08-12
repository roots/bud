"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const api_1 = __importDefault(require("./api"));
const tailwind = (bud) => ({
    bud,
    options: {
        postCss: bud.options.get('postCss'),
        scss: bud.options.get('scss'),
    },
    twConfig: bud.file.from('project').get('tailwind.config.js').path(),
    make: function () {
        this.bud.tailwind = api_1.default;
        this.twConfig && this.addTailwind({ config: this.twConfig });
        this.configureSass();
    },
    addTailwind: function (options) {
        this.bud.options.set('postCss', {
            ...this.options.postCss,
            plugins: [...this.options.postCss.plugins, tailwind(options)],
        });
    },
    configureSass: function () {
        const scss = this.bud.options.get('scss');
        scss.sassOptions = {
            processCssUrls: false,
            ...scss.sassOptions,
        };
        return scss;
    },
});
module.exports = tailwind;
//# sourceMappingURL=index.js.map