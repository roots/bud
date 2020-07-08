/**
 * Budpack build status display
 *
 * @prop {object} compiler webpack compiler
 * @prop {string} config   webpack compiler config
 * @prop {object} options  project options
 */
export function Runner({ compiler, config }: {
    compiler: any;
    config: any;
}): JSX.Element;
export namespace Runner {
    export namespace propTypes {
        export const compiler: PropTypes.Requireable<object>;
        export const config: PropTypes.Requireable<object>;
        export const webpackConfig: PropTypes.Requireable<object>;
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=index.d.ts.map