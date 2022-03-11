import {runIntegrations, test} from '../util/integration'

runIntegrations('vue', project => {
  return [
    ['main.js has contents', test.assetNotEmpty(project, 'main.js')],
    [
      'main.js is transpiled',
      test.assetDoesNotIncludeImport(project, 'main.js'),
    ],
    [
      'main.js matches snapshot',
      test.assetMatchesSnapshot(project, 'main.js'),
    ],
    ['main.css has contents', test.assetNotEmpty(project, 'main.css')],
    [
      'main.css is transpiled',
      test.assetDoesNotIncludeImport(project, 'main.css'),
    ],
    [
      'main.css matches snapshot',
      test.assetMatchesSnapshot(project, 'main.css'),
    ],
    [
      'manifest.json matches snapshot',
      test.manifestMatchesSnapshot(project),
    ],
  ]
})
