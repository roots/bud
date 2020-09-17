const helpers = {
  standardizeFilePaths: (file: {
    name: string
    path: string
  }): {
    name: string
    path: string
  } => {
    file.name = file.name.replace(/\\/g, '/')
    file.path = file.path.replace(/\\/g, '/')

    return file
  },
}

export {helpers as default}
