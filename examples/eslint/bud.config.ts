import {type Bud} from '@roots/bud'

export default async (bud: Bud) => {
  bud.eslint.extends('@roots/eslint-config')
}
