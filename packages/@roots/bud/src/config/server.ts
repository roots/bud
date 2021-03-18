import {Framework} from '@roots/bud-framework'

export const server: Framework.Config['server'] = {
  watch: {
    files: [
      '**/*.html',
      '**/*.php',
      '**/*.ejs',
      '!node_modules',
      '!vendor',
    ],
    options: {
      persistant: true,
    },
  },
  middleware: {
    dev: true,
    hot: true,
    proxy: false,
  },
}
