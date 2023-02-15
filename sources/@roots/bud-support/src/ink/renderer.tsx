import {bind} from '@roots/bud-support/decorators'
import Ink from '@roots/bud-support/ink'
import React from '@roots/bud-support/react'

export class Renderer {
  public declare instance: Ink.Instance | undefined

  public constructor(public stdout: NodeJS.WriteStream) {}

  @bind
  public async cleanup() {
    this.instance?.cleanup()
    this.instance?.unmount()
  }

  @bind
  public async once(Element: React.ReactNode) {
    try {
      this.render(
        <Ink.Static items={[Element]}>
          {(Item, i) => <Ink.Box key={i}>{Item}</Ink.Box>}
        </Ink.Static>,
      )
    } catch (error) {
      return this.instance
    }
  }

  @bind
  public async text(text: string) {
    try {
      this.render(<Ink.Text>{text}</Ink.Text>)
      return this.instance
    } catch (error) {
      return this.instance
    }
  }

  @bind
  public async render(Element: React.ReactElement) {
    try {
      if (this.instance) await this.cleanup()
      this.instance = Ink.render(Element, {stdout: this.stdout})
      return this.instance
    } catch (error) {
      return this.instance
    }
  }

  @bind
  public getInstance() {
    return this.instance
  }
}
