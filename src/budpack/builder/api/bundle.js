/**
 * Compile a group of assets.
 * @example bud.bundle('app', [bud.src('app.js'), bud.src('app.css')])
 * @typedef {function (name: {string}, entries: {string}[]) => {bud: import('./../index')}} bundle
 * @param   {string} name - output name.
 * @param   {array}  entries - array of src assets to include in the bundle.
 * @return  {import('./../index')} bud
 */
const bundle = function (name, entries) {
  this.options.entry = {
    ...this.options.entry,
    [`${name}`]: entries,
  }

  return this
}

export {bundle}
