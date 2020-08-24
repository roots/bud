/// <reference types="react" />
import PropTypes from 'prop-types';
/**
 * App
 *
 * @prop {React.Component[]} children
 * @prop {object} state
 * @prop {object} build
 * @prop {object} options
 * @prop {number} width
 * @prop {number} height
 * @return {PropTypes.Component}
 */
declare const App: {
    ({ children, state, build, bud, width, height }: {
        children: any;
        state: any;
        build: any;
        bud: any;
        width: any;
        height: any;
    }): JSX.Element;
    propTypes: {
        children: PropTypes.Requireable<any[]>;
        state: PropTypes.Requireable<object>;
        build: PropTypes.Requireable<object>;
        bud: PropTypes.Requireable<object>;
        width: PropTypes.Requireable<number>;
        height: PropTypes.Requireable<number>;
    };
};
export { App };
//# sourceMappingURL=App.d.ts.map