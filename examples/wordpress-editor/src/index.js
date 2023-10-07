roots.register.blocks(`@src`)
roots.register.formats(`@src`)
roots.register.variations(`@src`)
roots.register.plugins(`@src`)

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept(console.error);
}
