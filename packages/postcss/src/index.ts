// CSS uses PostCSS
export {boot} from './boot'

// Add PostCSS loader
export const registerLoaders = {
  'postcss-loader': require.resolve('postcss-loader'),
}

// Add PostCSS rule set item
export * as registerItems from './registerItems'

// Add bud.postcss config method
export * as registerConfigs from './registerConfigs'
