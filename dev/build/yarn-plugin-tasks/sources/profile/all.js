/* eslint-disable @typescript-eslint/explicit-member-accessibility */
export default Command =>
  class extends Command {
    static paths = [[`kjo`, `profile`]]
    static usage = {category: `kjo`}

    async execute() {
      await this.$([
        `yarn kjo profile cjs`,
        `yarn kjo profile esm`,
      ])
    }
  }
