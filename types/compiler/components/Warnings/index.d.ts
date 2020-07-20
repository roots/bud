/**
 * Warnings
 *
 * @prop {object} build
 * @prop {object} actions
 * @return {PropTypes.ReactComponentLike}
 */
export function Warnings({ build, actions }: {
    build: any;
    actions: any;
}): PropTypes.ReactComponentLike;
export namespace Warnings {
    export namespace propTypes {
        export const build: PropTypes.Requireable<object>;
        export const actions: PropTypes.Requireable<object>;
    }
}
import PropTypes from "prop-types";
