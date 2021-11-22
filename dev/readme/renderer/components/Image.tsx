export class Image {
  public props: {
    title: string
    src: string
  }

  public constructor(props?) {
    if (props) this.props = props
  }

  public render() {
    return `\[${this.props.title}](${this.props.src}})`
  }
}
