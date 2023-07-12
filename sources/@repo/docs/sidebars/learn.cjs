module.exports = {
  sidebar: [
    {
      collapsed: false,
      items: [
        `getting-started/index`,
        `getting-started/create-bud-app`,
        `getting-started/adding-typescript`,
        `getting-started/adding-postcss`,
        `getting-started/adding-sass`,
        `getting-started/adding-react`,
        `getting-started/adding-tailwindcss`,
        `getting-started/adding-emotion`,
        `getting-started/adding-eslint`,
        `getting-started/adding-stylelint`,
        `getting-started/adding-vue`,
        `getting-started/adding-wordpress-support`,
      ],
      label: `Getting started`,
      type: `category`,
    },
    {
      items: [
        {
          items: [
            `config/files/bud.config`,
            `config/files/tsconfig`,
            `config/files/package`,
            `config/files/env`,
          ],
          label: `Files`,
          link: {
            slug: `/config/files`,
            type: `generated-index`,
          },
          type: `category`,
        },
        `config/paths`,
        `config/entrypoints`,
        `config/assets`,
        `config/optimization`,
        `config/server`,
      ],
      label: `Configuring bud.js`,
      link: {
        slug: `/config`,
        type: `generated-index`,
      },
      type: `category`,
    },
    {
      items: [
        `modules/js-modules`,
        `modules/css-modules`,
        `modules/static-assets`,
      ],
      label: `Source modules`,
      link: {
        description: `Learn about the features available to your application in the context of your source code.`,
        slug: `/learn/modules`,
        type: `generated-index`,
      },
      type: `category`,
    },
    {
      items: [
        {
          items: [`cli/build/production`, `cli/build/development`],
          label: `bud build`,
          link: {
            id: `cli/build/index`,
            type: `doc`,
          },
          type: `category`,
        },
        `cli/clean`,
        `cli/doctor`,
        `cli/repl`,
        `cli/upgrade`,
      ],
      label: `CLI`,
      link: {
        id: `cli/index`,
        type: `doc`,
      },
      type: `category`,
    },
    {
      items: [
        `general-use/customizing-loaders`,
        `general-use/compiler-sources`,
        `general-use/multi-instance`,
        `general-use/node-api`,
        `general-use/esmodules`,
        `general-use/extensions`,
        `general-use/remote-sources`,
        `general-use/pnpm`,
      ],
      label: `Going deeper`,
      type: `category`,
    },
    {
      items: [`extending/decorators`, `extending/packaging`],
      label: `Extending bud.js`,
      link: {
        id: `extending/index`,
        type: `doc`,
      },
      type: `category`,
    },
  ],
}
