export function dry(constructor: any): any {
  return class extends constructor {
    public constructor() {
      super()

      const fn = this.withArguments?.bind(this) ?? (value => value)

      this.withArguments = async (args: any) => {
        args = await fn(args)
        return {...args, dry: true}
      }
    }
  }
}
