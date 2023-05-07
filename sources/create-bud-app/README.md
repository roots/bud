<p align="center"><img src="https://cdn.roots.io/app/uploads/logo-bud.svg" height="100" alt="bud.js" /></p>

<p align="center">
  <img alt="MIT License" src="https://img.shields.io/github/license/roots/bud?color=%23525ddc&style=flat-square" />
  <img alt="npm" src="https://img.shields.io/npm/v/@roots/bud.svg?color=%23525ddc&style=flat-square" />
  <img alt="Follow Roots" src="https://img.shields.io/twitter/follow/rootswp.svg?color=%23525ddc&style=flat-square" />
</p>

<h1 align="center"><strong>create-bud-app</strong></h1>

<p align="center">
  Interactive project scaffolding
</p>

---

## Overview

Creating a project is as simple as:

```sh
npx create-bud-app
```

You will be prompted for project details and asked what tools you would like to install. We recommend `swc` for js compilation and `postcss` for css preprocessing. No matter what you choose, you should end up with a buildable project 💪.

## Creating an App

**You’ll need to have Node 18.0.0 or later version on your local development machine** (but it’s not required on the server).

To create a new app, you may choose one of the following methods:

Using `npx`:

```sh
npx create-react-app my-app
```

Using `yarn`:

```sh
yarn create react-app my-app
```

The command will create a directory called `my-app` inside the current folder.

Inside that directory, it will generate the initial project structure and install any transitive dependencies:

```
my-app
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── tsconfig.json
└── src
    ├── index.css
    ├── index.js
    └── logo.svg
```

Your actual project may look somewhat different depending on what you chosen to install.

## Using a preset

There are several presets available via flags to quickly build popular project types:

### Recommended

Includes support for TypeScript, ES6 and postcss:

```sh
npx create-bud-app --recommended
```

### React

Includes support for TypeScript, JSX and postcss:

```sh
npx create-bud-app --react
```

### WordPress

Includes support for WordPress themes and plugins:

```sh
npx create-bud-app --wordpress
```

## Safety overrides

When targeting a non-empty directory you will be prompted to confirm your intent.

Even after confirming your intent, by default the tool will not overwrite existing files. You can override this behavior with the `--overwrite` flag:

```sh
npx create-bud-app --overwrite
```

## Running non-interactively

To run `create-bud-app` without interactive prompts use the `--no-interactive` flag:

```sh
npx create-bud-app --no-interactive
```

All options available via interactive prompts are also passable with CLI flags. Run `create-bud-app --help` for a listing of available command line flags.

When running `--no-interactive` in a non-empty directory there is obviously no way for you to confirm that was your intention. Instead, you can use the `--confirm-existing` flag to enable use of the tool in these situations:

```sh
npx create-bud-app --no-interactive --confirm-existing
```

A more complex example might look like:

```sh
npx create-bud-app react-app --no-interactive -p yarn -s swc -s postcss -s react -d redux
```

## Contributing

Contributions are welcome from everyone.

We have [contribution guidelines](https://github.com/roots/guidelines/blob/master/CONTRIBUTING.md) to help you get started.

## License

create-bud-app is licensed under MIT.

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
