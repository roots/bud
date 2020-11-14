import {Bud} from './Bud'

import * as api from '@roots/bud-api'
import * as containers from './containers'
import * as extensions from './extensions'
import * as items from './items'
import * as loaders from './loaders'
import * as rules from './rules'

import {Features} from './containers/features'
import {Patterns} from './containers/patterns'

export type {Features}
export type {Patterns}

const bud = new Bud({
  containers,
  loaders: {
    [`css-loader`]: loaders.css,
    [`file-loader`]: loaders.file,
    [`mini-css-loader`]: loaders.minicss,
    [`raw-loader`]: loaders.raw,
    [`resolve-url-loader`]: loaders.resolve,
    [`style-loader`]: loaders.style,
    [`url-loader`]: loaders.url,
    [`cache-loader`]: loaders.cache,
    [`thread-loader`]: loaders.thread,
  },
  items: {
    ['cache']: items.cache,
    ['css']: items.css,
    ['file']: items.file,
    ['mini-css']: items.minicss,
    ['raw']: items.raw,
    ['resolve-url']: items.resolve,
    ['style']: items.style,
    ['svg']: items.svg,
    ['thread']: items.thread,
  },
  rules: {
    css: rules.css,
    font: rules.font,
    html: rules.html,
    image: rules.image,
    js: rules.js,
    svg: rules.svg,
  },
  extensions: {
    [`clean-webpack-plugin`]: extensions.cleanWebpack,
    [`compression-webpack-plugin-gzip`]: extensions.gzip,
    [`compression-webpack-plugin-brotli`]: extensions.brotli,
    [`ignore-emit-webpack-plugin`]: extensions.ignoreEmit,
    [`webpack-config-dump-plugin`]: extensions.configDump,
    [`copy-webpack-plugin`]: extensions.copy,
    [`webpack-define-plugin`]: extensions.define,
    [`webpack-hot-module-replacement-plugin]`]: extensions.hotModuleReplacement,
    [`html-webpack-plugin`]: extensions.html,
    [`html-hard-disk-plugin`]: extensions.htmlHardDisk,
    [`interpolate-html`]: extensions.interpolateHtml,
    [`webpack-manifest-plugin`]: extensions.manifest,
    [`mini-css-extract-plugin`]: extensions.miniCssExtract,
    [`webpack-provide-plugin`]: extensions.provide,
    [`terser-webpack-plugin`]: extensions.terser,
    [`watch-missing-modules`]: extensions.watchMissingModules,
    [`write-file-webpack-plugin`]: extensions.writeFile,
  },
  api: {
    addPlugin: api.addPlugin,
    alias: api.alias,
    brotli: api.brotli,
    buildCache: api.buildCache,
    copy: api.copy,
    define: api.define,
    dev: api.dev,
    devtool: api.devtool,
    dist: api.dist,
    distPath: api.distPath,
    entry: api.entry,
    externals: api.externals,
    hash: api.hash,
    gzip: api.gzip,
    glob: api.glob,
    library: api.library,
    minify: api.minify,
    project: api.project,
    projectPath: api.projectPath,
    provide: api.provide,
    publicPath: api.publicPath,
    run: api.run,
    runtime: api.runtime,
    src: api.src,
    srcPath: api.srcPath,
    template: api.template,
    use: api.use,
    target: api.target,
    terser: api.terser,
    vendor: api.vendor,
    when: api.when,
  },
}).init()

export {bud, bud as default}
