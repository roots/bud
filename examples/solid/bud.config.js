export default async bud =>
  bud.entry({app: await bud.glob('*.{js,css}')})
