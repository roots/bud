import {readFileSync} from 'fs-extra'

export class File {
  public props

  public constructor(props) {
    this.props = props
  }

  public render() {
    return readFileSync(
      `${process.cwd()}/${this.props.path}`,
      'utf8',
    )
  }
}
