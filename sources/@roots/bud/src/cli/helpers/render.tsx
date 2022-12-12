import * as Ink from '@roots/bud-support/ink'
import React from '@roots/bud-support/react'

export default class Render {
  public static async once(Element: React.ReactElement) {
    Ink.render(Element).unmount()
  }

  public static async text(text: string) {
    Ink.render(
      <Ink.Box>
        <Ink.Text>{text}</Ink.Text>
      </Ink.Box>,
    ).unmount()
  }

  public static async view(Element: React.ReactElement) {
    return Ink.render(Element)
  }
}
