<p align="center"><img src="https://cdn.roots.io/app/uploads/logo-bud.svg" height="100" alt="bud.js" /></p>

<p align="center">
  <img alt="MIT License" src="https://img.shields.io/github/license/roots/bud?color=%23525ddc&style=flat-square" />
  <img alt="npm" src="https://img.shields.io/npm/v/@roots/bud.svg?color=%23525ddc&style=flat-square" />
  <img alt="Follow Roots" src="https://img.shields.io/twitter/follow/rootswp.svg?color=%23525ddc&style=flat-square" />
</p>

<h1 align="center"><strong>@roots/bud-criticalcss</strong></h1>

<p align="center">
  Adds critical.css support to Bud
</p>

---

## Installation

Install **@roots/bud-criticalcss** to your project.

Yarn:

```sh
yarn add @roots/bud-criticalcss --dev
```

npm:

```sh
npm install @roots/bud-criticalcss --save-dev
```

## Usage

### Usage

1. [Identify the markup to be used for critical css generation](#identify-source-markup)
2. [Enable the extension](#enable-the-extension)

### Identify source markup

You may use [bud.critical.src](#budcriticalsrc) to specify a URL or a path on disk to the markup that will be used to generate critical styles.

```typescript title="bud.config.mjs"
bud.critical.src(`http://example.test`);
```

```typescript title="bud.config.mjs"
bud.critical.src(bud.path("path/to/index.html"));
```

Or, you may use [bud.critical.html](#budcriticalhtml) to provide the markup directly.

```typescript title="bud.config.mjs"
bud.critical.html(`<html>...</html>`);
```

### Enable the extension

You must explicitly call [bud.critical.enable](#budcriticalenable) to enable the extension.

```typescript title="bud.config.mjs"
bud.critical.enable();
```

### Example

```typescript title="bud.config.mjs"
export default async (bud) => {
  bud.critical.src(`http://example.test`).enable(bud.isProduction);
};
```

### Api

### bud.critical.src

Specify the source with a URL:

```typescript title="bud.config.mjs"
bud.critical.src(`http://example.test`);
```

Specify the source with a local filepath:

```typescript title="bud.config.mjs"
bud.critical.src(bud.path(`@src`, `template.html`));
```

### bud.critical.html

Specify the markup directly

```typescript title="bud.config.mjs"
bud.critical.html(`<html>...</html>`);
```

### bud.critical.width

Specify the width of the browser viewport

```typescript title="bud.config.mjs"
bud.critical.width(1920);
```

### bud.critical.height

Specify the height of the browser viewport

```typescript title="bud.config.mjs"
bud.critical.height(1080);
```

### bud.critical.extract

Extract critical css from its source file. Extraction is enabled by default but can be disabled by passing `false`.

```typescript title="bud.config.mjs"
bud.critical.extract(false);
```

### bud.critical.ignore

Ignore certain CSS rules or declarations.

```typescript title="bud.config.mjs"
bud.critical.ignore({
  decl: [/^transition/],
  rule: [/^@font-face/],
});
```

### bud.critical.enable

Enable or disable the extension.

It accepts an optional boolean argument. If no argument is provided, the extension will be enabled.

```typescript title="bud.config.mjs"
bud.critical.enable();
```

## Contributing

Contributions are welcome from everyone.

We have [contribution guidelines](https://github.com/roots/guidelines/blob/master/CONTRIBUTING.md) to help you get started.

## License

@roots/bud-criticalcss is licensed under MIT.

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
