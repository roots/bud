import type {Bud} from '@roots/bud'

import {isset} from '@roots/bud/cli/helpers/isset'

export default async function argumentOverride(
  bud: Bud,
  arg: string,
  env: string,
  callback: (value: any) => (bud: Bud) => Promise<any>,
) {
  if (isset(bud.context[arg])) {
    return await callback(bud.context[arg])(bud)
  } else if (bud.env.has(env)) {
    return await callback(bud.env.get(env))(bud)
  }
}
