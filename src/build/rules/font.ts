import { loaders } from "./util/loaders";
import { patterns } from "./util/patterns";

/**
 * Font module rules
 *
 * @typedef {function} font
 * @return {object}
 */
const font = (builder) => ({
  builder,
  make: function () {
    return {
      test: patterns.font,
      use: [
        {
          loader: loaders.url,
          options: {
            name: "[path][name].[ext]",
          },
        },
      ],
    };
  },
});

export { font };
