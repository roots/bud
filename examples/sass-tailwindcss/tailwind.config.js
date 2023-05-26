import {resolve} from 'node:path'

export default {
  content: [resolve(process.cwd(), './src/**/*.js')],
  theme: {
    extend: {
      colors: {},
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
