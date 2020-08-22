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
export function App({ children, state, build, bud, width, height }: {
    children: any;
    state: any;
    build: any;
    bud: any;
    width: any;
    height: any;
}): any;
export namespace App {
    export namespace propTypes {
        export const children: PropTypes.Requireable<any[]>;
        export const state: PropTypes.Requireable<object>;
        export const build: PropTypes.Requireable<object>;
        export const bud: PropTypes.Requireable<object>;
        export const width: PropTypes.Requireable<number>;
        export const height: PropTypes.Requireable<number>;
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=App.d.ts.map