<p align="center"><img src="https://cdn.roots.io/app/uploads/logo-bud.svg" height="100" alt="bud.js" /></p>

<p align="center">
  <img alt="MIT License" src="https://img.shields.io/github/license/roots/bud?color=%23525ddc&style=flat-square" />
  <img alt="npm" src="https://img.shields.io/npm/v/@roots/bud.svg?color=%23525ddc&style=flat-square" />
  <img alt="Follow Roots" src="https://img.shields.io/twitter/follow/rootswp.svg?color=%23525ddc&style=flat-square" />
</p>

<h1 align="center"><strong>@roots/bud-build</strong></h1>

<p align="center">
  bud.js core module
</p>

---

## Installation

Install **@roots/bud-build** to your project.

Yarn:

```sh
yarn add @roots/bud-build --dev
```

npm:

```sh
npm install @roots/bud-build --save-dev
```

## Exports

| Signifier                  | Description             |
| :------------------------- | :---------------------- |
| `@roots/bud-build`         | The `bud.build` service |
| `@roots/bud-build/item`    | The `Item` class        |
| `@roots/bud-build/rule`    | The `Rule` class        |
| `@roots/bud-build/loader`  | The `Loader` class      |
| `@roots/bud-build/items`   | The default `items`     |
| `@roots/bud-build/loaders` | The default `loaders`   |
| `@roots/bud-build/rules`   | The default `rules`     |

## Default rules

| Type            | Description                                                                |
| :-------------- | :------------------------------------------------------------------------- |
| `.js`           | `undefined`                                                                |
| `.css`          | `mini-css-extract-plugin` in `production`; `style-loader` `in development` |
| `.module.css`   | `mini-css-extract-plugin` in `production`; `style-loader` `in development` |
| `.json`         | [json5](https://npmjs.com/package/json5)                                   |
| `.toml`         | [toml](https://npmjs.com/package/toml)                                     |
| `.yml`          | `yml-loader`                                                               |
| `.html`         | `html-loader`                                                              |
| `.csv`          | `csv-loader`                                                               |
| `.xml`          | `xml-loader`                                                               |
| `.webp`         | `asset/resource`                                                           |
| `.svg`          | `asset/resource`                                                           |
| `.svg?inline`   | `asset/inline`                                                             |
| `.png`          | `asset/resource`                                                           |
| `.png?inline`   | `asset/inline`                                                             |
| `.gif`          | `asset/resource`                                                           |
| `.gif?inline`   | `asset/inline`                                                             |
| `.jpg`          | `asset/resource`                                                           |
| `.jpg?inline`   | `asset/inline`                                                             |
| `.jpeg`         | `asset/resource`                                                           |
| `.jpg?inline`   | `asset/inline`                                                             |
| `.woff`         | `asset`                                                                    |
| `.woff?inline`  | `asset/inline`                                                             |
| `.woff2`        | `asset`                                                                    |
| `.woff2?inline` | `asset/inline`                                                             |
| `.otf`          | `asset`                                                                    |
| `.otf?inline`   | `asset/inline`                                                             |

## Contributing

Contributions are welcome from everyone.

We have [contribution guidelines](https://github.com/roots/guidelines/blob/master/CONTRIBUTING.md) to help you get started.

## License

@roots/bud-build is licensed under MIT.

## Community

Keep track of development and community news.

- Join us on Roots Slack by becoming a [GitHub
  sponsor](https://github.com/sponsors/roots)
- Participate on the [Roots Discourse](https://discourse.roots.io/)
- Follow [@rootswp on Twitter](https://twitter.com/rootswp)
- Read and subscribe to the [Roots Blog](https://roots.io/blog/)
- Subscribe to the [Roots Newsletter](https://roots.io/subscribe/)

## Sponsors

**Bud** is an open source project and completely free to use.

However, the amount of effort needed to maintain and develop new features and projects within the Roots ecosystem is not sustainable without proper financial backing. If you have the capability, please consider [sponsoring Roots](https://github.com/sponsors/roots).

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
<a href="https://worksitesafety.ca/careers/">
<img src="https://cdn.roots.io/app/uploads/worksite-safety.svg" alt="Worksite Safety" width="200" height="150"/>
</a>
<a href="https://www.copiadigital.com/">
<img src="https://cdn.roots.io/app/uploads/copia-digital.svg" alt="Copia Digital" width="200" height="150"/>
</a>
