import '@roots/bud-framework'

/**
 * Add extension support
 */
export const boot = (bud: Framework.Bud): void => {
  bud.addExtensions(['sass', 'scss'])
}

/**
 * Register sass-loader
 */
export const registerLoaders = {
  'sass-loader': require.resolve('sass-loader'),
}

/**
 * Add scss rule.
 */
export * as registerRules from './registerRules'

/**
 * Register Sass use items.
 */
export * as registerItems from './registerItems'
