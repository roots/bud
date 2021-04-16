const {Container} = require('@roots/container')
const tests = require('./unit')

/**
 * @roots/container
 */
describe('@roots/container', function () {
  beforeEach(() => {
    this.data = {
      0: 'test',
      name: 'Bud Co.',
      volume: Infinity,
      nested: {
        data: true,
      },
    }

    this.container = new Container(this.data)
  })

  tests.map(t => t.bind(this)())
})
