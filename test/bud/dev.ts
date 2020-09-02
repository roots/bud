const test = require('ava')
const bud = require('@roots/bud')
const {join, resolve} = require('path')

const testIn = (property, value) => {
  const valueStr = !(typeof value == 'string') ? JSON.stringify(value) : value

  test(`setting ${property} to ${valueStr} sets webpack.devServer.${property} to ${valueStr}`, t => {
    bud.options.set('webpack.devServer', {})
    bud.dev({[property]: value})
    t.deepEqual(bud.options.get(`webpack.devServer.${property}`), value)
  })
}

testIn('port', 3000)
testIn('host', 'http://coldbrew.vibes')
testIn('hot', true)
testIn('hot', false)
testIn('historyApiFallback', true)
testIn('historyApiFallback', false)
testIn('headers', {'Fake-Proxy': 'Watering-Can'})
testIn('headers', {'Fake-Proxy': 'Rubber-Plant'})

test(`setting proxy.** to {target: 'enya.co'} sets webpack.devServer.proxy.**.target to enya.co`, t => {
  bud.options.set('webpack.devServer', {})
  bud.dev({target: 'enya.co'})
  t.deepEqual(bud.options.get(`webpack.devServer`), {target: 'enya.co'})
})
