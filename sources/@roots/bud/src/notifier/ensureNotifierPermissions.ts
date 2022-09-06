/* eslint-disable no-console */
import {execa} from 'execa'
import {platform} from 'node:os'

import {notifierPath} from './notifierPath.js'

/**
 * Ensure notifier permissions (macOS)
 *
 * @param context - application context
 * @public
 */
export default async function ensureNotifierPermissions() {
  if (platform() === `darwin`) {
    try {
      await execa(`chmod`, [`u+x`, notifierPath])
    } catch (err) {}
  }
}
