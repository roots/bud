/**
 * React hook for easy styling of Ink components.
 *
 * @packageDocumentation
 */
/**
 * Theme interface
 *
 * @public
 */
export interface Theme {
    spacing: Theme.Spacing;
    colors: Theme.Colors;
    screens: Theme.ScreenTuple[];
    columns: number;
    maxWidth: number;
    maxHeight: number;
}
export declare namespace Theme {
    type Colors = {
        [index: string]: string;
    };
    type Spacing = number;
    type ScreenTuple = [number, number];
}
export { useStyle } from './useStyle/index';
export type { Styles } from './useStyle/index';
export { defaultTheme } from './themes';
//# sourceMappingURL=index.d.ts.map