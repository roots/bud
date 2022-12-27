import type Extensions from '@roots/bud-extensions'
import type {Bud} from '@roots/bud-framework'

export function handleManifestSchemaWarning(this: Extensions, bud: Bud) {
  if (!bud.context.manifest?.bud) return

  if (bud.context.manifest.bud.allowlist) {
    bud.context.manifest.bud.extensions = {
      ...(bud.context.manifest.bud.extensions ?? {}),
      allowlist: bud.context.manifest.bud.allowlist,
    }

    this.logger.warn(
      `package.json: bud.allowlist is deprecated. Use bud.extensions.allowlist instead.`,
    )
  }

  if (bud.context.manifest.bud.denylist) {
    bud.context.manifest.bud.extensions = {
      ...(bud.context.manifest.bud.extensions ?? {}),
      denylist: bud.context.manifest.bud.denylist,
    }

    this.logger.warn(
      `package.json: bud.denylist is deprecated. Use bud.extensions.denylist instead.`,
    )
  }
}
