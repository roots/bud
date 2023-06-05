module.exports = {
  sidebar: [
    `index`,
    `create-bud-app`,
    {
      type: `category`,
      label: `Project config`,
      link: {
        type: `generated-index`,
        description: `Get started configuring bud.js`,
        slug: `/configure`,
      },
      items: [
        `configure/bud.config.js`,
        `configure/paths`,
        `configure/assets`,
        `configure/optimizing`,
        `configure/extensions`,
        `configure/editor-integration`,
      ],
    },
    {
      type: `category`,
      label: `Modules`,
      link: {
        type: `generated-index`,
        description: `Using JS, CSS and static assets in your application code.`,
        slug: `/guides/modules`,
      },
      items: [
        `modules/js-modules`,
        `modules/css-modules`,
        `modules/static-assets`,
      ],
    },
    {
      type: `category`,
      label: `CLI`,
      link: {
        type: `doc`,
        id: `cli/index`,
      },
      items: [
        {
          type: `category`,
          label: `bud build`,
          link: {
            type: `doc`,
            id: `cli/build/index`,
          },
          items: [`cli/build/production`, `cli/build/development`],
        },
        `cli/clean`,
        `cli/doctor`,
        `cli/repl`,
      ],
    },
    {
      type: `category`,
      label: `Going deeper`,
      items: [
        `general-use/development-server`,
        `general-use/customizing-loaders`,
        `general-use/compiler-sources`,
        `general-use/alternative-config-syntax`,
        `general-use/config-layers`,
        `general-use/extensions`,
        `general-use/multi-instance`,
        `general-use/node-api`,
        `general-use/esmodules`,
        `general-use/remote-sources`,
        `general-use/managing-dependencies`,
        `general-use/pnpm`,
      ],
    },
    {
      type: `category`,
      label: `Extending bud.js`,
      link: {
        type: `doc`,
        id: `extending/index`,
      },
      items: [`extending/decorators`, `extending/packaging`],
    },
  ],
}
