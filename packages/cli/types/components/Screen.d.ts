import {FunctionComponent, ReactElement} from 'react'
interface ScreenInterface {
  title?: string
  display?: boolean
  children:
    | FunctionComponent
    | FunctionComponent[]
    | ReactElement
}
declare const Screen: FunctionComponent<ScreenInterface>
export {Screen as default}
//# sourceMappingURL=Screen.d.ts.map
