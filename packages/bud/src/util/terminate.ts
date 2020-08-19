import {Loose} from '@roots/bud-typings'

type Terminate = (options: TerminateOptions) => TerminateReturn
type TerminateReturn = () => (err: Error) => void
interface TerminateOptions extends Loose {
  dump?: boolean
  timeout?: number
}

/**
 * Terminate CLI execution
 */
const terminate: Terminate = (
  options: TerminateOptions = {
    dump: false,
    timeout: 500,
  },
) => {
  const exit = (code: number) => {
    options.dump ? process.abort() : process.exit(code)
  }

  return () => err => {
    if (err && err instanceof Error) {
      console.log(err.message, err.stack)
    }

    setTimeout(exit, options.timeout).unref()
  }
}

export {terminate}
export type {Terminate}
