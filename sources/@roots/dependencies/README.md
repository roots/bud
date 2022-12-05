<p align="center"><img src="https://cdn.roots.io/app/uploads/logo-bud.svg" height="100" alt="bud.js" /></p>

<p align="center">
  <img alt="MIT License" src="https://img.shields.io/github/license/roots/bud?color=%23525ddc&style=flat-square" />
  <img alt="npm" src="https://img.shields.io/npm/v/@roots/bud.svg?color=%23525ddc&style=flat-square" />
  <img alt="Follow Roots" src="https://img.shields.io/twitter/follow/rootswp.svg?color=%23525ddc&style=flat-square" />
</p>

<h1 align="center"><strong>@roots/dependencies</strong></h1>

<p align="center">
  Automated package installation
</p>

---

## Installation

Install **@roots/dependencies** to your project.

Yarn:

```sh
yarn add @roots/dependencies --dev
```

npm:

```sh
npm install @roots/dependencies --save-dev
```

## Usage

Import the `Dependencies` manager and instantiate.

The base path is required.

```typescript
import { Dependencies } from "@roots/dependencies";

const manager = new Dependencies(process.cwd());
```

Optionally, you may also provide handlers for messages and errors:

```typescript
import { Dependencies } from "@roots/dependencies";
const manager = new Dependencies(process.cwd(), console.log, console.error);
```

Create and use a new client:

```typescript
const client = await manager.getClient();

await this.client.install(`lodash`);
await this.client.uninstall(`lodash`);
```

Get the latest version of a package:

```typescript
const version = await this.client.getLatestVersion(`lodash`);
```

install a specific version with an array or a formatted string (`{signifier}@{version}`):

```typescript
await this.client.install([`lodash`, `latest`]);
await this.client.install(`lodash@latest`);
```

Supports flags:

```typescript
await this.client.install([`lodash`, `latest`], `--dev`);
```

## Contributing

Contributions are welcome from everyone.

We have [contribution guidelines](https://github.com/roots/guidelines/blob/master/CONTRIBUTING.md) to help you get started.

## License

@roots/dependencies is licensed under MIT.

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
