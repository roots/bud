/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import sh from '../sh'

export default Command =>
  class extends Command {
    static paths = [[`kjo`, `site`]]

    static usage = {
      category: `kjo`,
      description: `Build site`,
      examples: [[`Build site`, `yarn kjo site`]],
    }

    async execute() {
      const $ = sh.bind(this)

      await $([
        `yarn ts-node ./dev/site`,
        `yarn kjo site readme`,
      ])
      await $([`yarn docusaurus build`])
    }
  }
