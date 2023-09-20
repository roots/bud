/* eslint-disable n/no-process-env */
import {execute} from '@yarnpkg/shell'
import {noop} from 'lodash'

export default async () => {
  await execute(`yarn`, [`@bud`, `plugin`, `build`])
  await execute(`yarn`, [`@bud`, `registry`, `start`]).catch(noop)
  await execute(`yarn`, [`@bud`, `build`])
  await execute(`yarn`, [`@bud`])
  await execute(`yarn`, [`playwright`, `install`])
}
