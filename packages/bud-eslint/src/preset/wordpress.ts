import {resolve} from 'path'

export = {
  extends: [resolve(__dirname, './roots.js')],
  globals: {
    wp: true,
  },
  env: {
    node: true,
    es6: true,
    amd: true,
    browser: true,
    jquery: true,
  },
}
