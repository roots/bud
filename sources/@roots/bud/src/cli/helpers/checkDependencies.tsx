import type {Bud} from '@roots/bud'
import {isInternalDevelopmentEnv} from '@roots/bud/cli/helpers/isInternalDevelopmentEnv'
import Ink from '@roots/bud-support/ink'
import React from '@roots/bud-support/react'

export const checkDependencies = async (bud: Bud) => {
  if (isInternalDevelopmentEnv(bud)) return false

  const mismatches = Object.entries({
    ...(bud.context.manifest?.dependencies ?? {}),
    ...(bud.context.manifest?.devDependencies ?? {}),
  })
    .filter(([name]) => name.startsWith(`@roots/`))
    .filter(([signifier, version]: [string, string]) => {
      version = version.replace(`^`, ``)
      return (
        version !== `latest` &&
        version !== `nightly` &&
        !version.includes(`workspace:`) &&
        version !== bud.context.bud.version
      )
    })

  mismatches?.length &&
    bud.dashboard.renderer.once(
      <Ink.Box flexDirection="column" marginY={1}>
        {mismatches.map(([k, v]: [string, string], key: number) => {
          return (
            <Ink.Box flexDirection="row" key={key}>
              <Ink.Box>
                <Ink.Text color="red">{k}</Ink.Text>
              </Ink.Box>

              <Ink.Box flexDirection="column" paddingLeft={1}>
                <Ink.Text>
                  Installed version <Ink.Text color="blue">({v})</Ink.Text>
                  {` `}
                  does not match bud.js version{` `}
                  <Ink.Text color="blue">
                    ({bud.context.bud.version})
                  </Ink.Text>
                </Ink.Text>
              </Ink.Box>
            </Ink.Box>
          )
        })}
      </Ink.Box>,
    )

  return mismatches?.length
}
