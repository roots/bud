import dump from './dump'
import terminate from './terminate'

const dd: (obj: any) => void = function (obj: any): void {
  dump(obj)
  terminate()
}

export {dd as default}
