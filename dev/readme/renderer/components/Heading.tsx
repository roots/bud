export class Heading {
  public constructor(public props?) {}

  public render() {
    return `${'#'.repeat(this.props.level)} ${this.children}\n`
  }

  public get children() {
    return Array.isArray(this.props.children)
      ? this.props.children.map(child => child).join('')
      : this.props.children
  }
}
