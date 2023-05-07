import type {Supports} from './types.js'

/**
 * Stack components mapped to package signifiers
 */
const supportedExtensions: Record<`${Supports & string}`, string> = {
  babel: `@roots/bud-babel`,
  emotion: `@roots/bud-emotion`,
  postcss: `@roots/bud-postcss`,
  react: `@roots/bud-react`,
  sass: `@roots/bud-sass`,
  swc: `@roots/bud-swc`,
  tailwindcss: `@roots/bud-tailwindcss`,
  typescript: `@roots/bud-typescript`,
  wordpress: `@roots/bud-preset-wordpress`,
  vue: `@roots/bud-vue`,
  eslint: `@roots/bud-eslint`,
  stylelint: `@roots/bud-stylelint`,
  prettier: `@roots/bud-prettier`,
}

export default supportedExtensions
