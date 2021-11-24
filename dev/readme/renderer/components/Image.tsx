export class Image {
  public props: {
    title: string
    src: string
    width: number
  }

  public constructor(props?) {
    if (props) this.props = props
  }

  public render() {
    return `<img src="${this.props.src}" title="${this.props.title}" width="${this.props.width}" />`
  }
}
