import type {Factory} from '@roots/bud-build/config'

export const infrastructureLogging: Factory<
  `infrastructureLogging`
> = async bud =>
  bud.hooks.filter(`build.infrastructureLogging`, {
    ...(bud.context?.verbose
      ? {console, level: `verbose`}
      : bud.context?.log
        ? {console, level: `log`}
        : {level: `none`}),
  })
