/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import sh from '../sh'

export default Command =>
  class extends Command {
    static paths = [[`proj`, `site`, `readme`]]

    static usage = {
      category: `task`,
      description: `rebuild readmes`,
      examples: [[`Make site`, `yarn proj site readme`]],
    }

    async execute() {
      const $ = sh.bind(this)

      await $([`yarn ts-node ./dev/readme`])
    }
  }
