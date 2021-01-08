import type Bud from './Bud'
/**
 * Brotli flag
 */
export const brotli = (bud: Bud): void => {
  bud.store.has('args.brotli') && bud.brotli()
}

/**
 * Devtool flag/argument
 */
export const devtool = (bud: Bud): void => {
  bud.store.has('args.devtool') &&
    devtool(bud.store.get('args.devtool'))
}

/**
 * Gzip flag
 */
export const gzip = (bud: Bud): void => {
  bud.store.isTrue('args.gzip') && bud.gzip()
}

/**
 * Hash flag
 */
export const hash = (bud: Bud): void => {
  bud.store.has('args.hash') && bud.hash()
}

/**
 * Minify flag
 */
export const minify = (bud: Bud): void => {
  bud.store.has('args.minify') && bud.minify()
}

/**
 * Runtime flag
 */
export const runtime = (bud: Bud): void => {
  bud.store.has('args.runtime') && bud.runtime()
}

/**
 * Template flag
 */
export const template = (bud: Bud): void => {
  bud.store.has('args.html') && bud.template()
}

/**
 * Vendor flag
 */
export const vendor = (bud: Bud): void => {
  bud.store.has('args.vendor') && bud.vendor()
}

/**
 * Project path
 */
export const projectPath = (bud: Bud): void => {
  bud.projectPath(
    bud.store.has('args.project')
      ? bud.disk
          .get('project')
          .path.resolve(
            bud.disk.baseDir,
            bud.store.get('args.project'),
          )
      : bud.disk.baseDir,
  )
}

/**
 * Src path
 */
export const srcPath = (bud: Bud): void => {
  bud.srcPath(
    bud.store.has('args.src')
      ? bud.store.get('args.src')
      : 'src',
  )
}

/**
 * Dist path
 */
export const distPath = (bud: Bud): void => {
  bud.distPath(
    bud.store.has('args.dist')
      ? bud.store.get('args.dist')
      : 'dist',
  )
}
