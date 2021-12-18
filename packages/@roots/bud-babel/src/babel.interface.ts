export type Options = {
  plugins?: Plugin[]
  config?: boolean | string
}

export type NormalizedPlugin = [any, Record<string, any>]

export type Plugin = string | NormalizedPlugin | CallableFunction

export type Registrable = string | NormalizedPlugin

export interface Registry extends Record<string, any> {}

export interface UserInput
  extends Record<
    string,
    string | any | [string, any?] | [any, any?]
  > {}
