import {AdjacencyList} from '@roots/bud/src/services/Project/peers/adjacencyList'

const modules: Record<
  string,
  {name: string; requires: Array<[string, string]>}
> = {
  root: {
    name: 'root',
    requires: [['module1', '0.0.0']],
  },
  module1: {
    name: 'module1',
    requires: [
      ['module2', '0.0.0'],
      ['module3', '0.0.0'],
    ],
  },
  module2: {
    name: 'module2',
    requires: [['module3', '0.0.0']],
  },
  module3: {
    name: 'module3',
    requires: [],
  },
}

describe('AdjacencyList', function () {
  let list: AdjacencyList

  beforeAll(async () => {
    list = new AdjacencyList(modules)
  })

  it('list.adjacentTo', () => {
    expect(list.adjacentTo('root')).toStrictEqual(
      new Set(['module1']),
    )
  })

  it('list.fromRoot', () => {
    expect(list.fromRoot('root')).toStrictEqual([
      modules.module3,
      modules.module2,
      modules.module1,
    ])
  })
})
