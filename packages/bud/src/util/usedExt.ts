const usedExt = (entries, bud) => {
  entries.forEach(entry => {
    const ext = entry.split('.')[entry.split('.').length - 1]

    !bud.options.get('resolve.extensions').includes(ext) &&
      bud.options.set('resolve.extensions', [
        ...bud.options.get('resolve.extensions'),
        `.${ext}`,
      ])
  })
}

export {usedExt}
