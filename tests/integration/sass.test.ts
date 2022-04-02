import {runIntegrations, test} from '../util/integration'

runIntegrations('sass', project => {
  return [
    ['app.css has contents', test.assetNotEmpty(project, 'app.css')],
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
