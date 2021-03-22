/**
 * Tailwind configuration example
 *
 * @typedef {import('@roots/sage').Sage} Sage
 * @type {(sage: Sage): Sage}
 */

module.exports = (sage) =>
  sage.entry({
    app: ['**/app.{(j|t)s(x)?,(s)?css}'],
  });
