import {cosmiconfigSync} from 'cosmiconfig'
import TypeScriptLoader from '@endemolshinegroup/cosmiconfig-typescript-loader'

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
