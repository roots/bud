import {cosmiconfigSync} from 'cosmiconfig'
import TypeScriptLoader from '@endemolshinegroup/cosmiconfig-typescript-loader'

/**
 * Config (fn)
 */
export const config = moduleName =>
  cosmiconfigSync(moduleName, {
    searchPlaces: [
      `${moduleName}.config.ts`,
      `${moduleName}.config.js`,
    ],
    loaders: {
      '.ts': TypeScriptLoader,
    },
  }).search().config

/**
 * Not really doing much right now
 */
export const staticConfig = moduleName =>
  cosmiconfigSync(moduleName, {
    searchPlaces: [
      'package.json',
      `.${moduleName}rc`,
      `.${moduleName}rc.json`,
      `.${moduleName}rc.yaml`,
      `.${moduleName}rc.yml`,
      `.${moduleName}rc.ts`,
      `.${moduleName}rc.js`,
    ],
  }).search().config
