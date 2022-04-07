import {Bud} from '@roots/bud-framework'
import {lodash} from '@roots/bud-support'
import {Container} from '@roots/container'

import {WPThemeJson} from '..'

const {isFunction} = lodash

/**
 * Callback function used to configure wordpress `theme.json`
 *
 * @public
 */
export interface Mutator {
  (json: Container<WPThemeJson['settings']>): Container<
    WPThemeJson['settings']
  >
}

export interface method {
  (input?: Mutator | WPThemeJson['settings'], raw?: boolean): Promise<Bud>
}

export interface facade {
  (input?: Mutator | WPThemeJson['settings'], raw?: boolean): Bud
}

const getContainerOptions = (app: Bud) =>
  app.extensions.get('wp-theme-json').options

const getRawOptions = (app: Bud) =>
  app.extensions.get('wp-theme-json').options.all()

export const method: method = async function (
  input?: Mutator | WPThemeJson['settings'],
  raw?: boolean,
) {
  const app = this as Bud

  if (!app.extensions.has('wp-theme-json')) return

  app.extensions.get('wp-theme-json').set('when', true)

  if (!input) return app

  isFunction(input)
    ? app.extensions
        .get('wp-theme-json')
        .setOption(
          'settings',
          raw === true ? getRawOptions(app) : getContainerOptions(app),
        )
    : app.extensions.get('wp-theme-json').setOption('settings', input)

  return app
}
