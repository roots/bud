const terminate = (code?: number): void => {
  const exit = code => {
    process.exit(code)
  }

  setTimeout(() => exit(code ?? 0), 100).unref()
}

export {terminate as default}
