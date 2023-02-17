import {get} from 'lodash'

const foo = {
  bar: 42,
}

console.log(get(foo, `bar`))
