import type {Supports} from './types.js'

/**
 * Stack components mapped to package signifiers
 */
const supportedExtensions: Record<`${string & Supports}`, string> = {
  babel: `@roots/bud-babel`,
  emotion: `@roots/bud-emotion`,
  eslint: `@roots/bud-eslint`,
  postcss: `@roots/bud-postcss`,
  prettier: `@roots/bud-prettier`,
  react: `@roots/bud-react`,
  sass: `@roots/bud-sass`,
  stylelint: `@roots/bud-stylelint`,
  swc: `@roots/bud-swc`,
  tailwindcss: `@roots/bud-tailwindcss`,
  typescript: `@roots/bud-typescript`,
  vue: `@roots/bud-vue`,
  wordpress: `@roots/bud-preset-wordpress`,
}

export default supportedExtensions
