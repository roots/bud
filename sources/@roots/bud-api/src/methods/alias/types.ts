export type Signifier = string

export type Value = Array<string> | false | string

export type Records = {[index: Signifier]: Value}

export type Callback = (aliases: Records | undefined) => Promise<Records>

export type Parameters = [Callback] | [Records] | [Signifier, Value]
