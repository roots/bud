const terminate = (code?: number): void => {
  process.on('beforeExit', (code: number) => {
    console.log('Process beforeExit event with code: ', code)
  })

  process.on('exit', (code: number) => {
    console.log('Process exit event with code: ', code)
  })

  process.exit(code)
}

export {terminate as default}
