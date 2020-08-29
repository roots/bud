import {Loose} from '@roots/bud-typings'

type TerminateReturn = () => (err: Error) => void
interface TerminateOptions extends Loose {
  dump?: boolean
  timeout?: number
}

type Terminate = (options?: TerminateOptions) => TerminateReturn

const terminate: Terminate = options => {
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

export {terminate, Terminate}
