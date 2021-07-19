import {useInput} from 'ink'
import {isEqual} from 'lodash'

export const Input = ({bud}) => {
  useInput(input => {
    if (isEqual(input, 'q')) {
      try {
        bud.compiler.instance.close(() => {
          setTimeout(() => process.exit(), 10)
        })
      } catch (err) {}
    }
  })

  return null
}
