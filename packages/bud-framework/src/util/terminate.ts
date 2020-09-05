const terminate = (code?: number): void => {
  const exit = code => {
    process.exit(code)
  }

  exit(code ?? 0)
}

export {terminate as default}
