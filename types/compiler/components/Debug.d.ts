export function Debug({ actions, config }: {
    actions: any;
    config: any;
}): JSX.Element;
export namespace Debug {
    export namespace propTypes {
        export const actions: PropTypes.Requireable<object>;
        export const config: PropTypes.Requireable<object>;
    }
}
import PropTypes from "prop-types";
