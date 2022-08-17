/* eslint-disable no-console */
import type {Config} from '@roots/bud-framework'
import {execa} from 'execa'
import {platform} from 'node:os'
import {join} from 'node:path'

/**
 * Ensure notifier permissions (macOS)
 *
 * @param context - application context
 * @public
 */
export default async function ensureNotifierPermissions(
  context: Partial<Config.Context>,
) {
  if (platform() === `darwin`) {
    try {
      const notifierPath = join(
        context.bud.basedir,
        `vendor`,
        `mac.no-index`,
        `roots-notifier.app`,
        `Contents`,
        `MacOS`,
        `roots-notifier`,
      )

      await execa(`chmod`, [`u+x`, notifierPath])
    } catch (err) {}
  }
}
