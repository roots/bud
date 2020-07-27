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
export function App({ children, state, build, bud, width, height, }: {
    children: any;
    state: any;
    build: any;
    bud: any;
    width: any;
    height: any;
}): any;
export namespace App {
    export namespace propTypes {
        export const children: import("prop-types").Requireable<any[]>;
        export const state: import("prop-types").Requireable<object>;
        export const build: import("prop-types").Requireable<object>;
        export const config: import("prop-types").Requireable<object>;
        export const width: import("prop-types").Requireable<number>;
        export const height: import("prop-types").Requireable<number>;
    }
}
//# sourceMappingURL=App.d.ts.map