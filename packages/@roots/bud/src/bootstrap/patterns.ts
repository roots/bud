/**
 * ## patterns [🍱 _Container_]
 *
 * Collection of common RegExp objects.
 *
 * The advantage of using them in
 * a container object is that they can be
 * easily redefined by extensions.
 *
 * ### Usage
 *
 * **Get a regular expression matching files with `.js` extension**
 *
 * ```js
 * bud.patterns.get('js')
 * ```
 *
 * **Redefine a regular expression**
 *
 * ```js
 * bud.patterns.set('cssModule', /\.module\.css$/)
 * ```
 */

export const css = /\.css$/
export const cssModule = /\.module\.css$/
export const font = /\.(ttf|otf|eot|woff2?|png|jpe?g|gif|ico)$/
export const html = /\.(html?)$/
export const image = /\.(png|svg|jpg|jpeg|gif)$/
export const js = /\.(js|jsx)$/
export const modules = /(node_modules|bower_components)/
export const sass = /\.(scss|sass)$/
export const sassModule = /\.module\.(scss|sass)$/
export const svg = /\.svg$/
export const ts = /\.(ts|tsx)$/
export const vue = /\.vue$/
