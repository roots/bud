import type {Except} from './types'

import {cloneDeep} from 'lodash'

const except: Except = (target: object, properties: []): object => {
  const freshObj: object = cloneDeep(target)

  properties.forEach((key: string) => {
    delete freshObj[key]
  })

  return freshObj
}

export {except}
