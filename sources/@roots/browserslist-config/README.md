<p align="center"><img src="https://cdn.roots.io/app/uploads/logo-bud.svg" height="100" alt="bud.js" /></p>

<p align="center">
  <img alt="MIT License" src="https://img.shields.io/github/license/roots/bud?color=%23525ddc&style=flat-square" />
  <img alt="npm" src="https://img.shields.io/npm/v/@roots/bud.svg?color=%23525ddc&style=flat-square" />
</p>

<h1 align="center"><strong>@roots/browserslist-config</strong></h1>

<p align="center">
  Browserslist configuration
</p>

---

## Installation

Install **@roots/browserslist-config** to your project.

Yarn:

```sh
yarn add @roots/browserslist-config --dev
```

npm:

```sh
npm install @roots/browserslist-config --save-dev
```

## Exported configurations

All browserslist configurations are deterministic. This means that the configurations are not constructed using unchanging targets, as opposed to queries based on market share (`> 2%`, `not dead`) or versions (`last 2 versions`, `last 3 versions`).

| Signifier                                    | Description                                       | Coverage |
| -------------------------------------------- | ------------------------------------------------- | -------- |
| `@roots/browserslist-config`                 | Recommended browserslist config                   | 89%      |
| `@roots/browserslist-config/last-2-versions` | Last 2 major versions                             | 79%      |
| `@roots/browserslist-config/last-3-versions` | Last 3 major versions                             | 90%      |
| `@roots/browserslist-config/wordpress`       | Very similar to WordPress maintained browserslist | 81%      |

## Deprecated configs

These configs will be removed in the next major release.

| Signifier                            | Description                                      |
| ------------------------------------ | ------------------------------------------------ |
| `@roots/browserslist-config/broad`   | Use `@roots/browserslist-config/last-3-versions` |
| `@roots/browserslist-config/current` | Use `@roots/browserslist-config/last-2-versions` |
| `@roots/browserslist-config/default` | Use `@roots/browserslist-config`                 |
| `@roots/browserslist-config/next`    | Use `@roots/browserslist-config`                 |

## License

@roots/browserslist-config is licensed under MIT.
