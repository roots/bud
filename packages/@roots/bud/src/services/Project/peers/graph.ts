import {DirectedGraph} from 'graphology'
import {bidirectional} from 'graphology-shortest-path'

export const graph = new DirectedGraph({
  allowSelfLoops: false,
})

graph.on(
  'edgeAttributesUpdated',
  function ({key, type, attributes}) {
    //
  },
)
export {bidirectional as graphPath}

export type graph = DirectedGraph
