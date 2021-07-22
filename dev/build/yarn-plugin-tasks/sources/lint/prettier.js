/* eslint-disable @typescript-eslint/explicit-member-accessibility */
export default Command =>
  class extends Command {
    static paths = [[`kjo`, `lint`, `prettier`]]
    static usage = {category: `kjo`}

    async execute() {
      await this.$([
        [
          `yarn prettier packages/**/src/**/*.{ts,js,tsx,jsx} --fix --ignore-unknown --loglevel silent --no-error-on-unmatched-pattern`,
          `yarn prettier examples/**/*.{ts,js,tsx,jsx} --fix --ignore-unknown --loglevel silent --no-error-on-unmatched-pattern`,
          `yarn prettier dev/**/*.{ts,js,tsx,jsx} --fix --ignore-unknown --loglevel silent --no-error-on-unmatched-pattern`,
        ],
      ])
    }
  }
