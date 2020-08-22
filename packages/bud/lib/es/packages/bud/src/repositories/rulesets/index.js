/**
 * @roots/bud v.2.0.0-next {@link https://roots.io/bud}
 *
 * A friendly build tool to help manage your project assets.
 *
 * Issues? {@link https://github.com/roots/bud/issues}
 *
 * Consider funding our work 🙏🏽 {@link https://github.com/sponsors/roots}
 *
 * @copyright 2020 Roots {@link https://roots.io}
 * @license MIT
 */
import 'tslib';
import { js } from './js.js';
import { css } from './css.js';
import { font } from './font.js';
import { image } from './image.js';
import { svg } from './svg.js';
export { loaders } from './loaders.js';

var rules = [js, css, font, image, svg];

export { rules };
