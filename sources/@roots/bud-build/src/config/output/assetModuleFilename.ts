import type {Bud} from '@roots/bud-framework'

interface Props {
  filter: Bud['hooks'][`filter`]
  path: Bud['path']
}

export const assetModuleFilename = ({filter, path}: Props) =>
  filter(`build.output.assetModuleFilename`, path(`@file`))
