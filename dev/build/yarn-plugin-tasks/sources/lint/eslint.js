/* eslint-disable @typescript-eslint/explicit-member-accessibility */

export default Command =>
  class extends Command {
    static paths = [[`kjo`, `lint`, `eslint`]]
    static usage = {category: `kjo`}

    async execute() {
      await this.$([
        [
          `yarn eslint packages/**/src/**/*.{js,jsx,ts,tsx} --fix`,
          `yarn eslint dev/**/*.{js,jsx,ts,tsx} --fix`,
        ],
      ])
    }
  }
