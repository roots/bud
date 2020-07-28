declare const Bar_base: typeof globalThis.React.Component;
export class Bar extends Bar_base {
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
        const columns_1: import("prop-types").Requireable<number>;
        export { columns_1 as columns };
        const percent_1: import("prop-types").Requireable<number>;
        export { percent_1 as percent };
        const left_1: import("prop-types").Requireable<number>;
        export { left_1 as left };
        const right_1: import("prop-types").Requireable<number>;
        export { right_1 as right };
        const character_1: import("prop-types").Requireable<string>;
        export { character_1 as character };
        const rightPad_1: import("prop-types").Requireable<boolean>;
        export { rightPad_1 as rightPad };
    }
}
export {};
//# sourceMappingURL=LoadingBar.d.ts.map