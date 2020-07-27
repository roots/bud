import { join } from "path";

/**
 * Webpack resolvers.
 *
 * @param {object}
 */
const webpackResolve = (bud) => ({
  bud,
  options: {
    resolve: {
      extensions: [".js", ".json"],
      modules: [
        bud.src(""),
        bud.project("node_modules"),
        join(bud.state.paths.framework, "/node_modules"),
      ],
      alias: bud.state.options.alias || {},
    },
  },
  make: function () {
    this.bud.state.features.jsx && this.options.resolve.extensions.push("jsx");
    this.bud.state.features.ts && this.options.resolve.extensions.push("ts");
    this.bud.state.features.tsx && this.options.resolve.extensions.push("tsx");

    return this.options;
  },
});

export { webpackResolve };
