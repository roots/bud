import type {Bud} from '@roots/bud-framework'

interface Props {
  filter: Bud['hooks'][`filter`]
  relPath: Bud['relPath']
}

export const assetModuleFilename = ({filter, relPath}: Props) =>
  filter(`build.output.assetModuleFilename`, relPath(`@file`))
