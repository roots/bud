export type Signifier = string

export type Value = string | false | Array<string>

export type Records = {[index: Signifier]: Value}

export type Callback = (aliases: Records | undefined) => Promise<Records>

export type Parameters = [Records] | [Signifier, Value] | [Callback]
