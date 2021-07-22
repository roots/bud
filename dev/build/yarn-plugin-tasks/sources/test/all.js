/* eslint-disable @typescript-eslint/explicit-member-accessibility */
export default Command =>
  class extends Command {
    static paths = [[`kjo`, `test`]]
    static usage = {category: `kjo`}

    async execute() {
      await this.$([`yarn kjo test unit`], false)
      await this.$([`yarn kjo test integration`], false)
    }
  }
