---
id: bud-api.facade
title: facade class
sidebar_label: facade class
hide_title: true
sidebar: "api"
slug: facade
---

## Facade class

Public interface for the Bud API

Signature:

```typescript
export declare class Facade
```

## Remarks

Virtual class representing a synchronous interface for use in consumer configs. these type signatures are synchronous regardless of if the underlying method is.

## Properties

| Property                                           | Modifiers | Type           | Description                                                                                                                                                       |
| -------------------------------------------------- | --------- | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [alias](/api/bud-api/facade/alias)                 |           | alias.facade   | Register shorthand for resolving modules using webpack aliases.                                                                                                   |
| [assets](/api/bud-api/facade/assets)               |           | assets.facade  | Copy static assets during compilation.                                                                                                                            |
| [autoload](/api/bud-api/facade/autoload)           |           | define         | Enable filename hashing of built assets.                                                                                                                          |
| [config](/api/bud-api/facade/config)               |           | config         | Modify the generated webpack config prior to compilation.                                                                                                         |
| [copy](/api/bud-api/facade/copy)                   |           | assets.facade  | Copy static assets during compilation.                                                                                                                            |
| [css](/api/bud-api/facade/css)                     |           | entryFacade    | Generate application entrypoints from source asset paths.                                                                                                         |
| [define](/api/bud-api/facade/define)               |           | define         | Define application variables                                                                                                                                      |
| [devtool](/api/bud-api/facade/devtool)             |           | devtool        | Configure sourcemaps                                                                                                                                              |
| [entry](/api/bud-api/facade/entry)                 |           | entryFacade    | Generate application entrypoints from source asset paths.                                                                                                         |
| [experiments](/api/bud-api/facade/experiments)     |           | experiments    | Configure experimental webpack options.                                                                                                                           |
| [externals](/api/bud-api/facade/externals)         |           | externals      | Specify a non-standard resolution strategy for modules with a matching name.                                                                                      |
| [extract](/api/bud-api/facade/extract)             |           | splitChunks    | Bundle vendor modules separately from application code.                                                                                                           |
| [hash](/api/bud-api/facade/hash)                   |           | hash           | Enable filename hashing of built assets.                                                                                                                          |
| [js](/api/bud-api/facade/js)                       |           | entryFacade    | Generate application entrypoints from source asset paths.                                                                                                         |
| [minimize](/api/bud-api/facade/minimize)           |           | minimize       | Enables minification of built assets.                                                                                                                             |
| [override](/api/bud-api/facade/override)           |           | config         | Modify the generated webpack config prior to compilation.                                                                                                         |
| [persist](/api/bud-api/facade/persist)             |           | persist        | Cache webpack builds to the filesystem.                                                                                                                           |
| [provide](/api/bud-api/facade/provide)             |           | provide        | Make a variable/module available throughout the entire application without needing to import it explicitly.                                                       |
| [proxy](/api/bud-api/facade/proxy)                 |           | proxy          | Set proxy settings for the development server.                                                                                                                    |
| [publicPath](/api/bud-api/facade/publicpath)       |           | publicPath     | By default it is assumed that assets are served from webroot (<code>/</code>). You can use this method to replace this value for apps served from a subdirectory. |
| [run](/api/bud-api/facade/run)                     |           | run            | Run the build                                                                                                                                                     |
| [runtime](/api/bud-api/facade/runtime)             |           | runtime        | Generate a runtime chunk intended to be inlined on the page.Useful for code splitting and dynamic imports.                                                        |
| [serve](/api/bud-api/facade/serve)                 |           | serve          | Configure development server.                                                                                                                                     |
| [setPublicPath](/api/bud-api/facade/setpublicpath) |           | setPublicPath  | By default it is assumed that assets are served from webroot (<code>/</code>). You can use this method to replace this value for apps served from a subdirectory. |
| [splitChunks](/api/bud-api/facade/splitchunks)     |           | splitChunks    | Bundle vendor modules separately from application code.                                                                                                           |
| [template](/api/bud-api/facade/template)           |           | templateFacade | Enable and/or configure a generated HTML template                                                                                                                 |
| [use](/api/bud-api/facade/use)                     |           | use            | Register an extension or set of extensions                                                                                                                        |
| [version](/api/bud-api/facade/version)             |           | hash           | Enable filename hashing of built assets.                                                                                                                          |
| [watch](/api/bud-api/facade/watch)                 |           | watch          | Configure the list of files that, when modified, will force the browser to reload (even in hot mode).                                                             |
| [webpackConfig](/api/bud-api/facade/webpackconfig) |           | config         | Modify the generated webpack config prior to compilation.                                                                                                         |
