module.exports = {
  cwd: process.cwd(),
  apps: [
    {
      name: 'verdaccio',
      script: '/bud/node_modules/verdaccio/bin/verdaccio',
      args: '-c /verdaccio/config/verdaccio.config.yml',
    },
  ],
}
