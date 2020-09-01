import {Api} from '@roots/bud-typings'

const when: Api.When = function (test, action) {
  test == true && action(this)

  return this
}

export {when}
