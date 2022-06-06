export class A {
  public constructor(public props: {children: any[]; href: string}) {}

  public get children() {
    return Array.isArray(this.props.children)
      ? this.props.children.join('')
      : this.props.children
  }

  public render() {
    return `[${this.children}](${this.props.href})`
  }
}
