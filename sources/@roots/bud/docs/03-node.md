A simple way to instantiate **bud** is using the `factory` export:

```js
import {factory} from '@roots/bud/factory'

await factory().then(bud => {
  // use bud
})
```

`factory` accepts an optional `Bud.Options` argument:

```ts
interface Options {
  /**
   * Context
   */
  context?: {
    cwd: string
    dir: string
    manifest: Record<string, any>
    application: {
      name: string
      label: string
      version: string
      dir: string
    }
    args: Record<
      string,
      | string
      | boolean
      | undefined
      | number
      | Array<string | boolean | number>
    >
    disk: {
      config: Record<string, any>
    }
    env: Record<string, string | undefined>
    stdin: Readable
    stdout: Writable
    stderr: Writable
    colorDepth: number
  }

  /**
   * Name
   *
   * @defaultValue `bud`
   */
  name?: string

  /**
   * Build mode
   *
   * @remarks
   * One of: `production` | `development`
   *
   * @defaultValue `production`
   */
  mode?: Mode

  /**
   * Seed values
   */
  seed?: Partial<Bud['hooks']['store']>

  /**
   * Services
   */
  services?: Record<string, new (...params: Array<any>) => Service>

  /**
   * Extensions to be registered
   */
  extensions?: Array<Extension | Extension.Constructor>
}
```

Arguments are merged with the defaults up to a depth of 1. So, if you want to add an extension using `Bud.Options` you only need to include the single extension in the passed array.

#### Example: exporting for webpack-cli

From a file titled `webpack.config.cjs`:

```cjs
module.exports = async env => {
  const bud = await import('@roots/bud/factory').then(
    async factory => await factory(),
  )

  bud.entry({app: ['@src/app.js']})

  return await bud.build.make()
}
```
