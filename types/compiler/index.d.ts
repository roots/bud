/**
 * Budpack build status display
 *
 * @prop {object} compiler webpack compiler
 * @prop {object} config   webpack compiler config
 */
export function Runner({ compiler, config }: {
    compiler: any;
    config: any;
}): JSX.Element;
export namespace Runner {
    export namespace propTypes {
        export const compiler: PropTypes.Requireable<object>;
        export const config: PropTypes.Requireable<object>;
    }
}
import PropTypes from "prop-types";
