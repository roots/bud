console.log('ping')

if (module.hot) {
  module.hot.accept(err => console.err(err))
}
