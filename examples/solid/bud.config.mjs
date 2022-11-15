export default async app =>
  app.template().entry({app: await app.glob('*.{js,css}')})
