/* eslint-disable no-console */
import {lodash} from '@roots/bud-support'
import {highlight} from 'cli-highlight'
import {format} from 'pretty-format'

import {Framework} from './'

const {isUndefined} = lodash

interface Options {
  prefix?: any
  language?: string
  ignoreIllegals?: boolean
  callToJSON?: boolean
  printFunctionName?: boolean
}

export function dump(
  obj: any,
  options?: Options,
  maxDepth?,
): Framework {
  return this.log(
    ...[
      `${options.prefix ?? ''}\n`,
      highlight(
        format(obj, {
          callToJSON: options?.callToJSON ?? false,
          maxDepth: maxDepth ?? Infinity,
          printFunctionName: options?.printFunctionName ?? false,
        }),
        {
          language: options?.language ?? 'js',
          ignoreIllegals: options?.ignoreIllegals ?? true,
        },
      ),
    ].filter(Boolean),
  )
}

export function dd(...params: any[]) {
  const ctx = this as Framework

  ctx.dump(params)

  !isUndefined(ctx.dashboard.instance) &&
    ctx.dashboard.instance.unmount()

  ctx.close()
}
