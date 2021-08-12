import {extensions} from '@roots/bud'

import {Framework, setupBud, teardownBud} from '../../../../util'

const CleanWebpackPlugin = extensions['clean-webpack-plugin']

describe('CleanWebpackPlugin', function () {
  let bud: Framework

  beforeEach(() => {
    bud = setupBud()
  })

  afterEach(() => {
    bud = teardownBud(bud)
  })

  it('is named `clean-webpack-plugin`', () => {
    expect(CleanWebpackPlugin.name).toBe('clean-webpack-plugin')
  })
})
