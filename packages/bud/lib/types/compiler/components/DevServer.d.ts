/// <reference types="react" />
import PropTypes from 'prop-types';
/**
 * DevServer info
 *
 * @prop {object} actions
 * @return {PropTypes.ReactComponentLike}
 */
declare const DevServer: {
    ({ build, actions }: {
        build: any;
        actions: any;
    }): JSX.Element;
    propTypes: {
        build: PropTypes.Requireable<object>;
        actions: PropTypes.Requireable<object>;
    };
};
export { DevServer };
//# sourceMappingURL=DevServer.d.ts.map