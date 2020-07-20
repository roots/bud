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
export function App({ children, state, build, config, width, height, }: {
    children: any;
    state: any;
    build: any;
    config: any;
    width: any;
    height: any;
}): any;
export namespace App {
    export namespace propTypes {
        export const children: PropTypes.Requireable<any[]>;
        export const state: PropTypes.Requireable<object>;
        export const build: PropTypes.Requireable<object>;
        export const config: PropTypes.Requireable<object>;
        export const width: PropTypes.Requireable<number>;
        export const height: PropTypes.Requireable<number>;
    }
}
import PropTypes from "prop-types";
