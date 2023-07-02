export type Path = string

export type Signifier = string

export type Value = Array<Path> | false | Path

export type Records = Record<Signifier, Value>

export type Callback = (aliases?: Records) => Promise<Records>

export type Parameters = [Callback] | [Records] | [Signifier, Value]
