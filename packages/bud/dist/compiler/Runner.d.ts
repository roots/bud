/**
 * Budpack build status display
 *
 * @prop {object} compiler webpack compiler
 * @prop {object} config   webpack compiler config
 */
export function Runner({ bud }: {
    bud: any;
}): JSX.Element;
export namespace Runner {
    export namespace propTypes {
        export const compiler: PropTypes.Requireable<object>;
        export const bud: PropTypes.Requireable<object>;
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=Runner.d.ts.map