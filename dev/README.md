# ./dev

> Build scripts, dockerfiles, yarn binaries.

**You don't need to think about this directory unless you do**

Almost no normal development tasks should need to modify anything here. You shouldn't really need to do anything with this directory unless you are specifically working on one of these scripts/tasks.

If you're bumping into something, please let someone know before you waste a bunch of time trying to figure out how to do it alone.

## Help needed

If you do want to help improve scripts in this directory, here are the most pressing things that need to be worked on.

- 🐳 [Resolving the `chrome.dockerfile` ARM/Intel incompatibility](#docker).
- ⚛️ [Improving the README's react-renderer implementation](#readme)
- 🚮 [Fixing the api documenter script or coming up with a new way of thinking about it](#site)
- 🎯 [Making more of our packages compatible with @vercel/ncc](#compile).

## compile

```
├── compile
     ├── cjs.ts
     ├── esm.ts
     └── options.ts
```

Scripts for [@vercel/ncc](https://github.com/vercel/ncc). 

ncc converts a package into a single js file. It is similar to rollup.

Right now this is applied to the following packages:

- @roots/container
- @roots/bud-dashboard
- @roots/bud-support
- @roots/wordpress-dependencies-webpack-plugin
- @roots/wordpress-externals-webpack-plugin
- @roots/entrypoints-webpack-plugin

Not all of our packages are compatible with running through ncc. It has a hard time with dynamic code. Still, it should be run on a package if it can be run.

There are two implementations in this directory as well as a file exporting shared options.

### ./dev/compiler/cjs && .dev/compiler/esm

Currently we're using cjs. Eventually we'll be using esm. The files are relatively well commented.

There is a wrapper for them in the cli (`yarn @bud compile [package]`), but they can be called directly like so: 

```sh
node ./dev/compile/cjs @roots/bud-support
```

A package does not have to built prior to compiling it with ncc. It will just be recompiled.

### .dev/compiler/options

You'll notice a set of excluded packages in `./dev/compile/options.ts`. In particular watch out for stuff like loaders. Make sure they are excluded.

The issue with loaders is not exclusive to loaders -- lots of stuff in Webpack is handled the way loaders are -- they generally are just passed around by path and are resolved later by Webpack. If you have bundled a loader (or whatever) with ncc that path won't exist at build time 💀.

## docker

```
├── docker
    ├── bud
    ├── bud.dockerfile
    └── chrome.dockerfile
```

Images used for development. 

- `bud.dockerfile` is the main dockerfile. 
- `chrome.dockerfile` is not currently in use but will be needed one day for testing things like `critical-css` in the browser. It is currently kind of busted due to upstream ARM/Intel incompatibilities.
- the `bud` directory contains bash scripts used by the container. 

## jest

```
├── jest
    ├── moduleNameMapper.js
    └── project.js
```

Jest scripts. These could probably be moved to `/bud/tests` but that isn't a priority. These scripts are fine.

- `moduleNameMapper.js` exports a function used in `/bud/config/jest.config.js` to map module names to source directories.
- `project.js` is a helper function inteneded for integration testing. It is used by `/bud/tests/util/integration.ts`.

## readme

```
├── readme
     ├── components
     ├── index.tsx
     ├── renderer
     └── templates
```

Used to generate READMEs in public packages (and the root README). They are written in JSX using a bespoke react renderer.

### `components` 

Reusable, composable chunks of README. Think: headers, footers, et al.


### `renderer` 

Contains the react-renderer implementation. It's kind of like a retrograde mdx in that it takes React components and generates markdown from them.

The renderer needs to be made great again, but a lot of the work to make something kind of cool is there and it has utility in our repo. You can see the full list of primitives which have been written in `./readme/renderer/components`. The main issue with the renderer at this point is centered around parsing component children (inner tags). Out on the top level everything is good to go.

### `templates`

Houses the readme templates. There are currently four:

  - `core` is a template for a core package (`@roots/bud`, `@roots/bud-framework`, etc.)
  - `extension` is a template for a bud extension (`@roots/bud-react`, etc.)
  - `library` is a template for a public package which is not specific to `bud`. Mostly webpack plugins, but also general utilities like `@roots/container`.
  - `root` is the root README.md template

There is no specialization between readmes of the same type. As in: the core template is applied to all packages in the exact same manner. It is highly generic. It sources data from the `package.json` in each directory.

## site

```
├── site
     ├── api-documenter.build.js
     └── cli-examples.ts
```

Build scripts relating to `/bud/sources/docs`. These don't live in `/bud/sources/docs` directly because of module incompatibilities and because it's easier to work on these tasks having them outside of the `/bud/sources` dir.

### `api-documenter.build` 

An absolute bog of swamp code based on [faast.js's api-documenter to docusaurus mdx build step](https://github.com/faastjs/faast.js/blob/master/build/make-docs.js). I'd say it's about 70% there but it might be better to just host api docs as their own thing entirely. Or, just fundamentally rethink it.

> God, imagine being the person who had to write that. - qwp6t, not realizing

> I wrote it. - kellymears 😭

Note that the _entire repo_ is written to the api-documenter specification (look for code comment blocks containing `@public`, `@internal`, `@remarks`, et al.) I think it's a good, reasonable schema for documentation. It should be compatible with most all of what's out there in terms of tsdoc style api documentation generators.

### `cli-examples` 

Literally perfect. It calls bud cli commands and stashes the output in `./sources/docs/src` for use in docusaurus.

## yarn

``` 
─── yarn
   ...
```

Mystery yarn bins. Everything in here is generated. 
