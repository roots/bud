import '@roots/bud/types'
import '@roots/bud-wordpress-theme-json/types'

import type {PublicExtensionApi} from '@roots/bud-framework/extension'
import type WordPressThemeJSON from '@roots/bud-wordpress-theme-json'

interface PublicWordPressThemeJSON
  extends PublicExtensionApi<WordPressThemeJSON> {}

declare module '@roots/bud-framework' {
  interface Modules {
    '@roots/bud-tailwindcss-theme-json': PublicWordPressThemeJSON
  }
}
