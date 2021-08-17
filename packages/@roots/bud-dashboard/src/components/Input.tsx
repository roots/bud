import {Ink} from '@roots/bud-support'
import {isEqual} from 'lodash'

const Input = ({bud}) => {
  Ink.useInput(input => {
    isEqual(input, 'q') && bud.close()
  })

  return null
}

export {Input}
