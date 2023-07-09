module.exports = {
  sidebar: [
    {
      collapsed: false,
      items: [
        `getting-started/index`,
        `getting-started/create-bud-app`,
        `getting-started/adding-react`,
        `getting-started/adding-typescript`,
        `getting-started/adding-postcss`,
        `getting-started/adding-sass`,
        `getting-started/adding-emotion`,
        `getting-started/adding-wordpress-support`,
      ],
      label: `Installation`,
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
        `config/extensions`,
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
        `application-modules/js-modules`,
        `application-modules/css-modules`,
        `application-modules/static-assets`,
      ],
      label: `Application modules`,
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
        `general-use/remote-sources`,
        `general-use/managing-dependencies`,
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
