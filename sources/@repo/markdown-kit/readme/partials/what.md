**bud.js** is a web-focused build tool with add-on support for Babel, React, PostCSS, Sass, Typescript, esbuild, ESLint, Prettier, and more.

The standard **bud.js** compiler leverages webpack, but is open to being extended to support other build tools. In the future, we hope to provide support for alternatives.

**bud.js** is written in TypeScript but fully supports projects written in vanilla JavaScript.

### Goals

**bud.js** wants to be:

- **Reliable**, yielding consistent and predictable behaviors regardless of specified options.
- **Fast**, leveraging parallel processing, smart caching and an asyncronous events based API to keep build times minimal.
- **Extensible**, with a fully featured plugin system to support an ecosystem of packaged modules
- **Simple**, to get started and straight forward to maintain

### Features

- Zero config by default. Check out this [codesandbox template with react, postcss modules and no config](https://codesandbox.io/s/bud-zero-config-or4tby).
- Modular by design. Use only what you need.
- Multi-compiler support.
- Heckin&rsquo; fast.
- Lux developer tooling and semi-automated dependency management.
- Support for configuration files authored with TypeScript, JSON, YML, CJS and ESM.
- Support for CDNs like skypack and unpkg. [See documentation on using remote sources](https://bud.js.org/guides/general-use/remote-sources) or this [example sandbox using skypack modules](https://codesandbox.io/s/bud-remote-sources-q5ghzh?)
- Support for outputting Ecmascript modules (experimental). [See documentation on outputting ESM](https://bud.js.org/guides/general-use/esmodules).
- Customizable and extensible. Add new features. Swap our core components with your own.
