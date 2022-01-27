export class Li {
  public constructor(public props) {}

  public render() {
    return `${this.children}`
  }

  public get children() {
    return `- ${this.props.children}`
  }
}
