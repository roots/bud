let options = {
  path: '/__bud/hmr',
  timeout: 20 * 1000,
  reload: false,
  name: 'bud',
}

export const set = overrides => {
  if (typeof overrides.path !== 'undefined') options.path = overrides.path

  if (typeof overrides.timeout !== 'undefined')
    options.timeout = overrides.timeout

  if (typeof overrides.reload !== 'undefined')
    options.reload = overrides.reload === true

  if (typeof overrides.name !== 'undefined') options.name = overrides.name
}

export const get = () => options
