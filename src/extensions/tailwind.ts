import tailwindPlugin from 'tailwindcss'

/**
 * Tailwind extension
 */
const tailwind = {
  name: 'tailwind',
  make: function () {
    this.bud.options.set('postCss', this.postCssOptions())
    this.bud.options.set('scss', this.scssOptions())
  },
  postCssOptions: function () {
    const postCss = this.bud.options.get('postCss')

    postCss.plugins = [
      tailwindPlugin,
      ...postCss.plugins,
    ]

    return postCss
  },
  scssOptions: function () {
    const scss = this.bud.options.get('scss')
    scss.sassOptions = {
      ...(scss.sassOptions ?? []),
      processCssUrls: false,
    }

    return scss
  }
}

export {tailwind}
