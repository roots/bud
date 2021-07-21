/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import sh from '../sh'

export default Command =>
  class extends Command {
    static paths = [[`kjo`, `clean`]]

    static usage = {
      category: `kjo`,
      description: `Clean kjo of all built artifacts`,
      examples: [[`Clean`, `yarn clean`]],
    }

    async execute() {
      const $ = sh.bind(this)

      await $([
        `rm -rf **/.budfiles`,
        `rm -rf **/node_modules`,
        `rm -rf examples/*/dist`,
        `rm -rf examples/sage/public/*`,
        `rm -rf examples/sage/storage/bud/*`,
        `rm -rf packages/*/*/lib`,
        `rm -rf packages/*/*/types`,
      ])

      await $([`yarn cache clean`])
    }
  }
