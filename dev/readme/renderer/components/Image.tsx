export class Image {
  public constructor(
    public props: {
      title: string
      src: string
      width: number
      html?: boolean
    },
  ) {}

  public render() {
    if (this.props.html) {
      return `<img src="${this.props.src}" title="${this.props.title}" width="${this.props.width}" />`
    }

    return `![${this.props.title}](${this.props.src})`
  }
}
