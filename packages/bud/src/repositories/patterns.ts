import type {RepositoryDefinition} from '@roots/bud-typings'

const patterns: RepositoryDefinition = {
  name: 'patterns',
  register: {
    js: /\.(js|jsx)$/,
    ts: /\.(ts|tsx)$/,
    vue: /\.vue$/,
    sass: /\.(scss|sass)$/,
    sassModule: /\.module\.(scss|sass)$/,
    css: /\.css$/,
    cssModule: /\.module\.css$/,
    svg: /\.svg$/,
    font: /\.(ttf|otf|eot|woff2?|png|jpe?g|gif|ico)$/,
    modules: /(node_modules|bower_components)/,
    image: /\.(png|svg|jpg|jpeg|gif)$/,
  },
}

export {patterns as default}
