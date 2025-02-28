<p align="center"><img src="https://cdn.roots.io/app/uploads/logo-bud.svg" height="100" alt="bud.js" /></p>

<p align="center">
  <img alt="MIT License" src="https://img.shields.io/github/license/roots/bud?color=%23525ddc&style=flat-square" />
  <img alt="npm" src="https://img.shields.io/npm/v/@roots/bud.svg?color=%23525ddc&style=flat-square" />
</p>

<h1 align="center"><strong>create-bud-app</strong></h1>

<p align="center">
  Get up and running fast with our interactive app scaffolding utility
</p>

---

## Overview

Creating a project is as simple as:

```sh
npx create-bud-app
```

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

Your actual project may look somewhat different depending on what you chosen to install. For example, if you add support for `eslint`, you will wind up with an `eslint.config.js` file in your project root.

## Installing from a preset

There are several presets available to quickly build popular project types:

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

Includes support for Typescript, ES6, and postcss for WordPress themes and plugins:

```sh
npx create-bud-app --wordpress
```

## Customizing presets

Presets are installed non-interactively. If you want to customize a preset interactively use the `--customize` flag:

```sh
npx create-bud-app --wordpress --customize
```

This is nice if you want to use a preset but need to just make a couple changes to it.

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

## License

create-bud-app is licensed under MIT.
