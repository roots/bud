import * as Ink from '@roots/bud-support/ink'
import React from '@roots/bud-support/react'

let instance: Ink.Instance

export class Renderer {
  public static async once(Element: React.ReactNode) {
    instance?.unmount()
    instance = Ink.render(
      <Ink.Static items={[Element]}>
        {(Item, i) => <React.Fragment key={i}>{Item}</React.Fragment>}
      </Ink.Static>,
    )
  }

  public static async text(text: string) {
    Renderer.render(<Ink.Text>{text}</Ink.Text>)
  }

  public static async render(Element: React.ReactElement) {
    if (instance) {
      instance.rerender(Element)
    } else {
      instance = Ink.render(Element)
    }
  }

  public static unmount() {
    if (instance) {
      instance.unmount()
    }
  }
}
