export class Code {
  public props

  public constructor(props?) {
    if (props) this.props = props
  }

  public render() {
    return `\
\`\`\`${this.props.lang ?? ''}
${
  Array.isArray(this.props.children)
    ? this.props.children.join('')
    : this.props.children
}
\`\`\`\n`
  }
}
