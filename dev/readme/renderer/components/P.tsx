export class P {
  public constructor(public props?) {}

  public render() {
    return `${this.children}\n`
  }

  public get children() {
    return Array.isArray(this.props.children)
      ? this.props.children
          .map(child => (child?.render ? child.render() : child))
          .join('')
      : this.props.children
  }
}
