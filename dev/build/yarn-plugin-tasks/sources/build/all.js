/* eslint-disable @typescript-eslint/explicit-member-accessibility */
export default Command =>
  class extends Command {
    static paths = [[`kjo`, `build`]]
    static usage = {category: `kjo`}

    async execute() {
      await this.$([
        [`yarn kjo build cjs`, `yarn kjo build esm`],
      ])
    }
  }
