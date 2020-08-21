const api = function (this: any, blacklist: string[]) {
  this.options.set('palette-blacklist', blacklist)
  return this
}

export = api
