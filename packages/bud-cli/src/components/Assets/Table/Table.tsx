import {
  Box,
  React,
  FunctionComponent,
  Table,
} from '@roots/bud-support'
import {useStyle} from '@roots/ink-use-style'
import * as table from './tableParts'
import {UseCompilation} from '../../../hooks/useCompilation'
import {useTransform} from './tableTransform'

const AssetsTable: Assets.Component = ({assets}) => {
  const data = useTransform(assets)
  const {ctx} = useStyle()

  return (
    <Box flexDirection="column">
      {assets && (
        <Table
          padding={0}
          {...table}
          data={data}
          columns={ctx([
            ['chunkNames'],
            ['hot', 'chunkNames', 'size'],
            ['hot', 'chunkNames', 'chunks', 'size'],
          ])}
        />
      )}
    </Box>
  )
}

export declare namespace Assets {
  export type Component = FunctionComponent<Props>
  export interface Props {
    assets: UseCompilation.Compilation['stats']['assets']
  }
}

export {AssetsTable}
