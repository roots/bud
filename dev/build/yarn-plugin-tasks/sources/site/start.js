/* eslint-disable @typescript-eslint/explicit-member-accessibility */

export default Command =>
  class extends Command {
    static paths = [[`kjo`, `site`, `start`]]
    static usage = {category: `kjo`}

    async execute() {
      await this.$([
        `yarn ts-node ./dev/site`,
        `yarn docusaurus start`,
      ])
    }
  }
