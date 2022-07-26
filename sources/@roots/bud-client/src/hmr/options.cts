declare global {
  const __webpack_public_path__: string
}

let options = {
  path: '/__bud/hmr',
  timeout: 20 * 1000,
  reload: false,
  name: 'bud',
}

const override = overrides => {
  if (typeof overrides.path !== 'undefined') options.path = overrides.path

  if (typeof overrides.timeout !== 'undefined')
    options.timeout = overrides.timeout

  if (typeof overrides.reload !== 'undefined')
    options.reload = overrides.reload === true

  if (typeof overrides.name !== 'undefined') options.name = overrides.name
}

export {options, override}
