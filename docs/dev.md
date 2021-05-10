## Editor support

Below are instructions for setting up editor support in VSCode (for MacOS). If you're on another OS or use VIM/Emacs, etc. [consult the yarn docs](https://yarnpkg.com/getting-started/editor-sdks).

- Install [ZipFS extension for VSCode](https://marketplace.visualstudio.com/items?itemName=arcanis.vscode-zipfs)
- Use `cmd`+`shift`+`p` (mac) in a TypeScript file. Choose 'Select TypeScript Version'. Pick 'Use Workspace Version'

## Documentation

Docs are built with `yarn docs` (ran from monorepo root).

Place package docs in `src/docs/`.

`src/docs/README.md` will be automatically processed and added to the repo root.

All other files in `src/docs` will be processed and added to `docs`.

Other documentation pages (including [this one](https://github.com/roots/bud/tree/stable/dev/docs/src/pages/dev.md)) are sourced from `dev/docs/src/pages`. The boilerplate header and footer are sourced from `dev/docs/src/templates`.

Templates applied to monorepo packages will pull the name and description of the pkg from the package's `package.json`.

### Reserved md tags

There are markdown tags to make linking a little less of a chore:

Link to doc page:

```md
Link to [documentation](https://github.com/roots/bud/tree/stable/docs/config/entry.md)
```

Link to a repo package by surrounding a roots package name with backticks:

```md
Link to [**@roots/bud**](https://github.com/roots/bud/tree/stable/packages/@roots/bud)
```

Link anywhere in the repo:

```md
Link to [bud package src directory](https://github.com/roots/bud/tree/stable/packages/@roots/bud/src)
```

Link to a github project:

```md
Link to @roots/sage
```
