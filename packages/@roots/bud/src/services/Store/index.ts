import {Service, Store as Contract} from '@roots/bud-framework'
import _ from 'lodash'
import * as patterns from './patterns'

/**
 * Store service.
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud](https://git.io/Jkli3)
 */
export class Store extends Service implements Contract {
  /**
   * Service name
   */
  public name = 'service/store'

  /**
   * Service repository
   */
  public repository = {
    /**
     * RegExp
     */
    patterns,

    /**
     * Location
     */
    location: {
      project: process.cwd(),
      src: 'src',
      dist: 'dist',
      modules: 'node_modules',
      publicPath: '/',
      records: 'records.json',
      storage: '.bud',
    },

    extensions: {
      ['webpack-define-plugin']: null,
    },

    /**
     * Features
     */
    ci: false,
    clean: true,
    debug: false,
    define: {},
    discover: false,
    hash: false,
    template: null,
    install: false,
    log: false,
    manifest: true,

    /**
     * Values
     */
    name: this.app.name,
    fileFormat: '[name]',
    hashFormat: `[name].[contenthash]`,
    html: {
      enabled: true,
      template: null,
      replace: {},
    },

    /**
     * Server
     */
    server: {
      watch: {
        files: [
          '**/*.html',
          '**/*.php',
          '**/*.ejs',
          '!node_modules',
          '!vendor',
        ],
        options: {
          persistant: true,
        },
      },
      middleware: {
        dev: true,
        hot: true,
        proxy: false,
      },
      browser: {
        indicator: true,
        log: true,
        overlay: true,
      },
      proxy: {
        host: 'localhost',
        port: 8000,
      },
      host: 'localhost',
      port: 3000,
      methods: ['GET', 'HEAD'],
    },

    /**
     * Theme
     */
    theme: {
      spacing: 1,
      colors: {
        foreground: '#FFFFFF',
        faded: '#6C758F',
        primary: '#545DD7',
        primaryAlt: '#663399',
        error: '#dc3545',
        errorAlt: '#b22222',
        warning: '#FF611A',
        success: '#46D46A',
        accent: '#ff69b4',
        flavor: '#78C5D7',
      },
      screens: [
        [0, 40],
        [41, 60],
        [61, 80],
        [81, Infinity],
      ],
      columns: 12,
    },
  }

  /**
   * Get
   */
  public get<T = any>(path: Contract.Keys) {
    return _.get(this.repository, path) as T
  }
}
