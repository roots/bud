export class P {
  public props

  public constructor(props?) {
    this.props = props
  }

  public render() {
    return `${this.children}\n`
  }

  public get children() {
    return Array.isArray(this.props.children)
      ? this.props.children.join('')
      : this.props.children
  }
}
