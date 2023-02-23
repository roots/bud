import {factory} from '@roots/bud'
import config from './bud.config.mjs'

export default async () => {
  const bud = await factory()
  await bud.tapAsync(config)
  return await bud.build.make()
}
