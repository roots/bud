/* eslint-disable @typescript-eslint/explicit-member-accessibility */
export default Command =>
  class extends Command {
    static paths = [[`kjo`, `test`, `integration`]]
    static usage = {category: `kjo`}

    async execute() {
      await this.$([`node ./jest.integration.js`])
    }
  }
