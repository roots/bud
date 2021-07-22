/* eslint-disable @typescript-eslint/explicit-member-accessibility */
export default Command =>
  class extends Command {
    static paths = [[`kjo`, `site`, `readme`]]

    static usage = {
      category: `kjo`,
      description: `rebuild readmes`,
      examples: [[`Make site`, `yarn kjo site readme`]],
    }

    async execute() {
      await this.$([`yarn ts-node ./dev/readme`])
    }
  }
