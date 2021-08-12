import {Ink} from '@roots/bud-support'
import {isEqual} from 'lodash'

const Input = ({bud}) => {
  Ink.useInput(input => {
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

export {Input}
