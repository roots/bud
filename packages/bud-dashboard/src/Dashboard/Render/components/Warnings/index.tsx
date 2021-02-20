import {React} from '@roots/bud-support'
import Screen from '../Screen'
import {Warning} from './Warning'

const Warnings = ({warnings}) =>
  warnings?.length > 0
    ? warnings?.map((warning, i) => (
        <Screen key={i} title="Warnings">
          <Warning message={warning} key={i} />
        </Screen>
      ))
    : null

export {Warnings as default}
