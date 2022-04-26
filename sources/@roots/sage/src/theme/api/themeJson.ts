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
  (json: Partial<WPThemeJson['settings']>): Partial<
    WPThemeJson['settings']
  >
}

export interface method {
  (input?: Mutator | Partial<WPThemeJson['settings']>): Promise<Bud>
}

export interface facade {
  (input?: Mutator | Partial<WPThemeJson['settings']>): Bud
}

export const method: method = async function (
  input?: Mutator | Partial<WPThemeJson['settings']>,
) {
  const app = this as Bud

  if (!app.extensions.has('wp-theme-json')) return

  app.extensions.get('wp-theme-json').set('when', async () => true)

  if (!input) return app

  if (isFunction(input)) {
    const mutatedValue = input(
      app.extensions.get('wp-theme-json').getOption('settings'),
    )

    app.extensions
      .get('wp-theme-json')
      .setOption(
        'settings',
        mutatedValue instanceof Container
          ? mutatedValue.all()
          : mutatedValue,
      )

    return app
  }

  app.extensions.get('wp-theme-json').setOption('settings', input)
  return app
}
