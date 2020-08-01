/**
 * resolve whether to use dart-sass or node-sass
 */
const implementation = () => {
  try {
    return require.resolve('sass') ? require('sass') : require('node-sass')
  } catch {
    return require('node-sass')
  }
}

export {implementation}
