import {globber} from './util'

/**
 * Webpack Entrypoints
 */
const entry = {
  entry: {
    ...globber([
      {
        from: 'plugins',
        entries: [
          ['script', 'plugin.js'],
        ],
      }, {
        from: 'blocks',
        entries: [
          ['editor_script', 'editor.js'],
          ['editor_style', 'editor.css'],
          ['script', 'public.js'],
          ['style', 'public.css'],
        ],
      },
    ]),
  },
}

export default entry
