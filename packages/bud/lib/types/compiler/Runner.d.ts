/// <reference types="react" />
import PropTypes from 'prop-types';
/**
 * Budpack build status display
 *
 * @prop {object} compiler webpack compiler
 * @prop {object} config   webpack compiler config
 */
declare const Runner: {
    ({ bud }: {
        bud: any;
    }): JSX.Element;
    propTypes: {
        compiler: PropTypes.Requireable<object>;
        bud: PropTypes.Requireable<object>;
    };
};
export { Runner };
//# sourceMappingURL=Runner.d.ts.map