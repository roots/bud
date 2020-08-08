const execa = require('execa')
const {join} = require('path')
const globby = require('globby')
const TypeDoc = require('typedoc')

const {workspaces: packages} = require('../package.json')

const app = new TypeDoc.Application()

packages.forEach(pkg => {
  app.bootstrap({
    mode: 'file',
    module: 'CommonJS',
    target: 'ES5',
    theme: 'vuepress',
    readme: 'none',
    plugin: 'typedoc-plugin-markdown',
    tsconfig: 'tsconfig.json',
    esModuleInterop: true,
    exclude: '**/node_modules',
    excludeNotDocumented: true,
    excludeNotExported: true,
    hideBreadcrumbs: true,
    hideGenerator: true,
  })

  const srcFiles= globby.sync(`${pkg}/src/index.ts`)
  const pkgName = pkg.split('/')[pkg.split('/').length - 1]

  const docsPath = `docs/${pkgName}`
  app.generateDocs(
    srcFiles,
    docsPath,
  )
  execa.sync('cp', [`${docsPath}/README.md`, `docs/roots/docs/bud/master/api-${pkgName}.md`])
})

execa('yarn', ['docs:dev'], {cwd: join(process.cwd(), `docs/roots`)}).stdout.pipe(process.stdout);
