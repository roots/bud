/* eslint-disable @typescript-eslint/explicit-member-accessibility */
export default Command =>
  class extends Command {
    static paths = [[`kjo`, `make`, `ci`]]

    static usage = {
      category: `kjo`,
      description: `build the kjo (CI)`,
    }

    async execute() {
      await this.$([
        `yarn install --immutable`,
        `yarn kjo build cjs`,
        `yarn kjo test unit`,
        `yarn kjo test integration`,
        [`yarn kjo lint eslint`, `yarn kjo lint skypack`],
      ])
    }
  }
