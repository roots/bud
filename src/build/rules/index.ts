import { eslint } from "./js/eslint";
import { babel } from "./js/babel";
import { typescript } from "./js/typescript";

import { css } from "./css/css";
import { module as cssModule } from "./css/module";
import { scss } from "./scss/scss";
import { module as scssModule } from "./scss/module";

import { font } from "./font";
import { image } from "./image";
import { svg } from "./svg";

/**
 * Webpack loaders
 * @type {function} rules
 */
const rules = (bud) => ({
  bud,

  options: {},

  /**
   * Make webpack rules
   */
  make: function () {
    this.options = {
      module: {
        rules: [],
      },
    };

    this.bud.featureEnabled("eslint") &&
      this.options.module.rules.push(eslint(this.bud).make());

    this.bud.featureEnabled("typescript") &&
      this.options.module.rules.push(typescript(this.bud).make());

    this.bud.featureEnabled("babel") &&
      this.options.module.rules.push(babel(this.bud).make());

    this.bud.featureEnabled("css") &&
      this.options.module.rules.push(css(this.bud).make());

    this.bud.featureEnabled("cssModules") &&
      this.options.module.rules.push(cssModule(this.bud).make());

    this.bud.featureEnabled("scss") &&
      this.options.module.rules.push(scss(this.bud).make());

    this.bud.featureEnabled("scssModules") &&
      this.options.module.rules.push(scssModule(this.bud).make());

    this.bud.featureEnabled("font") &&
      this.options.module.rules.push(font(this.bud).make());

    this.bud.featureEnabled("image") &&
      this.options.module.rules.push(image(this.bud).make());

    this.bud.featureEnabled("svg") &&
      this.options.module.rules.push(svg(this.bud).make());

    return this.options;
  },
});

export { rules };
