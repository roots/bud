import {Bud, Extension, ExtensionInterface} from '@roots/bud'

const tailwind: Extension = (bud: Bud): ExtensionInterface => ({
  bud,

  make: function (this: ExtensionInterface) {
    this.bud.options.set('postCss', this.postCssOptions())
    this.bud.options.set('scss', this.scssOptions())
  },

  postCssOptions: function (this: ExtensionInterface) {
    const postCss = this.bud.options.get('postCss')

    postCss.plugins = [require('tailwindcss'), ...postCss.plugins]

    return postCss
  },

  scssOptions: function (this: ExtensionInterface) {
    const scss = this.bud.options.get('scss')

    scss.sassOptions = {
      processCssUrls: false,
      ...scss.sassOptions,
    }

    return scss
  },
})

export = tailwind
