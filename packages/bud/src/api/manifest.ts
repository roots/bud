import type {Bud} from './types'

type Manifest = (options?: {
  enabled: boolean
  name?: string
  publicPath?: string
  writeToFileEmit?: boolean
}) => Bud

const manifest: Manifest = function (options?) {
  this.features.set('manifest', options?.enabled ?? true)

  this.options.set('manifest.name', options?.name ?? 'manifest.json')
  this.options.set('manifest.publicPath', options?.publicPath ?? null)
  this.options.set('manifest.writeToFileEmit', options?.writeToFileEmit ?? true)

  return this
}

export {manifest}
export type {Manifest}
