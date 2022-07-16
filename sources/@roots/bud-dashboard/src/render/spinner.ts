import process from 'node:process'

export const spinnerFrames =
  process.platform === `win32`
    ? [`-`, `\\`, `|`, `/`]
    : [`⠋`, `⠙`, `⠹`, `⠸`, `⠼`, `⠴`, `⠦`, `⠧`, `⠇`, `⠏`]

export class Spinner {
  public current: number = 0

  public get frame() {
    this.current = ++this.current % spinnerFrames.length
    return spinnerFrames[this.current]
  }
}
