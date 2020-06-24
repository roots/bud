const camelCash = string =>
  string.replace(/-([a-z])/g, (match, letter) =>
    letter.toUpperCase(),
  )

/**
 * @wordpress npm package name reference
 */
const pkgs = [
  'a11y',
  'annotation',
  'api-fetch',
  'autop',
  'blob',
  'block-directory',
  'block-editor',
  'block-library',
  'blocks',
  'components',
  'compose',
  'core-data',
  'data-controls',
  'deprecated',
  'dom-ready',
  'edit-post',
  'edit-site',
  'edit-widgets',
  'editor',
  'element',
  'escape-html',
  'format-library',
  'hooks',
  'html-entities',
  'i18n',
  'i18n',
  'is-shallow-equal',
  'keyboard-shortcuts',
  'keycodes',
  'list-reusable-blocks',
  'media-utils',
  'notices',
  'plugins',
  'polyfill',
  'primitives',
  'priority-queue',
  'redux-routine',
  'rich-text',
  'server-side-render',
  'shortcode',
  'token-list',
  'url',
  'viewport',
  'warning',
  'wordcount',
]

const externals = () => ({
  externals: {
    lodash: 'lodash',
    moment: 'moment',
    react: 'React',
    'react-dom': 'ReactDOM',
    tinymce: 'tinymce',
    ...pkgs.map(pkg => ({
      [`@wordpress/${pkg}`]: `window.wp.${camelCash(pkg)}`,
    })),
  },
})

export default externals
