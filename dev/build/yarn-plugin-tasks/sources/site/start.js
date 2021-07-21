/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import sh from '../sh'

export default Command =>
  class extends Command {
    static paths = [[`proj`, `site`, `start`]]

    static usage = {
      category: `task`,
      description: `site start`,
      examples: [[`Build site`, `yarn proj site start`]],
    }

    async execute() {
      const $ = sh.bind(this)

      await $([`yarn ts-node ./dev/site`])
      await $([`yarn docusaurus start`])
    }
  }
