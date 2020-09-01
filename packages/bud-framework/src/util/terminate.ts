const terminate: any = options => {
  const exit = (code: number) => {
    options?.dump ? process.abort() : process.exit(code)
  }

  return () => err => {
    if (err) {
      console.log(err.message, err.stack)
    }

    setTimeout(exit, options?.timeout ?? 0).unref()
  }
}

export {terminate}
