const usedExt = (entries, bud) => {
  entries.forEach(entry => {
    const ext = `.${entry.split('.')[entry.split('.').length - 1]}`

    !bud.options
      .get('webpack.resolve.extensions')
      .includes(`.${ext}`) &&
      bud.options.set('webpack.resolve.extensions', [
        ...bud.options.get('webpack.resolve.extensions'),
        `.${ext}`,
      ])
  })
}

export {usedExt}
