export function log(...message: Array<string>) {
  return function (target: any, propertyKey: string, descriptor: any) {
    const originalMethod = descriptor.value

    descriptor.value = function (...args: any[]) {
      if (this.logger && typeof this.logger.log === `function`) {
        const label = this.label ?? this.constructor.name
        if (label) this.logger.scope(label)
        this.logger.log(...message)
      }

      return originalMethod.apply(this, args)
    }

    return descriptor
  }
}
