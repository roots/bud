import Bud from '..'

/**
 * @todo hardcode garbagio
 */
enum SHAME {
  REL_DIR = '../../../',
}

/**
 * Helper utility to read a JSON config file into state.
 */
const ingestConfig = (
  store: Bud.Store,
  key: string,
  source: unknown,
) => {
  Object.entries(source).map(([k, v]) => {
    store.use(key).repository
      ? store.use(k).set(k, v)
      : store.create(k, v)
  })
}

/**
 * Read the project FS and try to set state basd on what is fuond
 */
const filesystemSetup = function (this: Bud): void {
  const [args] = this.store.query(['args'])

  // Hopefully resolves to node_modules/@roots
  this.makeDisk(
    '@roots',
    this.fs.path.resolve(__dirname, SHAME.REL_DIR),
    ['**/*'],
  )

  const projectDir = args.has('project')
    ? this.fs.path.resolve(process.cwd(), args.get('project'))
    : process.cwd()

  this.makeDisk('project', projectDir, ['**/*'])

  args.has('src') && this.srcPath(args.get('src'))
  args.has('build') && this.distPath(args.get('build'))

  this.fs.exists('package.json') &&
    ingestConfig(
      this.store,
      'pkg',
      this.fs.readJson('package.json'),
    )

  this.fs.exists('babel.config.js') &&
    ingestConfig(
      this.store,
      'babel',
      this.fs.require('babel.config.js'),
    )

  this.fs.exists('postcss.config.js') &&
    ingestConfig(
      this.store,
      'postcss',
      this.fs.require('postcss.config.js'),
    )

  this.fs.exists('.browserslist') &&
    ingestConfig(
      this.store,
      'browserslist',
      this.fs.require('.browserslist'),
    )
}

export {filesystemSetup as default}
