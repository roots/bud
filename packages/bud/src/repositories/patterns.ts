import type {RepositoryDefinition} from '@roots/bud-framework'

const patterns: RepositoryDefinition = {
  name: 'patterns',
  register: {
    js: /\.(js|jsx)$/,
    ts: /\.(ts|tsx)$/,
    vue: /\.vue$/,
    scss: /\.scss$/,
    scssModule: /\.module\.scss$/,
    css: /\.css$/,
    cssModule: /\.module\.css$/,
    svg: /\.svg$/,
    font: /\.(ttf|otf|eot|woff2?|png|jpe?g|gif|ico)$/,
    vendor: /node_modules/,
    image: /\.(png|svg|jpg|jpeg|gif)$/,
  },
}

export {patterns}
