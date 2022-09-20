let React: any
let Ink: any

export default class Render {
  public static async importDependencies() {
    React = await import(`@roots/bud-support/react`).then(
      ({default: React}) => React,
    )
    Ink = await import(`@roots/bud-support/ink`)
    return {React, Ink}
  }

  public static async once({children}: React.PropsWithChildren<{}>) {
    const {React, Ink} = await Render.importDependencies()
    Ink.render(<Ink.Box>{children}</Ink.Box>).unmount()
  }

  public static async text(text: string) {
    const {React, Ink} = await Render.importDependencies()
    Ink.render(
      <Ink.Box>
        <Ink.Text>{text}</Ink.Text>
      </Ink.Box>,
    ).unmount()
  }

  public static async view(Children) {
    const {Ink} = await Render.importDependencies()
    return Ink.render(<Children />)
  }
}
