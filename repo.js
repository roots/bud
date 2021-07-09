const repo = process.cwd()

module.exports = {
  name: 'bud',
  description:
    'A frontend build tooling framework combining the best parts of Symfony Encore and Laravel Mix',
  logo: 'https://cdn.roots.io/app/uploads/logo-bud.svg',
  links: {
    repo: 'https://github.com/roots/bud',
    site: 'https://budjs.netlify.app',
    discourse: 'https://discourse.roots.io/c/bud/24',
  },
  organization: {
    name: 'Roots Foundation, LLC',
    twitter: 'https://twitter.com/roots',
    site: 'https://roots.io',
    favicon: 'https://roots.io/favicon.ico',
  },
  packages: [
    '@roots/bud',
    '@roots/bud-api',
    '@roots/bud-babel',
    '@roots/bud-build',
    '@roots/bud-cache',
    '@roots/bud-cli',
    '@roots/bud-compiler',
    '@roots/bud-compress',
  ],
  sponsors: [
    {
      title: 'Kinsta',
      url: 'https://kinsta.com/?kaid=OFDHAJIXUDIV',
      image: 'https://cdn.roots.io/app/uploads/kinsta.svg',
    },
    {
      title: 'KM Digital',
      url: 'https://k-m.com/',
      image: 'https://cdn.roots.io/app/uploads/km-digital.svg',
    },
    {
      title: 'Carrot',
      url: 'https://carrot.com/',
      image: 'https://cdn.roots.io/app/uploads/carrot.svg',
    },
    {
      title: 'C21 Redwood Realty',
      url: 'https://www.c21redwood.com/',
      image: 'https://cdn.roots.io/app/uploads/c21redwood.svg',
    },
    {
      title: 'WordPress.com',
      url: 'https://wordpress.com/',
      image: 'https://cdn.roots.io/app/uploads/wordpress.svg',
    },
    {
      title: 'Icons8',
      url: 'https://icons8.com/',
      image: 'https://cdn.roots.io/app/uploads/icons8.svg',
    },
    {
      title: 'Harness Software',
      url: 'https://www.harnessup.com/',
      image:
        'https://cdn.roots.io/app/uploads/harness-software.svg',
    },
    {
      title: 'Coders Clan',
      url: 'https://www.codersclan.com/',
      image: 'https://cdn.roots.io/app/uploads/coders-clan.svg',
    },
    {
      title: 'Genero',
      url: 'https://generodigital.com/',
      image: 'https://cdn.roots.io/app/uploads/genero.svg',
    },
    {
      title: 'Motto',
      url: 'https://motto.ca/roots',
      image: 'https://cdn.roots.io/app/uploads/motto.svg',
    },
  ],
  contributors: [
    {
      name: 'Kelly Mears',
      url: 'https://github.com/kellymears',
      type: ['development', 'documentation'],
    },
    {
      name: 'Qwp6t',
      url: 'https://github.com/qwp6t',
      type: ['development', 'documentation'],
    },
    {
      name: 'Scott Walkinshaw',
      url: 'https://github.com/scott.walkinshaw',
      type: ['documentation'],
    },
  ],
}
