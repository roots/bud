/* eslint-disable @typescript-eslint/explicit-member-accessibility */

export default Command =>
  class extends Command {
    static paths = [[`kjo`, `make`]]
    static usage = {category: `kjo`}

    async execute() {
      await this.$([
        `yarn kjo clean`,
        `yarn install --immutable`,
        `yarn kjo build`,
        `yarn kjo test unit`,
        `yarn kjo lint skypack`,
        `yarn install`,
      ])
    }
  }
