/**
 * Development server settings
 * @param   {object} options
 * @return  {typeof import('./../index')} bud
 */
const dev = options => {
  this.options.dev = {
    ...this.options.dev,
    ...options,
  }

  return this
}

export {dev}
