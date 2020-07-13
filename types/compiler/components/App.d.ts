export default App
/**
 * App frame
 *
 * @prop {React.Element} children
 * @prop {object}        state
 * @prop {object}        build
 * @prop {object}        options
 * @prop {number}        width
 */
declare function App({
  children,
  state,
  build,
  config,
  width,
}: {
  children: any
  state: any
  build: any
  config: any
  width: any
}): JSX.Element
declare namespace App {
  export namespace propTypes {
    export const children: PropTypes.Requireable<PropTypes.ReactElementLike>
    export const state: PropTypes.Requireable<object>
    export const build: PropTypes.Requireable<object>
    export const config: PropTypes.Requireable<object>
    export const width: PropTypes.Requireable<number>
  }
}
import PropTypes from 'prop-types'
//# sourceMappingURL=App.d.ts.map
