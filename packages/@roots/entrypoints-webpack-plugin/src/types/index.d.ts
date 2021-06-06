namespace Entrypoints {
  interface Plugin {
    name: string
    assets: Entrypoints.Entry
  }

  interface Entry {
    [entry: string]: {
      [type: string]: string[]
    }
  }

  interface Options {
    name?: string
    writeToFileEmit?: boolean
    publicPath?: string
    outputPath?: string
  }
}
