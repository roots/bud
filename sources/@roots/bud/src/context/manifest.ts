import type {ConfigFileDescription} from './config.js'

export default (config: Record<string, ConfigFileDescription>) => {
  if (!config[`package.json`]) return {}
  return config[`package.json`].module
}
