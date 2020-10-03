import {Config} from '..'

export const src: Config.Src = function (path?) {
  return path
    ? this.fs.path.resolve(this.store['paths'].get('src'), path)
    : this.store['paths'].get('src')
}
