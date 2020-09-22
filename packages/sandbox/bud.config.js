// eslint-disable-next-line @typescript-eslint/no-var-requires
const bud = require('@roots/bud')
bud.bundle('app', [bud.src('index.js')])
bud.template(bud.src('index.html'), bud.env.repository)
bud.compile()
