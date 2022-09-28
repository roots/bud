module.exports = {
  sidebar: [
    `index`,
    `configure`,
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
        `general-use/transpiler-sources`,
        `general-use/alternative-config-syntax`,
        `general-use/config-layers`,
        `general-use/extensions`,
        `general-use/multi-instance`,
        `general-use/node-api`,
        `general-use/esmodules`,
        `general-use/remote-sources`,
        `general-use/managing-dependencies`,
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
