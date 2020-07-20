/**
 * Error
 */
export function Errors({ build, actions }: {
    build: any;
    actions: any;
}): JSX.Element;
export namespace Errors {
    export namespace propTypes {
        export const build: PropTypes.Requireable<object>;
        export const actions: PropTypes.Requireable<object>;
    }
}
import PropTypes from "prop-types";
