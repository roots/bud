<p align="center"><img src="https://cdn.roots.io/app/uploads/logo-bud.svg" height="100" alt="bud.js" /></p>

<p align="center">
  <img alt="MIT License" src="https://img.shields.io/github/license/roots/bud?color=%23525ddc&style=flat-square" />
  <img alt="npm" src="https://img.shields.io/npm/v/@roots/bud.svg?color=%23525ddc&style=flat-square" />
</p>

<h1 align="center"><strong>@roots/bud-esbuild</strong></h1>

<p align="center">
  esbuild support for bud.js
</p>

---

## Installation

Install **@roots/bud-esbuild** to your project.

Yarn:

```sh
yarn add @roots/bud-esbuild --dev
```

npm:

```sh
npm install @roots/bud-esbuild --save-dev
```

## Usage

Once installed, esbuild should be ready to use in your project.

If you have a `tsconfig.json` in your project root it will automatically be registered with the compiler.

## API

### bud.esbuild.use

If you have one or more compilers installed alongside the esbuild extension you will want to call **bud.esbuild.use** in your config to ensure
esbuild is used to compile your code.

```ts title=bud.config.ts
export default async (bud) => {
  bud.esbuild.use();
  // ...config
};
```

## License

@roots/bud-esbuild is licensed under MIT.
