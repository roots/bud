<p align="center"><img src="https://cdn.roots.io/app/uploads/logo-bud.svg" height="100" alt="bud.js" /></p>

<p align="center">
  <img alt="MIT License" src="https://img.shields.io/github/license/roots/bud?color=%23525ddc&style=flat-square" />
  <img alt="npm" src="https://img.shields.io/npm/v/@roots/bud.svg?color=%23525ddc&style=flat-square" />
  <img alt="Follow Roots" src="https://img.shields.io/twitter/follow/rootswp.svg?color=%23525ddc&style=flat-square" />
</p>

<h1 align="center"><strong>@roots/bud-terser</strong></h1>

<p align="center">
  Adds terser support to Bud
</p>

---

## Installation

Install **@roots/bud-terser** to your project.

Yarn:

```sh
yarn add @roots/bud-terser --dev
```

npm:

```sh
npm install @roots/bud-terser --save-dev
```

The extension requires zero configuration, but you can customize its options if needed.

Here are some configuration examples for different use cases:

### Remove console.log statements and comments from the production build

```typescript
export default async (bud) => {
  bud.terser.dropConsole().dropComments();
};
```

### Keep comments in the minified output

```typescript
export default async (bud) => {
  bud.terser.dropComments(false);
};
```

### Disable mangling of variable names

```typescript
export default async (bud) => {
  bud.terser.set("terserOptions.mangle", false);
};
```

### Customize compression options

```typescript
export default async (bud) => {
  bud.terser.set("terserOptions.compress", {
    drop_console: true,
    drop_debugger: false,
    defaults: true,
    unused: true,
  });
};
```

### Use a custom regular expression for inclusion/exclusion of files

```typescript
export default async (bud) => {
  bud.terser.set("include", /src\/js\/.*\.js$/);
  bud.terser.set("exclude", /node_modules/);
};
```

To apply any of these configurations, add the respective code snippet to your bud.config.js file.

The @roots/bud-terser extension is included in the bud.js framework and is enabled by default for production builds.

## Contributing

Contributions are welcome from everyone.

We have [contribution guidelines](https://github.com/roots/guidelines/blob/master/CONTRIBUTING.md) to help you get started.

## License

@roots/bud-terser is licensed under MIT.

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
