import oneOf from './oneOf'
import pre from './pre'
import type {Configuration} from 'webpack'

export default function (
  this: Framework.Bud,
): Configuration['module']['rules'] {
  return [
    ...pre.bind(this)(),
    {
      oneOf: oneOf.bind(this)(),
    },
  ]
}
