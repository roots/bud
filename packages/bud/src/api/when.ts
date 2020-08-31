import {Bud} from './types'

type When = (this: Bud, test: boolean, cb: any) => Bud
const when: When = function (this: Bud, test: boolean, cb: any): Bud {
  test == true && cb(this)

  return this
}

export {when, When}
