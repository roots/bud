/* eslint-disable @typescript-eslint/no-var-requires */

/**
 * these utilities are lifted from react-dev-util. if there are updates to be made in react-dev-util,
 * it is quite likely packages imported here will be overwritten.
 *
 * reworks of these modules should be done outside of this dir to make it clear that we're forking.
 *
 * @see https://www.npmjs.com/package/react-dev-utils
 */

import WatchMissingNodeModulesPlugin from 'react-dev-utils/WatchMissingNodeModulesPlugin'
import checkRequiredFiles from 'react-dev-utils/checkRequiredFiles'
import eslintFormatter from 'react-dev-utils/eslintFormatter'
import InterpolateHtmlPlugin from 'react-dev-utils/InterpolateHtmlPlugin'

export {
  WatchMissingNodeModulesPlugin,
  checkRequiredFiles,
  eslintFormatter,
  InterpolateHtmlPlugin,
}

export const launchEditorEndpoint =
  '/__open-stack-frame-in-editor'

export {formatWebpackMessages} from './formatWebpackMessages'
export {launchEditor} from './launchEditor'
