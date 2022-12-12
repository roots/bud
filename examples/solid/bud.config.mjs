export default async bud =>
  bud.template().entry({app: await bud.glob('*.{js,css}')})
