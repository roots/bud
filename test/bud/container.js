const test = require('ava')
const {bud} = require('@roots/bud')

const containers = [
  'options',
  'paths',
  'env',
  'features',
  'loaders',
  'rules',
  'uses',
  'patterns',
  'presets',
]

containers.forEach(container => {
  test(`container ${container}.get dot notation functions`, t => {
    bud[container].set('outer', {
      middle: {
        inner: 'value',
      },
    })

    t.is(bud[container].get('outer.middle.inner'), 'value')
  })

  test(`container ${container}.set dot notation functions`, t => {
    bud[container].set('outer.middle.innerTwo', {
      hey: 'bud',
    })

    t.is(bud[container].get('outer.middle.innerTwo.hey'), 'bud')
  })

  test(`container ${container}.set dot notation is non-destructive`, t => {
    t.is(bud[container].get('outer.middle.inner'), 'value')
  })
})

