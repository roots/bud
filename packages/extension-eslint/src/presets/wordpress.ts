import {resolve} from 'path'
const roots = resolve(__dirname, './roots.js')

export default {
  extends: [roots],
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
