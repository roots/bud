import type {Bud} from '@roots/bud-framework'

import {Error} from '@roots/bud-dashboard/components/error'
import {BudError} from '@roots/bud-support/errors'
import figures from '@roots/bud-support/figures'
import {Box, Text} from '@roots/bud-support/ink'

import {LabelBox} from '../../components/LabelBox.js'

interface PackageResult {
  error: boolean
  packageVersion: string
  requiredVersion: string
  signifier: string
}

export const Versions = ({
  packages,
}: {
  packages?: Array<PackageResult>
}) => {
  if (!packages) return null

  return (
    <LabelBox label="Version compatibility">
      {packages.map((result, i) => {
        if (typeof result === `string`) {
          return (
            <Text dimColor key={i}>
              {figures.ellipsis} {result}
            </Text>
          )
        }

        return (
          <Box key={i}>
            {result.error ? (
              <VersionError {...result} />
            ) : (
              <Package {...result} />
            )}
          </Box>
        )
      })}
    </LabelBox>
  )
}

export const criticalPackages = [
  `@roots/bud-api`,
  `@roots/bud-build`,
  `@roots/bud-cache`,
  `@roots/bud-dashboard`,
  `@roots/bud-extensions`,
  `@roots/bud-framework`,
  `@roots/bud-hooks`,
  `@roots/bud-server`,
  `@roots/bud-support`,
]

export const getPackageResults = async function (
  this: Bud,
  signifier: string,
): Promise<PackageResult> {
  const manifest = await this.module.getManifestPath(signifier)
  if (!manifest) return null

  const result = await this.fs.read(manifest)
  if (!result?.version) return null

  return {
    error: result.version !== this.context.bud.version,
    packageVersion: result.version,
    requiredVersion: this.context.bud.version,
    signifier,
  }
}

const Package = (result: PackageResult) => {
  return (
    <Text>
      <Text color="green">
        {figures.tick} {result.signifier} meets requirements
      </Text>
      {` `}
      (required:{` `}
      {result.requiredVersion}, installed: {result.packageVersion})
    </Text>
  )
}

const VersionError = (result: PackageResult) => {
  return (
    <Error
      error={BudError.normalize(`${result.signifier} is not installed at the same version as @roots/bud (required: ${result.requiredVersion}, installed: ${result.packageVersion}).
          Your installation may be corrupted or your package manager may have cached an outdated module; consider reinstalling with the \`--force\` flag.`)}
    />
  )
}
