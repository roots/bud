import type { Theme } from '..';
/**
 * useStyle hook
 *
 * @public
 */
export interface useStyle {
    (themeProps?: Theme): Styles;
}
/**
 * Object returned by hook
 *
 * @public
 */
export interface Styles {
    /**
     * Spacing value (total character width)
     */
    spacing: number;
    /**
     * Maximum width and height of display area
     */
    bounds: {
        /**
         * Maximum width
         */
        width: number;
        /**
         * Maximum height
         */
        height: number;
    };
    screen: number;
    colors: {
        [key: string]: string;
    };
    ctx: (screens: Array<any>) => any;
    col: (count: number) => number;
    setColors: (colors: Theme['colors']) => void;
    setScreens: (screens: Theme['screens']) => void;
}
/**
 * useStyle hook
 *
 */
export declare const useStyle: useStyle;
//# sourceMappingURL=index.d.ts.map