import type {Except} from './types'

import {cloneDeep} from 'lodash'

const except: Except = (target: any, properties: []): any => {
  const freshObj: any = cloneDeep(target)

  properties.forEach((key: string) => {
    delete freshObj[key]
  })

  return freshObj
}

export {except}
