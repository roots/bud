import type {Framework, Server} from '@roots/bud-framework'
import {chalk} from '@roots/bud-support'

export interface watch {
  (files: Server.Configuration['watch']['files']): Framework
}

export const watch: watch = function (files) {
  this.root as Framework
  this.root.api.log('success', {
    message: `watch files added`,
    suffix: chalk.dim(files.join(', ')),
  })

  if (!this.root.isDevelopment || !this.root.server) {
    this.root.api.log('log', {
      message: 'skipping watch files',
      suffix: 'production mode is set',
    })
    return this.root
  }

  files && this.root.store.set('server.watch.files', files)

  return this
}
