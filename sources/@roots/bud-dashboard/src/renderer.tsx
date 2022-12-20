import * as Ink from '@roots/bud-support/ink'
import React from '@roots/bud-support/react'

let instance: Ink.Instance

export class Renderer {
  public static async cleanup() {
    instance?.cleanup()
    instance?.unmount()
  }
  public static async once(Element: React.ReactNode) {
    try {
      instance = Ink.render(
        <Ink.Static items={[Element]}>
          {(Item, i) => <React.Fragment key={i}>{Item}</React.Fragment>}
        </Ink.Static>,
      )
      await Renderer.cleanup()
    } catch (error) {
      return instance
    }
  }

  public static async text(text: string) {
    try {
      Renderer.render(<Ink.Text>{text}</Ink.Text>)
      return instance
    } catch (error) {
      return instance
    }
  }

  public static async render(Element: React.ReactElement) {
    try {
      if (instance) {
        instance.rerender(Element)
      } else {
        instance = Ink.render(Element)
      }
      return instance
    } catch (error) {
      return instance
    }
  }

  public static getInstance() {
    return instance
  }
}
