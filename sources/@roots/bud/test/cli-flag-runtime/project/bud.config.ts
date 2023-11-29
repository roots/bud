import {bud} from '@roots/bud'

bud.after(async () => {
  await bud.fs.write(
    bud.path(`@storage`, `config.yml`),
    bud.compiler?.config ?? {},
  )
})
