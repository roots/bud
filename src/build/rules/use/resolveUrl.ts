import { loaders } from "../util/loaders";

const resolveUrl = (bud) => ({
  bud,

  loader: loaders.resolveUrl,

  options: {
    engine: "postcss",
    sourceMap: bud.state.features.map,
    debug: true,
  },

  make: function () {
    this.bud.hooks.call("pre_resolveurl", this);
    this.output = {
      loader: this.loader,
      options: this.options,
    };
    this.bud.hooks.call("post_resolveurl", this.output);

    return this.output;
  },
});

export { resolveUrl };
