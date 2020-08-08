import {resolve} from 'path'

export = {
  extends: [resolve(__dirname, './roots.js')],
  globals: {
    wp: true,
  },
}
