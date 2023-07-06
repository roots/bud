export default async app => {
  app.entry('app', await app.glob('@src/index.{js,css}'))
}
