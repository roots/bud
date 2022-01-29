import {isArray} from './use.dependencies'
import type {Framework, Source} from './use.interface'

export interface use {
  (source: Source): Promise<Framework>
}
export interface facade {
  (source: Source): Framework
}

export const use: use = async function (source): Promise<Framework> {
  const bud = this as Framework

  !isArray(source)
    ? // @ts-ignore
      await bud.extensions.add(source)
    : // @ts-ignore
      await Promise.all(source.map(bud.extensions.add))

  return bud
}
