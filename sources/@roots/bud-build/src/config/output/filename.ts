import type {Bud} from '@roots/bud-framework'

import scriptExtension from '@roots/bud-build/helpers/script-extension'

interface Props {
  filter: Bud['hooks'][`filter`]
  relPath: Bud['relPath']
}

export const filename = ({filter, relPath}: Props) =>
  filter(
    `build.output.filename`,
    relPath(`js`, `@name${scriptExtension(filter, `.mjs`, `.js`)}`),
  )
