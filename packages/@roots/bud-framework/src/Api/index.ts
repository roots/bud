import {Service} from '../Service'

interface Api extends Service {
  bindMethod(acc, [name, fn]: [string, CallableFunction]): void
}

export {Api}
