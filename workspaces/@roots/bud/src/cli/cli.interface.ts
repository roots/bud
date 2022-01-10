export interface Options {
  args: Record<string, any>
  argv: Array<string>
  flags: Record<string, any>
  raw: Array<Record<string, string>>
  metadata: Record<string, Record<string, any>>
}
