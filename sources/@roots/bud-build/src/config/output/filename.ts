import {join} from 'node:path'

import type {Bud} from '@roots/bud-framework'

import {scriptExtension} from '../../helpers/scriptExtension.js'

interface Props {
  filter: Bud['hooks'][`filter`]
  path: Bud['path']
}

export const filename = ({filter, path}: Props) =>
  filter(
    `build.output.filename`,
    join(
      `js`,
      path(`@name`).concat(scriptExtension(filter, `.mjs`, `.js`)),
    ),
  )
