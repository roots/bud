// tslint-enable
const bud = require('@roots/bud')
bud.bundle('app', ['index.js'])

bud.compiler.setConfig(bud.config(bud)).compile()

bud.server.setConfig(bud.options.get('server'))
bud.server.setCompiler(bud.compiler.getCompiler())

bud.dump([bud.compiler.getCompiler(), bud.server])
