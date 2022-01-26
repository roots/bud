import {runIntegrations, test} from '../util/integration'

/**
 * Typescript integration tests
 */
runIntegrations('typescript', project => {
  return [
    [
      'app.js has contents',
      test.assetNotEmpty(project, 'app.js'),
    ],
    [
      'app.js is transpiled',
      test.assetDoesNotIncludeImport(project, 'app.js'),
    ],
    [
      'app.js matches snapshot',
      test.assetMatchesSnapshot(project, 'app.js'),
    ],
  ]
})
