/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import sh from './sh'

export default Command =>
  class extends Command {
    static paths = [[`task`]]

    static usage = {
      category: `task`,
      description: `Run project tasks`,
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
