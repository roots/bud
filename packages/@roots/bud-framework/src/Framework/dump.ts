/* eslint-disable no-console */
import {lodash} from '@roots/bud-support'
import {highlight} from 'cli-highlight'
import {format} from 'pretty-format'
import {Framework} from './'

const {isUndefined} = lodash

export function dump(
  obj: any,
  options?: {
    language
    ignoreIllegals
  },
) {
  options = {
    language: 'json',
    ignoreIllegals: true,

    ...(options ?? {}),
  }
  obj = format(obj)

  const ctx = this as Framework
  !isUndefined(ctx.dashboard.instance)
    ? ctx.dashboard.render(highlight(obj, options))
    : console.log(highlight(obj, options))
}

export function dd(
  obj: any,
  options?: {
    language
    ignoreIllegals
  },
) {
  const ctx = this as Framework

  ctx.dump(obj, options)

  !isUndefined(ctx.dashboard.instance) &&
    ctx.dashboard.instance.unmount()

  ctx.close(process.exit)
}
