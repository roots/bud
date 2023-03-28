import {Bud} from '@roots/bud'

export default async (bud: Bud) => {
  bud.entry({app: ['app']}).html()
}
