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
    !bud.options.get('extensions').includes('.vue') &&
      bud.options.set('extensions', [...bud.options.get('extensions'), '.vue'])
  }

  if (matches.includes('.jsx')) {
    !bud.options.get('extensions').includes('.jsx') &&
      bud.options.set('extensions', [...bud.options.get('extensions'), '.jsx'])
  }

  if (matches.includes('.ts') || matches.includes('.tsx')) {
    !bud.options.get('extensions').includes('.ts') &&
      bud.options.set('extensions', [...bud.options.get('extensions'), '.ts'])

    !bud.options.get('extensions').includes('.tsx') &&
      bud.options.set('extensions', [...bud.options.get('extensions'), '.tsx'])
  }

  if (matches.includes('.scss')) {
    !bud.options.get('extensions').includes('.scss') &&
      bud.options.set('extensions', [...bud.options.get('extensions'), '.scss'])
  }

  return matches
}

export {usedExt}
