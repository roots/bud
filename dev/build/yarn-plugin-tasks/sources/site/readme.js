/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import sh from '../sh'

export default Command =>
  class extends Command {
    static paths = [[`kjo`, `site`, `readme`]]

    static usage = {
      category: `kjo`,
      description: `rebuild readmes`,
      examples: [[`Make site`, `yarn kjo site readme`]],
    }

    async execute() {
      const $ = sh.bind(this)

      await $([`yarn ts-node ./dev/readme`])
    }
  }
