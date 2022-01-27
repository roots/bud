export class Html {
  public constructor(public props?) {}

  public render() {
    return `\
<${this.props.tag}${this.attr}>
  ${this.children ?? ''}
</${this.props.tag}>\n`
  }

  public get attr() {
    return Object.entries(this.props).reduce((a, [k, v]) => {
      if (k === 'tag' || k == 'children') return `${a}`
      return `${a} ${k}="${v}"`
    }, ``)
  }

  public get children() {
    return Array.isArray(this.props.children)
      ? this.props.children
          .map(child => {
            return child?.render ? child.render() : child
          })
          .join('')
      : this.props.children
  }
}
