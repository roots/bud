export class Span {
  public props

  public constructor(props?) {
    this.props = props
  }

  public render() {
    return `${this.children}`
  }

  public get children() {
    return Array.isArray(this.props.children)
      ? this.props.children
          .map(child => (child.render ? child.render() : child))
          .join('')
      : this.props.children
  }
}
