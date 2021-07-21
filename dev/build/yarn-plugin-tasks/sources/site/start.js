/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import sh from '../sh'

export default Command =>
  class extends Command {
    static paths = [[`kjo`, `site`, `start`]]

    static usage = {
      category: `kjo`,
      description: `site start`,
      examples: [[`Build site`, `yarn kjo site start`]],
    }

    async execute() {
      const $ = sh.bind(this)

      await $([`yarn ts-node ./dev/site`])
      await $([`yarn docusaurus start`])
    }
  }
