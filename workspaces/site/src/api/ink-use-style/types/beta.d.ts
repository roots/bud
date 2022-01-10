/**
 * React hook for easy styling of Ink components.
 *
 * @packageDocumentation
 */

declare const colors: Theme['colors'];

declare const columns: Theme['columns'];

declare namespace defaultTheme {
    export {
        spacing,
        colors,
        screens,
        columns,
        maxWidth,
        maxHeight
    }
}
export { defaultTheme }

declare const maxHeight = 999;

declare const maxWidth = 100;

declare const screens: Theme['screens'];

declare const spacing: Theme['spacing'];

/**
 * Object returned by hook
 *
 * @public
 */
export declare interface Styles {
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
 * Theme interface
 *
 * @public
 */
export declare interface Theme {
    spacing: Theme.Spacing;
    colors: Theme.Colors;
    screens: Theme.ScreenTuple[];
    columns: number;
    maxWidth: number;
    maxHeight: number;
}

export declare namespace Theme {
    export type Colors = {
        [index: string]: string;
    };
    export type Spacing = number;
    export type ScreenTuple = [number, number];
}

/**
 * useStyle hook
 *
 * @public
 */
export declare interface useStyle {
    (themeProps?: Theme): Styles;
}

/**
 * useStyle hook
 *
 */
export declare const useStyle: useStyle;

export { }
