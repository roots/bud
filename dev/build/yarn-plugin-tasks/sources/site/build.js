/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import sh from '../sh'

export default Command =>
  class extends Command {
    static paths = [[`proj`, `site`]]

    static usage = {
      category: `task`,
      description: `Build site`,
      examples: [[`Build site`, `yarn proj site`]],
    }

    async execute() {
      const $ = sh.bind(this)

      await $([
        `yarn ts-node ./dev/site`,
        `yarn proj site readme`,
      ])
      await $([`yarn docusaurus build`])
    }
  }
