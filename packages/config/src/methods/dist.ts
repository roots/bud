import {Config} from '..'

export const dist: Config.Dist = function (path?: string) {
  return path
    ? this.fs.path.resolve(
        this.store.build.get('output.path'),
        path,
      )
    : this.store.build.get('output.path')
}
