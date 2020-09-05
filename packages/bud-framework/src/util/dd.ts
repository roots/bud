import dump from './dump'
import terminate from './terminate'

const dd = function (obj: any): void {
  dump(obj)
  terminate()
}

export {dd as default}
