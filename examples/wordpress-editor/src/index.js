roots.register.blocks(`./`)
roots.register.formats(`./`)
roots.register.variations(`./`)
roots.register.plugins(`./`)

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept(console.error);
}
