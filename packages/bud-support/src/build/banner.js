"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.banner = void 0;
/* eslint-disable */
const banner = (pkg) => `/**
 * ${pkg.name} v.${pkg.version} {@link ${pkg.homepage}}
 *
 * ${pkg.description}
 *
 * Issues? {@link ${pkg.bugs.url}}
 *
 * Consider funding our work 🙏🏽 {@link ${pkg.funding.url}}
 *
 * @copyright ${new Date().getFullYear()} Roots {@link https://roots.io}
 * @license ${pkg.license}
 */

 `;
exports.banner = banner;
//# sourceMappingURL=banner.js.map