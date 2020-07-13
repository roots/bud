/**
 * Nav
 *
 * @prop {object} build
 * @prop {boolean} focused
 * @prop {object} config
 */
export function Nav({
  build,
  focused,
  config,
}: {
  build: any
  focused: any
  config: any
}): JSX.Element
export namespace Nav {
  export namespace propTypes {
    export const build: PropTypes.Requireable<object>
    export const focused: any
    export const config: PropTypes.Requireable<object>
  }
}
import PropTypes from 'prop-types'
//# sourceMappingURL=Nav.d.ts.map
