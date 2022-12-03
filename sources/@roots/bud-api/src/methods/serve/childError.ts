import type {Bud} from '@roots/bud-framework'
import {highlight} from '@roots/bud-support/highlight'

import type {Parameters} from './index.js'

export const checkChildInstanceError = (
  {api, isChild, label}: Bud,
  ...input: Parameters
) => {
  if (!isChild) return

  api.logger.warn(
    `server configuration is being moved to the root instance of bud: ${label}`,
  )

  api.logger.warn(
    `\
to silence this warning move the \`bud.serve\` call from ${label} to ${label}:

${highlight(`export default async bud => {
  await bud.make(\`${label}\`, async bud => {
    bud.serve(${JSON.stringify(input)})
  })
}`)}

should become:

${highlight(`export default async bud => {
  bud.serve(${JSON.stringify(input)})

  await bud.make(\`${label}\`, async bud => {
    // ...config
  })
}`)}`,
  )
}
