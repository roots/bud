module.exports = {
  sidebar: [
    `index`,
    `configure`,
    {
      type: `category`,
      label: `Going deeper`,
      items: [
        `general-use/cli`,
        `general-use/development-server`,
        `general-use/customizing-loaders`,
        `general-use/transpiler-sources`,
        `general-use/alternative-config-syntax`,
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
