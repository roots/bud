import {join} from 'path'

import {Framework, Locations} from '../..'

export interface path {
  (
    base?:
      | `${keyof Locations & string}`
      | `@${keyof Locations & string}/${string}`
      | `project`
      | `@project/${string}`,
    ...segments: Array<string>
  ): string
}

const transformShorthandBase = (app: Framework, base: string): string => {
  const parts = base.includes('/') ? base.split('/') : [base]

  parts[0] = parts[0].replace('@', '')
  parts[0] = app.hooks.filter(`location.${parts[0]}`)

  return parts.join('/')
}

const transformBase = (app: Framework, base: string): string => {
  return app.hooks.filter(`location.${base}`)
}

export const path: path = function (
  base?:
    | `${keyof Locations & string}`
    | `@${keyof Locations & string}/${string}`
    | `project`
    | `@project/${string}`,
  ...segments: Array<string>
): string {
  const ctx = this as Framework

  if (!base) return ctx.context.projectDir

  if (['project', '@project', '.'].includes(base)) {
    base = ctx.context.projectDir
    if (!segments) return base
  }

  base = base.startsWith(`@`)
    ? transformShorthandBase(ctx, base)
    : transformBase(ctx, base)

  segments = [base, ...(segments ?? [])].filter(Boolean)

  return join(ctx.context.projectDir, ...segments)
}
