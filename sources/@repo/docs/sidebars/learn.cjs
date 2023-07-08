module.exports = {
  sidebar: [
    `index`,
    `create-bud-app`,
    {
      items: [
        `configure/bud.config.js`,
        `configure/paths`,
        `configure/assets`,
        `configure/optimizing`,
        `configure/extensions`,
        `configure/editor-integration`,
      ],
      label: `Project config`,
      link: {
        description: `Get started configuring bud.js`,
        slug: `/configure`,
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
      label: `Modules`,
      link: {
        description: `Using JS, CSS and static assets in your application code.`,
        slug: `/guides/modules`,
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
