/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import sh from '../sh'

export default Command =>
  class extends Command {
    static paths = [[`task`, `site:readme`]]

    static usage = {
      category: `task`,
      description: `rebuild readmes`,
      examples: [[`Make site`, `yarn task site:readme`]],
    }

    async execute() {
      const $ = sh.bind(this)

      await $([`yarn ts-node ./dev/readme`])
    }
  }
