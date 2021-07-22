/* eslint-disable @typescript-eslint/explicit-member-accessibility */
export default Command =>
  class extends Command {
    static paths = [[`kjo`, `make`]]
    static usage = {
      category: `kjo`,
      description: `build the kjo`,
    }

    async execute() {
      await this.$([`yarn kjo clean`])
      await this.$([`yarn install --immutable`])
      await this.$([`yarn kjo build`])
      await this.$([
        `yarn kjo test unit`,
        `yarn kjo test integration`,
        `yarn kjo lint skypack`,
      ])
      await this.$([`yarn install`])
    }
  }
