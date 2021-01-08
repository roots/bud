export declare type UseStyle = (themeProps?: Theme) => Styles;
export interface Styles {
    spacing: number;
    bounds: {
        width: number;
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
export interface Theme {
    spacing: Theme.Spacing;
    colors: Theme.Colors;
    screens: ScreenTuple[];
    columns: number;
}
export declare namespace Theme {
    type Colors = {
        [index: string]: string;
    };
    type Spacing = number;
}
export declare type ScreenTuple = [number, number];
//# sourceMappingURL=typings.d.ts.map