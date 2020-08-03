const implementing = () => {
  try {
    if (require.resolve('sass')) {
      return {
        name: 'dart-sass',
        implementation: require('sass'),
      }
    }
  } catch {
    return {
      name: 'node-sass',
      implementation: require('node-sass'),
    }
  }
}

const useScss = (rule, bud) => {
  const loader = bud.loaders.get('scss')
  const {name, implementation} = implementing()

  const options = {
    sourceMap: bud.features.enabled('sourceMap'),
    implementation,
  }

  bud.logger.info({name: rule}, `sass-loader: using ${name} implementation`)
  bud.logger.info({name: rule, loader, options}, `using sass-loader`)

  return {loader, options}
}

export {useScss}
