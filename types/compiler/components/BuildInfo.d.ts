/**
 * Build Info
 */
export function BuildInfo({ build, config, width }: {
    build: any;
    config: any;
    width: any;
}): JSX.Element;
export namespace BuildInfo {
    export namespace propTypes {
        export const build: PropTypes.Requireable<object>;
        export const config: PropTypes.Requireable<object>;
        export const width: PropTypes.Requireable<number>;
    }
}
import PropTypes from "prop-types";
