/* eslint-disable @typescript-eslint/explicit-member-accessibility */
export default Command =>
  class extends Command {
    static paths = [[`kjo`, `make`, `ci`]]

    static usage = {
      category: `kjo`,
      description: `build the kjo (CI)`,
    }

    async execute() {
      await this.$([`yarn install --immutable`])
      await this.$([`yarn kjo build cjs`])
      await this.$([`yarn kjo test`])
      await this.$([`yarn kjo site`])
    }
  }
