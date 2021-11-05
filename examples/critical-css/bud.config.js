// @ts-check

/**
 * @typedef {import('@roots/bud').Bud} Bud
 *
 * @param {Bud} app
 */
module.exports = async app => {
  await app
    .use([
      require('@roots/bud-postcss'),
      require('@roots/bud-tailwindcss'),
      require('@roots/bud-criticalcss'),
    ])
    .then(app => {
      app
        .template({
          template: app.path('project', 'public', 'index.html'),
        })
        .critical({
          replace: '%INLINE_CSS%',
          criticalOptions: {
            html: app.path('project', 'public', 'index.html'),
            base: '/',
          },
        })
        .hash()
        .entry('app', ['app.css'])
        .entry('app2', ['app2.css'])
        .splitChunks()
    })
}
