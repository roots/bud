import {lodash} from '@roots/bud-support'
import {useInput} from 'ink'

const {isEqual} = lodash

export const Input = ({app}) => {
  useInput(input => isEqual(input, 'q') && app.close())
}
