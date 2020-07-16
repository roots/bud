import {script} from './script'
import {eslint} from './eslint'
import {resources} from './resources'
import {style} from './style'

/**
 * Webpack loaders
 */
const loaders = bud => ({
  bud,
  script,
  eslint,
  resources,
  style,
  compile: function () {
    return {
      module: {
        strictExportPresence: true,
        rules: [
          this.eslint(this.bud).compile(),
          this.script(this.bud),
          ...this.style(this.bud).compile(),
          this.resources(),
        ],
      },
    }
  },
})

export {loaders}
