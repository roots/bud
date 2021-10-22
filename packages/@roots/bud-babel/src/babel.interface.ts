export type Options = {
  plugins?: Plugin[]
  config?: boolean | string
}

export type NormalizedPlugin = [string, {[key: string]: any}]

export type Plugin = string | NormalizedPlugin | CallableFunction

export type Registrable = string | NormalizedPlugin

export interface Registry {
  [key: string]: [string, any]
}
