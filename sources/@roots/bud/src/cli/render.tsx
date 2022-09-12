let React: any
let Ink: any

export default class Render {
  public static async once({children}: React.PropsWithChildren) {
    if (!React) React = await import(`react`)
    if (!Ink) Ink = await import(`ink`)

    Ink.render(<Ink.Box>{children}</Ink.Box>).unmount()
  }
}

export {React, Ink}
