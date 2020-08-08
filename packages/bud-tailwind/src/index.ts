type Tailwind = () => any

const tailwind: Tailwind = () => ({
  make: function () {
    this.bud.options.set('postCss', this.postCssOptions())
    this.bud.options.set('scss', this.scssOptions())
  },

  postCssOptions: function () {
    const postCss = this.bud.options.get('postCss')

    postCss.plugins = [require('tailwindcss'), ...postCss.plugins]

    return postCss
  },

  scssOptions: function () {
    const scss = this.bud.options.get('scss')

    scss.sassOptions = {
      processCssUrls: false,
      ...scss.sassOptions,
    }

    return scss
  },
})

export = tailwind
