/* eslint-disable @typescript-eslint/explicit-member-accessibility */
export default Command =>
  class extends Command {
    static paths = [[`kjo`, `site`]]
    static usage = {category: `kjo`}

    async execute() {
      await this.$([
        `yarn ts-node ./dev/site`,
        `yarn kjo site readme`,
      ])
      await this.$([`yarn docusaurus build`])
    }
  }
