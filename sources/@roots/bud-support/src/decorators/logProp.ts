export const logProp = service => {
  return (target: any, key: string) => {
    let value
    const log = service.app.logger.scope([target.name, key]).log

    const get = function () {
      log(`get`, key, `=>`, value)
      return value
    }

    const set = function (newVal) {
      log(`set`, key, `=>`, newVal)
      value = newVal
    }

    Reflect.deleteProperty[key]
    Reflect.defineProperty(target, key, {get, set})
  }
}
