const filterUndefined = (obj: Record<string, any>) => {
  return Object.entries(obj).reduce((a, [k, v]) => {
    if (v === undefined) return a
    return {...a, [k]: v}
  }, {})
}

export {filterUndefined as default}
