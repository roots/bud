/* eslint-disable @typescript-eslint/explicit-member-accessibility */
export default (Command, exec) =>
  class Base extends Command {
    constructor(options) {
      super(options)
    }

    async $(cmds) {
      await Promise.all(
        cmds.map(async cmd => {
          const [invoke, ...params] = cmd.split(' ')

          try {
            return exec(invoke, params)
          } catch (err) {
            throw new Error(err)
          }
        }),
      )

      return Promise.resolve()
    }
  }
