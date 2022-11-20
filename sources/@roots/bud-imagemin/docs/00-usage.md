**@roots/bud-imagemin** works out of the box with no configuration. It uses the [squoosh](https://squoosh.app/) library to optimize images, and sticks to the default options provided by the library.

Ultimately, this extension is a relatively thin wrapper around the [webpack-contrib/image-minimizer-webpack-plugin](https://github.com/webpack-contrib/image-minimizer-webpack-plugin). Refer to the [plugin documentation](https://github.com/webpack-contrib/image-minimizer-webpack-plugin) for a better understanding of how it all works.

### Functions

- [bud.imagemin.encode](https://bud.js.org/extensions/bud-imagemin/encode)
- [bud.imagemin.configure](https://bud.js.org/extensions/bud-imagemin/configure)
