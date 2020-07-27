import MiniCssExtractPlugin from "mini-css-extract-plugin";
import type { WebpackAdapter } from "./types";

const miniCssExtract: WebpackAdapter = () => ({
  setOptions: function () {
    return {
      filename: this.bud.state.features.hash
        ? `[name].[hash:8].css`
        : "[name].css",
    };
  },
  make: function () {
    return new MiniCssExtractPlugin(this.options);
  },
  when: function () {
    return (
      this.bud.featureEnabled("css") ||
      this.bud.featureEnabled("scss") ||
      this.bud.featureEnabled("postcss") ||
      this.bud.featureEnabled("scssModules") ||
      this.bud.featureEnabled("cssModules")
    );
  },
});

export { miniCssExtract };
