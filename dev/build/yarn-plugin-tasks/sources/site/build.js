/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import sh from '../sh'

export default Command =>
  class extends Command {
    static paths = [[`task`, `site`]]

    static usage = {
      category: `task`,
      description: `Build site`,
      examples: [[`Build site`, `yarn task site`]],
    }

    async execute() {
      const $ = sh.bind(this)

      await $([
        `yarn ts-node ./dev/site`,
        `yarn task site:readme`,
      ])
      await $([`yarn docusaurus build`])
    }
  }
