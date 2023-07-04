/* eslint-disable n/no-process-env */
import {execute} from '@yarnpkg/shell'

export default async () => {
  await execute(`yarn`, [`@bud`, `plugin`, `build`])
  await execute(`yarn`, [`@bud`, `registry`, `start`])
  await execute(`yarn`, [`@bud`, `build`])
  await execute(`yarn`, [`@bud`])
}
