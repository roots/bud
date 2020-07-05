import {join} from 'path'

/**
 * makePreset
 * @param   {object.<bud>}
 * @return  {void}
 */
const makePreset = bud => {
  /**
   * Construct an absolute path from a preset relative path.
   * @param   {string} relativePath - relative path
   * @return  {string} absolute path
   */
  const preset = relativePath => join(bud.paths.framework, 'config', relativePath)

  return preset
}

export {makePreset}
