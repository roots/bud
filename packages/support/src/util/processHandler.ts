import terminate from './terminate'

const processHandler = (error: Error): void => {
  process.exitCode = 1
  process.nextTick(() => {
    console.error(error)

    terminate()
  })
}

export {processHandler}
