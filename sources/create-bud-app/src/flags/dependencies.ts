import {Option} from 'clipanion'

export default Option.Array(`--dependencies,-d`, [], {
  description: `Runtime dependencies to install`,
})
