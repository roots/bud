import { css } from './css/css';
import { module as cssModule } from './css/module';
import { font } from './font';
import { image } from './image';
import { svg } from './svg';
/**
 * Webpack loaders
 */
var rules = function (bud) { return ({
    bud: bud,
    target: {
        module: {
            rules: []
        }
    },
    make: function () {
        var _this = this;
        var rules = this.bud.rules.repository;
        rules.forEach(function (value) {
            _this.target.module.rules.push(value(_this.bud));
        });
        if (this.bud.features.enabled('css')) {
            this.bud.logger.info({ name: 'webpack.rules' }, "supports css");
            this.target.module.rules.push(css(this.bud).make());
        }
        if (this.bud.features.enabled('cssModules')) {
            this.bud.logger.info({ name: 'webpack.rules' }, "supports css modules");
            this.target.module.rules.push(cssModule(this.bud).make());
        }
        if (this.bud.features.enabled('font')) {
            this.bud.logger.info({ name: 'webpack.rules' }, "supports fonts");
            this.target.module.rules.push(font(this.bud).make());
        }
        if (this.bud.features.enabled('image')) {
            this.bud.logger.info({ name: 'webpack.rules' }, "supports images");
            this.target.module.rules.push(image(this.bud).make());
        }
        if (this.bud.features.enabled('svg')) {
            this.bud.logger.info({ name: 'webpack.rules' }, "supports svg");
            this.target.module.rules.push(svg(this.bud).make());
        }
        this.target.module.rules = this.bud.hooks.filter('webpack.module.rules', this.target.module.rules);
        this.bud.logger.info({ name: 'webpack.rules', value: this.target }, "webpack.rules has been generated");
        return this.target;
    }
}); };
export { rules };
//# sourceMappingURL=index.js.map