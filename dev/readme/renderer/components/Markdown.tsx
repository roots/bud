export class Markdown {
  public blocks: any[] = []

  public constructor(props?) {
    this.append(props)
  }

  public append(el: any) {
    el && this.blocks.push(el)
  }

  public render() {
    return this.blocks.map(block => block.render()).join('\n')
  }
}
