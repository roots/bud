import { loaders } from "../util/loaders";
import { patterns } from "../util/patterns";
import { postCss } from "../use/postCss";
import { resolveUrl } from "../use/resolveUrl";

/**
 * CSS modules
 *
 * @return {object}
 */
const module = (bud) => ({
  bud,
  rule: {
    test: patterns.cssModule,
    use: [
      loaders.miniCss(bud.featureEnabled("hot")),
      {
        loader: loaders.css,
        options: {
          modules: true,
          onlyLocals: false,
        },
      },
      resolveUrl(bud).make(),
    ],
  },

  /**
   * Make CSS Modules object
   */
  make: function () {
    this.pre();

    if (this.bud.featureEnabled("postCss")) {
      this.use.push(postCss(this.bud).make());
    }

    this.post();

    return this.rule;
  },

  /**
   * hook: pre_css_module
   */
  pre: function () {
    this.bud.hooks.call("pre_css_module", this);
  },

  /**
   * hook: post_css_module
   */
  post: function () {
    this.bud.hooks.call("pre_css_module", this.output);
  },
});

export { module };
