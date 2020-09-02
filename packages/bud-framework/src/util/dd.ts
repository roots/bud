import dump from './dump'
import terminate from './terminate'

const dd = function (obj, parser?): void {
  dump(obj, parser ?? undefined)
  terminate()
}

export {dd as default}
