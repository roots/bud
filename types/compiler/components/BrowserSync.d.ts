export default BrowserSync;
declare function BrowserSync({ actions }: {
    actions: any;
}): JSX.Element;
declare namespace BrowserSync {
    export namespace propTypes {
        export const display: PropTypes.Requireable<boolean>;
    }
    export namespace defaultProps {
        const display_1: boolean;
        export { display_1 as display };
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=BrowserSync.d.ts.map