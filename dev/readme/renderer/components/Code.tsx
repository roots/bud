export class Code {
  public props

  public constructor(props?) {
    if (props) this.props = props
  }

  public render() {
    return `\
\`\`\`${this.props.lang ?? ''}
${this.props.children.join('')}
\`\`\`\n`
  }
}
