/**
 * these utilities are lifted from react-dev-util. if there are updates to be made in react-dev-util,
 * it is quite likely packages imported here will be overwritten.
 *
 * reworks of these modules should be done outside of this dir to make it clear that we're forking.
 *
 * @see https://www.npmjs.com/package/react-dev-utils
 */
declare const launchEditorEndpoint = "/__open-stack-frame-in-editor";
import formatWebpackMessages from './formatWebpackMessages';
import launchEditor from './launchEditor';
import WatchMissingNodeModulesPlugin from 'react-dev-utils/WatchMissingNodeModulesPlugin';
import checkRequiredFiles from 'react-dev-utils/checkRequiredFiles';
import eslintFormatter from 'react-dev-utils/eslintFormatter';
import InterpolateHtmlPlugin from 'react-dev-utils/InterpolateHtmlPlugin';
export { checkRequiredFiles, eslintFormatter, launchEditor, launchEditorEndpoint, formatWebpackMessages, WatchMissingNodeModulesPlugin, InterpolateHtmlPlugin, };
