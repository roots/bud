import {join, sep as slash} from 'path'

import {Framework} from '../..'

export interface path {
  (base?: string, ...segments: Array<string>): string
}

const transformShorthandBase = (app: Framework, base: string): string => {
  const parts = base.includes(slash) ? base.split(slash) : [base]
  parts[0] = app.hooks.filter(`location.${parts[0]}`)
  return parts.join(slash)
}

export const path: path = function (
  base?: string,
  ...segments: Array<string>
): string {
  const ctx = this as Framework

  if (!base || base.startsWith(slash)) return ctx.context.projectDir

  return join(
    ctx.context.projectDir,
    ...[
      base.startsWith(`@`) ? transformShorthandBase(ctx, base) : base,
      ...(segments ?? []),
    ].filter(Boolean),
  )
}
