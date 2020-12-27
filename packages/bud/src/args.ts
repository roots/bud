import type Bud from './Bud'

/**
 * Brotli flag
 */
export const brotli = (bud: Bud): void => {
  bud.args.has('brotli') && bud.brotli()
}

/**
 * CI flag
 */
export const ci = (bud: Bud): void => {
  bud.mode.ci = bud.args.has('ci')
}

/**
 * Debug flag
 */
export const debug = (bud: Bud): void =>
  bud.args.has('debug') && bud.features.enable('debug')

/**
 * Devtool flag/argument
 */
export const devtool = (bud: Bud): void => {
  bud.args.has('devtool') &&
    bud.devtool(
      bud.args.get('devtool') ?? '#@cheap-eval-source-map',
    )
}

/**
 * Gzip flag
 */
export const gzip = (bud: Bud): void => {
  bud.args.has('gzip') && bud.gzip()
}

/**
 * Hash flag
 */
export const hash = (bud: Bud): void => {
  bud.args.has('hash') && bud.hash()
}

/**
 * Minify flag
 */
export const minify = (bud: Bud): void => {
  bud.args.has('minify') && bud.minify()
}

/**
 * Runtime flag
 */
export const runtime = (bud: Bud): void => {
  bud.args.has('runtime') && bud.runtime()
}

/**
 * Template flag
 */
export const template = (bud: Bud): void => {
  bud.args.has('html') && bud.template()
}

/**
 * Vendor flag
 */
export const vendor = (bud: Bud): void => {
  bud.args.has('vendor') && bud.vendor()
}

/**
 * Project path
 */
export const projectPath = (bud: Bud): void => {
  bud.projectPath(
    bud.args.has('project')
      ? bud.fs.path.resolve(
          bud.fs.getBase(),
          bud.args.get('project'),
        )
      : bud.fs.getBase(),
  )
}

/**
 * Src path
 */
export const srcPath = (bud: Bud): void => {
  bud.srcPath(bud.args.get('src') ?? 'src')
}

/**
 * Dist path
 */
export const distPath = (bud: Bud): void => {
  bud.distPath(bud.args.get('dist') ?? 'dist')
}
