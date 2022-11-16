<p align="center"><img src="https://cdn.roots.io/app/uploads/logo-bud.svg" height="100" alt="bud.js" /></p>

<p align="center">
  <img alt="MIT License" src="https://img.shields.io/github/license/roots/bud?color=%23525ddc&style=flat-square" />
  <img alt="npm" src="https://img.shields.io/npm/v/@roots/bud.svg?color=%23525ddc&style=flat-square" />
  <img alt="Follow Roots" src="https://img.shields.io/twitter/follow/rootswp.svg?color=%23525ddc&style=flat-square" />
</p>

<h1 align="center"><strong>@roots/bud</strong></h1>

<p align="center">
  Frontend build tools combining the best parts of Symfony Encore and Laravel Mix
</p>

---

## Installation

Install **@roots/bud** to your project.

Yarn:

```sh
yarn add @roots/bud --dev
```

npm:

```sh
npm install @roots/bud --save-dev
```

## Usage

### Getting Started

For more detailed usage information consult the [Getting Started guide on bud.js.org](https://bud.js.org/guides/getting-started)

### Cli

**bud.js** is invoked with the `bud` command.

Call `bud --help` for usage information.

#### TypeScript

If your configuration is authored in TypeScript, you will use the `ts-bud` command instead of the `bud` command.

### Node

A simple way to instantiate **bud** is using the `factory` export:

```js
import { factory } from "@roots/bud/factory";

await factory().then((bud) => {
  // use bud
});
```

`factory` accepts an optional `Bud.Options` argument:

```ts
interface Options {
  /**
   * Context
   */
  context?: {
    cwd: string;
    dir: string;
    manifest: Record<string, any>;
    application: {
      name: string;
      label: string;
      version: string;
      dir: string;
    };
    args: Record<
      string,
      string | boolean | undefined | number | Array<string | boolean | number>
    >;
    disk: {
      config: Record<string, any>;
    };
    env: Record<string, string | undefined>;
    stdin: Readable;
    stdout: Writable;
    stderr: Writable;
    colorDepth: number;
  };

  /**
   * Name
   *
   * @defaultValue `bud`
   */
  name?: string;

  /**
   * Build mode
   *
   * @remarks
   * One of: `production` | `development`
   *
   * @defaultValue `production`
   */
  mode?: Mode;

  /**
   * Seed values
   */
  seed?: Partial<Bud["hooks"]["store"]>;

  /**
   * Services
   */
  services?: Record<string, new (...params: Array<any>) => Service>;

  /**
   * Extensions to be registered
   */
  extensions?: Array<Extension | Extension.Constructor>;
}
```

Arguments are merged with the defaults up to a depth of 1. So, if you want to add an extension using `Bud.Options` you only need to include the single extension in the passed array.

#### Example: exporting for webpack-cli

From a file titled `webpack.config.cjs`:

```cjs
module.exports = async (env) => {
  const bud = await import("@roots/bud/factory").then(
    async (factory) => await factory()
  );

  bud.entry({ app: ["@src/app.js"] });

  return await bud.build.make();
};
```

## Contributing

Contributions are welcome from everyone.

We have [contribution guidelines](https://github.com/roots/guidelines/blob/master/CONTRIBUTING.md) to help you get started.

## License

@roots/bud is licensed under MIT.

## Community

Keep track of development and community news.

- Join us on Roots Slack by becoming a [GitHub
  sponsor](https://github.com/sponsors/roots)
- Participate on the [Roots Discourse](https://discourse.roots.io/)
- Follow [@rootswp on Twitter](https://twitter.com/rootswp)
- Read and subscribe to the [Roots Blog](https://roots.io/blog/)
- Subscribe to the [Roots Newsletter](https://roots.io/subscribe/)

## Sponsors

Help support our open-source development efforts by [becoming a patron](https://www.patreon.com/rootsdev).

<a href="https://k-m.com/">
<img src="https://cdn.roots.io/app/uploads/km-digital.svg" alt="KM Digital" width="200" height="150"/>
</a>
<a href="https://carrot.com/">
<img src="https://cdn.roots.io/app/uploads/carrot.svg" alt="Carrot" width="200" height="150"/>
</a>
<a href="https://wordpress.com/">
<img src="https://cdn.roots.io/app/uploads/wordpress.svg" alt="WordPress.com" width="200" height="150"/>
</a>
<a href="https://pantheon.io/">
<img src="https://cdn.roots.io/app/uploads/pantheon.svg" alt="Pantheon" width="200" height="150"/>
</a>
