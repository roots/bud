export class Ol {
  public constructor(public props) {}

  public render() {
    return `- ${this.children}\n`
  }

  public get children() {
    return Array.isArray(this.props.children)
      ? this.props.children.join('')
      : `${this.props.children}`
  }
}
