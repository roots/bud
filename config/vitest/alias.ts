import {join, relative} from 'node:path'

import {path} from '@repo/constants'
import globby from '@roots/bud-support/globby'

const packages = await globby(path(`sources/@roots/*`), {
  absolute: true,
  onlyDirectories: true,
})

export default {
  ...packages.reduce((aliases, packageRoot) => {
    const signifier = relative(path(), packageRoot)
    aliases[signifier] = join(packageRoot, `src`)
    return aliases
  }, {}),
  '@roots/blade-loader': path(`sources/@roots/blade-loader/src/plugin.ts`),
  '@roots/browserslist-config': path(`sources/@roots/browserslist-config`),
  '@roots/bud': path(`sources/@roots/bud/src`),
  '@roots/bud-api': path(`sources/@roots/bud-api/src`),
  '@roots/bud-babel': path(`sources/@roots/bud-babel/src`),
  '@roots/bud-build': path(`sources/@roots/bud-build/src`),
  '@roots/bud-cache': path(`sources/@roots/bud-cache/src`),
  '@roots/bud-client': path(`sources/@roots/bud-client/src`),
  '@roots/bud-compiler': path(`sources/@roots/bud-compiler/src`),
  '@roots/bud-compress': path(`sources/@roots/bud-compress/src`),
  '@roots/bud-criticalcss': path(`sources/@roots/bud-criticalcss/src`),
  '@roots/bud-dashboard': path(`sources/@roots/bud-dashboard/src`),
  '@roots/bud-emotion': path(`sources/@roots/bud-emotion/src`),
  '@roots/bud-entrypoints': path(`sources/@roots/bud-entrypoints/src`),
  '@roots/bud-esbuild': path(`sources/@roots/bud-esbuild/src`),
  '@roots/bud-eslint': path(`sources/@roots/bud-eslint/src`),
  '@roots/bud-extensions': path(`sources/@roots/bud-extensions/src`),
  '@roots/bud-framework': path(`sources/@roots/bud-framework/src`),
  '@roots/bud-hooks': path(`sources/@roots/bud-hooks/src`),
  '@roots/bud-imagemin': path(`sources/@roots/bud-imagemin/src`),
  '@roots/bud-mdx': path(`sources/@roots/bud-mdx/src`),
  '@roots/bud-minify': path(`sources/@roots/bud-minify/src`),
  '@roots/bud-postcss': path(`sources/@roots/bud-postcss/src`),
  '@roots/bud-preset-recommend': path(`sources/@roots/bud-preset-recommend/src`),
  '@roots/bud-preset-wordpress': path(`sources/@roots/bud-preset-wordpress/src`),
  '@roots/bud-prettier': path(`sources/@roots/bud-prettier/src`),
  '@roots/bud-purgecss': path(`sources/@roots/bud-purgecss/src`),
  '@roots/bud-react': path(`sources/@roots/bud-react/src`),
  '@roots/bud-sass': path(`sources/@roots/bud-sass/src`),
  '@roots/bud-server': path(`sources/@roots/bud-server/src`),
  '@roots/bud-solid': path(`sources/@roots/bud-solid/src`),
  '@roots/bud-stylelint': path(`sources/@roots/bud-stylelint/src`),
  '@roots/bud-support': path(`sources/@roots/bud-support/src`),
  '@roots/bud-swc': path(`sources/@roots/bud-swc/src`),
  '@roots/bud-tailwindcss': path(`sources/@roots/bud-tailwindcss/src`),
  '@roots/bud-tailwindcss-theme-json': path(`sources/@roots/bud-tailwindcss-theme-json/src`),
  '@roots/bud-typescript': path(`sources/@roots/bud-typescript/src`),
  '@roots/bud-vue': path(`sources/@roots/bud-vue/src`),
  '@roots/bud-wordpress-dependencies': path(`sources/@roots/bud-wordpress-dependencies/src`),
  '@roots/filesystem/src/vendor/sdk': path(
    `sources/@roots/filesystem/vendor/sdk`,
  ),
  '@roots/sage': path(`sources/@roots/sage/src`),
}
