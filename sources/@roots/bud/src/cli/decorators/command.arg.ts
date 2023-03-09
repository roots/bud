export function arg(key: string, value = true) {
  return function (constructor: any): any {
    return class extends constructor {
      public constructor() {
        super()

        const fn = this.withArguments?.bind(this) ?? (v => v)

        this.withArguments = async (args: any) => {
          args = await fn(args)
          return {...args, [key]: value}
        }
      }
    }
  }
}
