import {join} from 'node:path'

import type {Bud} from '@roots/bud-framework'

import {scriptExtension} from '../../helpers/scriptExtension.js'

interface Props {
  filter: Bud[`hooks`][`filter`]
  relPath: Bud[`relPath`]
}

export const chunkFilename = ({filter, relPath}: Props) =>
  filter(
    `build.output.chunkFilename`,
    join(`js`, `dynamic`, relPath(`@name.chunk`)).concat(
      scriptExtension(filter, `.mjs`, `.js`),
    ),
  )
