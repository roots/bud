import {Config} from '..'

export const distPath: Config.DistPath = function (segment) {
  !this.store['args'].get('dist') &&
    this.store['paths'].set(
      'dist',
      this.hooks.filter(
        'api.distPath',
        this.fs.path.resolve(
          this.store['paths'].get('project'),
          segment,
        ),
      ),
    )

  return this
}
