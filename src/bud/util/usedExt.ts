const entryIncludesExt = entry => {
  const matches = [
    {
      ext: '.scss',
      contains: entry.match(/\.scss$/),
    },
    {
      ext: '.jsx',
      contains: entry.match(/\.jsx$/),
    },
    {
      ext: '.ts',
      contains: entry.match(/\.(ts|tsx)$/),
    },
    {
      ext: '.vue',
      contains: entry.match(/\.(vue)$/),
    },
  ]

  return matches.filter(({contains}) => contains).map(({ext}) => ext)
}

const usedExt = (entries, bud) => {
  let matches = []

  entries.forEach(entry => {
    const exts = entryIncludesExt(entry)

    exts.forEach(ext => {
      if (!matches[ext]) {
        matches = [...matches, ext]
      }
    })
  })

  /**
   * Enable features based on usage
   */
  if (matches.includes('.vue')) {
    bud.features.enable('vue')

    !bud.options.get('extensions')['.vue'] &&
      bud.options.set('extensions', [
        ...bud.options.get('extensions'),
        '.vue',
      ])
  }

  if (matches.includes('.jsx')) {
    bud.features.enable('react')
    !bud.options.get('extensions')['.jsx'] &&
      bud.options.set('extensions', [
        ...bud.options.get('extensions'),
        '.jsx',
      ])
  }

  if (matches.includes('.ts') || matches.includes('.tsx')) {
    bud.features.enable('typescript')
    !bud.options.get('extensions')['.ts'] &&
      bud.options.set('extensions', [
        ...bud.options.get('extensions'),
        '.ts',
      ])
    !bud.options.get('extensions')['.tsx'] &&
      bud.options.set('extensions', [
        ...bud.options.get('extensions'),
        '.tsx',
      ])
  }

  if (matches.includes('.scss')) {
    bud.features.enable('scss')
  }

  return matches
}

export {usedExt}
