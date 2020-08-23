import {terminate} from './terminate'

const processHandler = (): void => {
  process.on('unhandledRejection', (error: Error) => {
    process.exitCode = 1
    process.nextTick(() => {
      console.error(error)

      terminate()
    })
  })
}

export {processHandler}
