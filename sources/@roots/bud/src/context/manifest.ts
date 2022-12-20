import type {File} from './config.js'

export default (config: Record<string, File>) => {
  if (!config[`package.json`]?.module) return {}
  return config[`package.json`].module
}
