- [Editor support](#editor-support)
- [Testing](#testing)
- [Workflow](#workflow)
- [Releasing](#releasing)
- [Documentation](#documentation)
  - [Reserved md tags](#reserved-md-tags)

## Editor support

Below are instructions for setting up editor support in VSCode (for MacOS). If you're on another OS or use VIM/Emacs, etc. [consult the yarn docs](https://yarnpkg.com/getting-started/editor-sdks).

- Install [ZipFS extension for VSCode](https://marketplace.visualstudio.com/items?itemName=arcanis.vscode-zipfs)
- Use `cmd`+`shift`+`p` (mac) in a TypeScript file. Choose 'Select TypeScript Version'. Pick 'Use Workspace Version'

## Testing

Run `yarn test` to run the test suite.

There are a few logging globals defined for your convenience:

- `log`
- `error`
- `success`

Logger docs: [Signale](https://github.com/klaussinani/signale).

## Workflow

Work should be done on feature branches and PRs should be made to the `next` branch. Merging to `next` should be treated as intent to ship code. The intended release version should be indicating using a milestone.

When the time comes to release, a PR from `next->stable` should be squash merged with the version as the title of the PR.

## Releasing

In order to do a release you will need to log into npm _through yarn_: `yarn npm login`. You have to do this through yarn even if you are already logged into npm.

For a preview release, versions should be bumped on the feature branch prior to merging to `next`.

```sh
yarn workspaces foreach --no-private version [prepatch|preminor|premajor]
```

For a mainline release, versions should be bumped on the `next` branch prior to merging to `stable`.

```sh
yarn workspaces foreach --no-private version [patch|minor|major]
```

Prior to release, run the preparatory scripts to make sure everything is working as expected:

```sh
# Installs, builds, generates docs, etc. on clean base
./dev/scripts/prep.sh

# Ensure examples are buildable
./dev/scripts/build-examples.sh

# Install to update yarn.lock. This should clean up any changes which may still be present after building the examples.
yarn install

# Your git status should be clean. If you have any tracked changes at this point in time, something is amiss.
```

Assuming all went well, ship it!

```sh
yarn workspaces foreach --no-private npm publish --access public
```

## Documentation

Docs are built with `yarn docs` (ran from monorepo root).

Place package docs in `src/docs/`.

`src/docs/README.md` will be automatically processed and added to the repo root.

All other files in `src/docs` will be processed and added to `docs`.

Other documentation pages (including [this one](https://github.com/roots/bud/tree/stable/dev/docs/src/pages/dev.md)) are sourced from `dev/docs/src/pages`. The boilerplate header and footer are sourced from `dev/docs/src/templates`.

Templates applied to monorepo packages will pull the name and description of the pkg from the package's `package.json`.

### Reserved md tags

There are markdown tags to make linking a little less of a chore.

- Link to a doc page with `docs:config/entry` as an md url
- Link to a repo path using `url:packages/@roots/bud/src` as an md link url
- Link to a roots package by surrounding a package name with backticks: (like '[**@roots/bud**](https://github.com/roots/bud)', but using backticks)
