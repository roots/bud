# @repo/readme-kit

Used to generate READMEs in public packages (and the root README). They are written in JSX using a bespoke react renderer.

## `components`

Reusable, composable chunks of README. Think: headers, footers, et al.

## `renderer`

Contains the react-renderer implementation. It's kind of like a retrograde mdx in that it takes React components and generates markdown from them.

The renderer needs to be made great again, but a lot of the work to make something kind of cool is there and it has utility in our repo. You can reference the primitives in `./readme/renderer/components`. The main issue with the renderer at this point is centered around parsing component children (inner tags). Out on the top level everything is good to go.

## `templates`

Houses the readme templates. There are currently four:

- `core` is a template for a core package (`@roots/bud`, `@roots/bud-framework`, etc.)
- `extension` is a template for a bud extension (`@roots/bud-react`, etc.)
- `library` is a template for a public package which is not specific to `bud`. Mostly webpack plugins, but also general utilities like `@roots/container`.
- `root` is the root README.md template

There is no specialization between readmes of the same type. As in: the core template is applied to all packages in the exact same manner. It is highly generic. It sources data from the `package.json` in each directory.
