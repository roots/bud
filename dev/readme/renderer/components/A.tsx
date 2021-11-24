export class A {
  public constructor(
    public props: {children: any[]; href: string},
  ) {}

  public render() {
    return `[${this.children}](${this.props.href})\n`
  }

  public get children() {
    return Array.isArray(this.props.children)
      ? this.props.children.join('')
      : this.props.children
  }
}
