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
  test(`container ${container} exists`, t => {
    t.truthy(bud[container])
  })

  test(`container ${container}.set`, t => {
    bud[container].set('foo', 'bar')
    t.deepEqual(bud[container].get('foo'), 'bar')
  })

  test(`container ${container}.get`, t => {
    t.truthy(bud[container].get('foo'))
  })

  test(`container ${container}.has`, t => {
    t.true(bud[container].has('foo'))
  })

  test(`container ${container}.has check on non-existent entry`, t => {
    t.false(bud[container].has('404'))
  })

  test(`container ${container}.entries`, t => {
    t.truthy(bud[container].entries())
  })

  test(`container ${container}.delete`, t => {
    bud[container].delete('foo')
    t.is(bud[container].get('foo'), undefined)
  })

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

