import {boxen} from '@roots/bud-support'

import {theme} from './theme'

const WIDTH_FALLBACK = 60

const width = process.stdout.columns
  ? process.stdout.columns - 5
  : WIDTH_FALLBACK

export const make = (
  title: string,
  content: string,
  overrides?: Record<string, any>,
) =>
  boxen(`\n`.concat(content), {
    title,
    textAlignment: 'left',
    borderColor: theme.dim,
    width,
    ...(overrides ?? {}),
    margin: {
      top: 0,
      bottom: 1,
      left: 0,
      right: 0,
      ...(overrides?.margin ?? {}),
    },
    padding: {
      left: 1,
      top: 1,
      right: 1,
      bottom: 0,
      ...(overrides?.padding ?? {}),
    },
  })
