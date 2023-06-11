export function dry(constructor: any): any {
  return class extends constructor {
    public constructor() {
      super()

      const fn = this.withContext?.bind(this) ?? (value => value)

      this.withContext = async (args: any) => {
        args = await fn(args)
        return {...args, dry: true}
      }
    }
  }
}
