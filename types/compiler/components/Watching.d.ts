/**
 * Watch mode indicator
 * @prop {object} options
 * @prop {object} build
 * @return {PropTypes.ReactElementLike}
 */
export function Watching({ options, build }: {
    options: any;
    build: any;
}): PropTypes.ReactElementLike;
export namespace Watching {
    export namespace propTypes {
        export const options: PropTypes.Requireable<object>;
        export const build: PropTypes.Requireable<object>;
    }
}
import PropTypes from "prop-types";
