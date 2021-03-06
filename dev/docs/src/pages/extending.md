# Authoring extensions

Augment Bud with new functionalities using the extensions API.

## Naming your extension

Extension package names should begin with `bud-`. This will ensure modules are resolvable from the extension, and makes it possible for extensions to provide template files.

If your extension is under an npm organizational scope, that is fine. Your extension will still work fine provided you otherwise adhere to the `bud-` convention.

## Extension manifest

Create a file in the root of your package called `manifest.yml`.

```yml
name: '@roots/bud-extension'
type: extension

peers:
  - '@roots/bud-postcss'

dependencies:
  dev:
    postcss: ^8.2.13
    sass: ^1.32.11

  production:
    pkgName: ^0.0.1

config:
  all:
    minimize: true
  
  dev:
    server:
      port: 8000

  production:
    runtime: 'single'
```

- `peers` indicates extensions which are required to be installed to the project.
- `dependencies` indicates packages which should be installed to the project when `bud extensions:install` is invoked.
- `config` details preconfiguration to be applied to the project (before user configs).

## Writing the module

### Name

This is used to identify your extension when it is imported or required.

This is technically the only required element of an extension module.

```ts
import {Module} from '@roots/bud-extensions'

const extension: Module = {
  name: 'xyz',
}

export default extension
export const {name} = extension
```

### Register

You can use `register` as a space to do general setup tasks.

```ts
import {Module} from '@roots/bud-extensions'
import {Framework} from '@roots/bud-framework'

const extension: Module = {
  name: 'xyz',
  register: (app: Framework) => {
    // .. do stuff
  }
}
```

### Boot

Called after all extensions have been registered. [Methods registered by api](#adding-config-functions) are also available.

```ts
import {Module} from '@roots/bud-extensions'
import {Framework} from '@roots/bud-framework'

const extension: Module = {
  name: 'xyz',
  boot: (app: Framework) => {
    // .. do stuff
  }
}
```

### Registering a webpack plugin

There are three functions used to define a Webpack plugin

| Fn      | Description                                                                      |
| ------- | -------------------------------------------------------------------------------- |
| make    | Returns the instantiated plugin                                                  |
| options | Returns the plugin options                                                       |
| when    | Return a `boolean` representing if the plugin should be used during compilation. |

#### Make

```ts
import {Module} from '@roots/bud-extensions'
import XyzPlugin from 'some-webpack-plugin'

const extension: Module = {
  name: "some-webpack-plugin",
  make: () => new XyzPlugin(),
};
```

#### When

But let's say we wanted to only apply this plugin if a particular `bud.option` value is `true`. And the user hasn't gotten their say yet, so we can't know now. This is the use case for `when`.

```ts
import {Module} from '@roots/bud-extensions'
import XyzPlugin from 'some-webpack-plugin'

const extension: Module = {
  name: "some-webpack-plugin",
  make: () => new XyzPlugin(),
  when: (bud) => bud.options.is("some-options-key", 777),
};
```

#### Options

If there are parts of the plugin which are configurable, we can use `options` instead of passing them directly to the constructor:

```ts
import {Module} from '@roots/bud-extensions'
import SomePlugin from 'some-webpack-plugin'

const extension: Module = {
  name: "xyz",
  make: (options, _bud) => XyzPlugin(options.all()),
  options: () => ({ param: "some-value" }),
  when: (_bud, options) => options.is("param", "some-value"),
};
```

Note that `options` will also be passed to `when` (as the second param, since far more frequently it is some store value which will wind up controlling whether the function is disabled/enabled).

### Adding config functions

Include an `api` property to bind objects or functions to the `bud` config builder.

The context of included functions is bound to the `Framework` object.

```ts
import {Module} from '@roots/bud-extensions'
import {Framework} from '@roots/bud-framework'

const extension: Module = {
  name: "xyz",
  api: {
    myConfigFunction: function (this: Framework, param): Framework {
      this.store.set("options.foo", param);
      return this;
    },
  },
};
```

## TypeScript

Bud is a TypeScript project but knowing Typescript is not required to write an extension. That said, we think that Typescript does make it easier to write extensions and provides value to the user of your extension. A Bud extension is a great first TS project.

### Declaring an extension type

In order to provide intellisense feedback to the user of `bud` and your extension, you'll need to augment the framework typings with your extension typings. 

The extensions in this repository do this in a file called `src/interface.ts`, but that is a totally non-enforced convention.

### Declaring the extension

Augment the extension definition provided by `Hooks.Extension.Definitions`. 

Without this augmentation the user will receive visual feedback in their IDE that the extension does not exist.

```ts
import {Module} from '@roots/bud-extension'

declare module '@roots/bud-framework' {
  namespace Hooks.Extension {
    interface Definitions {
      'xyz': Module
    }
  }
}
```

### Declaring config methods

If your extension adds a configuration function, you should add that to the `Framework` interface.

Adding a comment above your method declaration is a nice thing to do for the user.

```ts
declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * ## bud.configureXyz
     *
     * Customize the configuration for Xyz.
     */
    configureXyz: Xyz.Configure
  }
  
  namespace Xyz {
    type Configure = (config: Config) => Framework

    interface Config {
      someKey: string
      // ...
    }
  }
}
```

## Declaring a loader

If your extension adds a webpack loader, declare it on `Hooks.Loader.Definitions`

```ts
import {Loader} from '@roots/bud-build'

declare module '@roots/bud-framework' {
  namespace Hooks.Loader {
    interface Definitions {
      'xyz-loader': Loader
    }
  }
}
```

## Declaring a ruleset item

If your extension adds a webpack ruleset use item, declare it on `Hooks.Item.Definitions`

```ts
import {Item} from '@roots/bud-build'

declare module '@roots/bud-framework' {
  namespace Hooks.Item {
    interface Definitions {
      'xyz': Item
    }
  }
}
```

## Declaring a rule

If your extension adds a webpack rule, declare it on `Hooks.Rule.Definitions`

```ts
import {Rule} from '@roots/bud-build'

declare module '@roots/bud-framework' {
  namespace Hooks.Rule {
    interface Definitions {
      'xyz': Rule
    }
  }
}
```

### Typings in practice

Included below is an example addition from the `@roots/bud-library` extension.

```ts
import {Module} from '@roots/bud-extensions'

declare module "@roots/bud-framework" {
  interface Framework {
    /**
     * ## bud.library  [💁 Fluent]
     *
     * Enables DLL (dynamic link library) caching
     * of specified modules.
     *
     * ### Usage
     *
     * Supply `bud.library` the module you
     * would like to add to the DLL.
     *
     * ```js
     * bud.library('jquery')
     * ```
     *
     * Multiple modules can be added at once by
     * passing an array.
     *
     * ```js
     * bud.library(['react', 'react-dom'])
     * ```
     */
    library: Library.Configure;
  }

  namespace Library {
    type Configure = (this: Framework, config: Configuration) => Framework

    interface Configuration {
      modules: string[]
    }
  }
  
  namespace Hooks.Extensions {
    declare interface Definitions {
      '@roots/bud-library': Module
    }
  }
}
```
