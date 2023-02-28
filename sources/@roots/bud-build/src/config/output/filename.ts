import {join} from 'node:path'

import type {Bud} from '@roots/bud-framework'

import {scriptExtension} from '../../helpers/scriptExtension.js'

interface Props {
  filter: Bud['hooks'][`filter`]
  relPath: Bud['relPath']
}

export const filename = ({filter, relPath}: Props) =>
  filter(
    `build.output.filename`,
    join(
      `js`,
      relPath(`@name`).concat(scriptExtension(filter, `.mjs`, `.js`)),
    ),
  )
