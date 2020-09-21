/* eslint-disable @typescript-eslint/no-var-requires */

/**
 * these utilities are lifted from react-dev-util. if there are updates to be made in react-dev-util,
 * it is quite likely packages imported here will be overwritten.
 *
 * reworks of these modules should be done outside of this dir to make it clear that we're forking.
 *
 * @see https://www.npmjs.com/package/react-dev-utils
 */

import formatWebpackMessages from './formatWebpackMessages'
import launchEditor from './launchEditor'
import launchEditorEndpoint from './launchEditorEndpoint'

const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles')
const eslintFormatter = require('react-dev-utils/eslintFormatter')

const util = {
  checkRequiredFiles,
  eslintFormatter,
  launchEditor,
  launchEditorEndpoint,
  formatWebpackMessages,
}

export {util as default}
