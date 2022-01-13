import {runIntegration, test} from '../util/integration'

runIntegration('babel', project => {
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
    [
      'app.css has contents',
      test.assetNotEmpty(project, 'app.css'),
    ],
    [
      'app.css is transpiled',
      test.assetDoesNotIncludeImport(project, 'app.css'),
    ],
    [
      'app.css matches snapshot',
      test.assetMatchesSnapshot(project, 'app.css'),
    ],
    [
      'manifest.json matches snapshot',
      test.manifestMatchesSnapshot(project),
    ],
  ]
})
