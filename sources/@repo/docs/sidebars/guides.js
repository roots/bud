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
      items: [`cli/build`, `cli/clean`],
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
        `general-use/multi-compiler`,
        `general-use/node-api`,
        `general-use/esmodules`,
        `general-use/remote-sources`,
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
