export default Warnings;
/**
 * Warnings
 */
declare function Warnings({ build, actions }: {
    build: any;
    actions: any;
}): JSX.Element;
declare namespace Warnings {
    export namespace propTypes {
        export const build: PropTypes.Requireable<object>;
        export const actions: PropTypes.Requireable<object>;
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=Warnings.d.ts.map