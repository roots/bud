# @repo/compile-kit

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

## src/ncc

this is a re-export of ncc with some manual typings.

## src/cjs && src/esm

Currently we're using cjs. Eventually we'll be using esm. The files are relatively well commented.

There is a wrapper for them in the cli (`yarn @bud compile [package]`), but they can be called directly like so:

```sh
node ./dev/compile/cjs @roots/bud-support
```

A package does not have to built prior to compiling it with ncc. It will just be recompiled.

## ncc.config.js

You'll notice a set of excluded packages in `ncc.config.js`. In particular watch out for stuff like loaders. Make sure they are excluded.

The issue with loaders is not exclusive to loaders -- lots of stuff in Webpack is handled the way loaders are -- they generally are just passed around by path and are resolved later by Webpack. If you have bundled a loader (or whatever) with ncc that path won't exist at build time 💀.
