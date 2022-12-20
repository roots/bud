import {join} from 'node:path'

import type {Bud} from '@roots/bud-framework'

import {scriptExtension} from '../../helpers/scriptExtension.js'

interface Props {
  filter: Bud[`hooks`][`filter`]
  path: Bud[`path`]
}

export const chunkFilename = ({filter, path}: Props) =>
  filter(
    `build.output.chunkFilename`,
    join(`js`, `dynamic`, path(`@name.chunk`)).concat(
      scriptExtension(filter, `.mjs`, `.js`),
    ),
  )
