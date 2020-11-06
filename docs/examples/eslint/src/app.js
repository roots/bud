console.log('ping')

const array = [
  'thing',
]

if (module.hot) {
  module.hot.accept(err => console.err(err))
}
