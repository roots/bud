import type {Bud} from '..'

const terminate = (
  bud: Bud,
  options = {
    dump: false,
    timeout: 500,
  },
) => {
  const exit = (code: number) => {
    options.dump ? process.abort() : process.exit(code)
  }

  return (code: number) => err => {
    if (err && err instanceof Error) {
      console.log(err.message, err.stack)
    }

    setTimeout(exit, options.timeout).unref()
  }
}

export default terminate
