export class Bar extends React.Component<any, any, any> {
    constructor(props: Readonly<any>);
    constructor(props: any, context?: any);
    getString(): any;
}
export namespace Bar {
    export namespace defaultProps {
        export const columns: number;
        export const percent: number;
        export const left: number;
        export const right: number;
        export const character: string;
        export const rightPad: boolean;
    }
    export namespace propTypes {
        const columns_1: PropTypes.Requireable<number>;
        export { columns_1 as columns };
        const percent_1: PropTypes.Requireable<number>;
        export { percent_1 as percent };
        const left_1: PropTypes.Requireable<number>;
        export { left_1 as left };
        const right_1: PropTypes.Requireable<number>;
        export { right_1 as right };
        const character_1: PropTypes.Requireable<string>;
        export { character_1 as character };
        const rightPad_1: PropTypes.Requireable<boolean>;
        export { rightPad_1 as rightPad };
    }
}
import React from "react";
import PropTypes from "prop-types";
//# sourceMappingURL=LoadingBar.d.ts.map