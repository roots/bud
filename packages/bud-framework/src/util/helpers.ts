const helpers = {
  standardizeFilePaths: file => {
    file.name = file.name.replace(/\\/g, '/')
    file.path = file.path.replace(/\\/g, '/')

    return file
  },
}

export {helpers as default}
