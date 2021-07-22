/* eslint-disable @typescript-eslint/explicit-member-accessibility */
export default Command =>
  class extends Command {
    static paths = [[`kjo`, `lint`]]
    static usage = {category: `kjo`}

    async execute() {
      await this.$([
        [
          `yarn kjo lint eslint`,
          `yarn kjo lint prettier`,
          `yarn kjo lint skypack`,
        ],
      ])
    }
  }
