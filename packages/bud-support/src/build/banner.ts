/* eslint-disable */
const banner = (pkg: any): string => `/**
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
 */`
/* eslint-enable */

export {banner as default}
