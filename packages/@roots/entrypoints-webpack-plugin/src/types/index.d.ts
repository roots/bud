namespace Entrypoints {
  interface Plugin {
    name: string
    assets: Entrypoints.Entry
  }

  interface Entry {
    [entry: string]: {
      [type: string]: {
        [source: string]: string
      }
    }
  }
}
