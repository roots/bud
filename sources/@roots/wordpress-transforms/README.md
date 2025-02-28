<p align="center"><img src="https://cdn.roots.io/app/uploads/logo-bud.svg" height="100" alt="bud.js" /></p>

<p align="center">
  <img alt="MIT License" src="https://img.shields.io/github/license/roots/bud?color=%23525ddc&style=flat-square" />
  <img alt="npm" src="https://img.shields.io/npm/v/@roots/bud.svg?color=%23525ddc&style=flat-square" />
</p>

<h1 align="center"><strong>@roots/wordpress-transforms</strong></h1>

<p align="center">
  Transform requests for WordPress provided externals
</p>

---

## Installation

Install **@roots/wordpress-transforms** to your project.

Yarn:

```sh
yarn add @roots/wordpress-transforms --dev
```

npm:

```sh
npm install @roots/wordpress-transforms --save-dev
```

## Usage

### @roots/wordpress-transforms/handle

Transform a request for a WordPress provided package to its enqueue handle.

- `@wordpress/dom-ready` => `'dom-ready'`
- `react` => `'react'`
- `not-provided-package` => `undefined`

```ts
import { transform } from "@roots/wordpress-transforms/handle";

transform(`@wordpress/edit-post`);
// ==> `wp-edit-post`

transform(`lodash`);
// ==> `lodash`

transform(`non-match`);
// ==> undefined
```

### @roots/wordpress-transforms/window

Transform a request for a WordPress provided package to its window variable (expressesd as an array).

- `@wordpress/dom-ready` => `['wp', 'domReady']`
- `react` => `['React']`
- `not-provided-package` => `undefined`

```ts
import { transform } from "@roots/wordpress-transforms/window";

transform(`@wordpress/edit-post`);
// ==> [`wp`, `editPost`]

transform(`lodash`);
// ==> [`lodash`]

transform(`non-match`);
// ==> undefined
```

### @roots/wordpress-transforms/wordpress

Utilities used by [@roots/wordpress-transforms/handle](#rootswordpress-transformshandle) and [@roots/wordpress-transforms/window](#rootswordpress-transformswindow).

Examples:

```ts
import * as wp from "@roots/wordpress-transforms/wordpress";

wp.isLibrary(`jquery`); // true
wp.isLibrary(`@wordpress/dom-ready`); // false
wp.isLibrary(`non-match`); // false

wp.isProvided(`@wordpress/icons`); // false
wp.isProvided(`lodash`); // true

wp.isWordPressRequest(`@wordpress/element`); // true
wp.isWordPressRequest(`lodash`); // false

wp.normalize(`../node_modules/react-refresh/runtime/foo/bar`); // `react-refresh/runtime`
```

### @roots/wordpress-transforms

The three submodules are exported from root.

```ts
import { handle, window, wordpress } from "@roots/wordpress-transforms";

handle.transform(/**  */);

window.transform(/** */);

wordpress.isLibrary(/** */);
```

## Example

This is the plugin exported by `@roots/wordpress-externals-webpack-plugin`, which uses this library:

```ts
import { window } from "@roots/wordpress-transforms";
import Webpack, { type WebpackPluginInstance } from "webpack";

/**
 * {@link WebpackPluginInstance}
 */
export class WordPressExternalsWebpackPlugin implements WebpackPluginInstance {
  /**
   * {@link WebpackPluginInstance.apply}
   */
  public apply(compiler: Webpack.Compiler) {
    new Webpack.ExternalsPlugin(`window`, ({ request }, callback) => {
      const lookup = window.transform(request);
      return lookup ? callback(null, lookup) : callback();
    }).apply(compiler);
  }
}
```

## License

@roots/wordpress-transforms is licensed under MIT.
