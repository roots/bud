import {Ink} from '@roots/bud-support'
import {isEqual} from 'lodash'

const Input = ({bud}) => {
  Ink.useInput(input => {
    if (isEqual(input, 'q')) {
      bud.close()
    }
  })

  return null
}

export {Input}
