import {factory} from './factory/index.js'
;(async () => {
  const bud = await factory(
    {mode: `development`, args: {mode: `development`}},
    true,
  )
  bud.context.mode = `development`
  try {
    await bud.run()
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error.message)
    // eslint-disable-next-line n/no-process-exit
    process.exit()
  }
})()
