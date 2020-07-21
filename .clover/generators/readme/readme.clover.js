const package = require('../../../package.json')

module.exports = {
  name: 'readme',
  description: 'Generate the repo readme',
  data: {
    name: package.name,
    license: package.licenses[0].type,
    sponsors: [
      {name: 'Kinsta', svg: 'https://cdn.roots.io/app/uploads/kinsta.svg', href: "https://kinsta.com/?kaid=OFDHAJIXUDIV"},
      {name: 'KM Digital', svg: 'https://cdn.roots.io/app/uploads/km-digital.svg', href: 'https://k-m.com/'},
      {name: 'Carrot', svg: 'https://cdn.roots.io/app/uploads/carrot.svg', href: 'https://carrot.com/'},
    ],
  },
  tasks: [
    {
      task: 'compile',
      src: 'readme.md.hbs',
      dest: 'README.md',
      parser: 'markdown',
    },
  ],
}
