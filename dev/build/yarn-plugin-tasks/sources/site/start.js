/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import sh from '../sh'

export default Command =>
  class extends Command {
    static paths = [[`task`, `site`, `start`]]

    static usage = {
      category: `task`,
      description: `site start`,
      examples: [[`Build site`, `yarn task site start`]],
    }

    async execute() {
      const $ = sh.bind(this)

      await $([`yarn ts-node ./dev/site`])
      await $([`yarn docusaurus start`])
    }
  }
