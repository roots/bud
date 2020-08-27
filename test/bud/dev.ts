import test from 'ava'
import {bud} from '@roots/bud'

const testIn = (parameter, value) => {
  const valueStr = !(typeof value == 'string') ? JSON.stringify(value) : value

  test(`setting ${parameter} to ${valueStr} sets webpack.devServer.${parameter} to ${valueStr}`, t => {
    bud.options.set('webpack.devServer', {})
    bud.dev({[parameter]: value}, false)
    t.deepEqual(bud.options.get(`webpack.devServer.${parameter}`), value)
  })
}

testIn('port', 3000)
testIn('host', 'http://coldbrew.vibes')

testIn('hot', true)
testIn('hot', false)

testIn('open', true)
testIn('open', false)

testIn('historyApiFallback', true)
testIn('historyApiFallback', false)

testIn('headers', {'Fake-Proxy': 'Watering-Can'})
testIn('headers', {'Fake-Proxy': 'Rubber-Plant'})

test(`setting proxy.** to {target: 'enya.co'} sets webpack.devServer.proxy.**.target to enya.co`, t => {
  const asserting = {
    proxy: {
      '**': {
        target: 'enya.co',
      },
    },
  }

  bud.options.set('webpack.devServer', {})
  bud.dev(asserting, false)
  t.deepEqual(bud.options.get(`webpack.devServer`), asserting)
})

test(`setting proxy.** to {secure: true} sets webpack.devServer.proxy.**.secure to true`, t => {
  const asserting = {
    proxy: {
      '**': {
        secure: true,
      },
    },
  }

  bud.options.set('webpack.devServer', {})
  bud.dev(asserting, false)
  t.deepEqual(bud.options.get(`webpack.devServer`), asserting)
})

test(`setting host while allowing defaults sets host and defaults`, t => {
  const asserting = {
    host: 'test.com',
  }

  const expecting = {
    headers: {
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Origin': '*',
    },
    historyApiFallback: true,
        host: 'test.com',
    hot: true,
    open: true,
    overlay: true,
    port: 3000,
    proxy: {
      '**': {
        changeOrigin: true,
        headers: {
          'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
          'Access-Control-Allow-Origin': '*',
        },
        secure: undefined,
        target: 'test.com',
      },
      port: 3000,
    },
  }

  bud.options.set('webpack.devServer', {})
  bud.dev(asserting, true)
  t.deepEqual(bud.options.get(`webpack.devServer`), expecting)
})

test(`setting multiple params while allowing defaults sets params and defaults`, t => {
  const asserting = {
    host: 'test.com',
    port: 9001,
  }

  const expecting = {
    headers: {
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Origin': '*',
    },
    historyApiFallback: true,
        host: 'test.com',
    hot: true,
    open: true,
    overlay: true,
    port: 9001,
    proxy: {
      '**': {
        changeOrigin: true,
        headers: {
          'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
          'Access-Control-Allow-Origin': '*',
        },
        secure: undefined,
        target: 'test.com',
      },
      port: 9001,
    },
  }

  bud.options.set('webpack.devServer', {})
  bud.dev(asserting, true)
  t.deepEqual(bud.options.get(`webpack.devServer`), expecting)
})
