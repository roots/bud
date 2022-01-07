module.exports = {
  cwd: process.cwd(),
  apps: [
    {
      name: 'verdaccio',
      script: './node_modules/verdaccio/bin/verdaccio',
      args: '-c ./config/verdaccio.config.yml',
    },
  ],
}
