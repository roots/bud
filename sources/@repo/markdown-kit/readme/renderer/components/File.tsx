import fs from 'fs-extra'

export class File {
  public props

  public constructor(props) {
    this.props = props
  }

  public render() {
    return fs.readFileSync(`${process.cwd()}/${this.props.path}`, 'utf8')
  }
}
