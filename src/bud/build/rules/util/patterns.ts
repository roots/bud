/**
 * loader test regex patterns
 *
 * @typedef {object} pattern
 * @prop {RegExp} sass
 * @prop {RegExp} sassModule
 * @prop {RegExp} css
 * @prop {cssModule} cssModule
 */
const patterns = {
  js: /\.(js|jsx)$/,
  ts: /\.(ts|tsx)$/,
  scss: /\.scss$/,
  scssModule: /\.module\.(scss|sass)$/,
  css: /\.css$/,
  cssModule: /\.module\.css$/,
  svg: /\.svg$/,
  font: /\.(ttf|otf|eot|woff2?|png|jpe?g|gif|ico)$/,
  vendor: /node_modules/,
  image: /\.(png|svg|jpg|gif)$/,
}

export {patterns}
