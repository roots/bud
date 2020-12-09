import {Bud} from '@roots/bud-typings'

/**
 * Brotli flag
 */
export const brotli = ({args, brotli}: Bud): void =>
  args.has('brotli') && brotli()

export const ci = ({args, mode}: Bud): void => {
  if (args.has('ci')) {
    mode.ci = true
  }
}

/**
 * Debug flag
 */
export const debug = ({args, features}: Bud): void =>
  args.has('debug') && features.enable('debug')

/**
 * Devtool flag/argument
 */
export const devtool = ({args, devtool}: Bud): void =>
  args.has('devtool') &&
  devtool(args.get('devtool') ?? '#@cheap-eval-source-map')

/**
 * Gzip flag
 */
export const gzip = ({args, gzip}: Bud): void =>
  args.has('gzip') && gzip()

/**
 * Hash flag
 */
export const hash = ({args, hash}: Bud): void =>
  args.has('hash') && hash()

/**
 * Minify flag
 */
export const minify = ({args, minify}: Bud): void =>
  args.has('minify') && minify()

/**
 * Runtime flag
 */
export const runtime = ({args, runtime}: Bud): void =>
  args.has('runtime') && runtime()

/**
 * Template flag
 */
export const template = ({args, template}: Bud): void =>
  args.has('html') && template()

/**
 * Vendor flag
 */
export const vendor = ({args, vendor}: Bud): void =>
  args.has('vendor') && vendor()

/**
 * Project path
 */
export const projectPath = ({
  args,
  fs,
  projectPath,
}: Bud): void =>
  projectPath(
    args.has('project')
      ? fs.path.resolve(fs.getBase(), args.get('project'))
      : fs.getBase(),
  )

/**
 * Src path
 */
export const srcPath = ({args, srcPath}: Bud): void =>
  srcPath(args.get('src') ?? 'src')

/**
 * Dist path
 */
export const distPath = ({args, distPath}: Bud): void =>
  distPath(args.get('dist') ?? 'dist')
