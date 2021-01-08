"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStyle = void 0;
const bud_support_1 = require("@roots/bud-support");
const themes_1 = require("../themes");
/**
 * Use style.
 */
const useStyle = (initialData = themes_1.defaultTheme) => {
    /**
     * Theme values
     */
    const { data: theme } = bud_support_1.useSwr('theme', {
        initialData,
        revalidateOnFocus: false,
    });
    /**
     * Width and height of terminal viewport.
     */
    const [width, height] = bud_support_1.useStdoutDimensions();
    /**
     * Active screen size
     */
    const [screen, setScreen] = bud_support_1.useState();
    /**
     * Width of one column.
     */
    const [unit, setUnit] = bud_support_1.useState(null);
    /**
     * Width and height of application.
     */
    const [bounds, setBounds] = bud_support_1.useState({
        width: width - theme.spacing * 2,
        height: height - theme.spacing * 2,
    });
    /**
     * Set application based on viewport size.
     * Applies spacer padding to all four sides of viewport.
     */
    bud_support_1.useEffect(() => {
        setBounds({
            width: width - theme.spacing * 2,
            height: height - theme.spacing * 2,
        });
    }, [width, height]);
    /**
     * Set unit to be the total application width available
     * divided by the column count
     */
    bud_support_1.useEffect(() => {
        setUnit(bounds.width / theme.columns);
    }, [bounds]);
    /**
     * Determine which screen size is currently active.
     */
    bud_support_1.useEffect(() => {
        theme.screens.forEach(([lower, upper], iteration) => {
            bounds.width > lower &&
                bounds.width < upper &&
                setScreen(iteration);
        });
    }, [bounds, theme]);
    /**
     * Col
     * Function that returns the width for x columns
     */
    const col = (count) => {
        return unit * count;
    };
    /**
     * Ctx
     *
     * Function that takes an array of possible display values
     * and returns the one that matches the current screen size.
     */
    const ctx = (screens) => {
        var _a;
        const value = (_a = screens[screen]) !== null && _a !== void 0 ? _a : screens[screens.length - 1];
        return typeof value == 'number' ? Math.floor(value) : value;
    };
    /**
     * Set colors
     *
     * Merges colors onto theme.
     */
    const setColors = (colors) => {
        bud_support_1.mutate('theme', Object.assign(Object.assign({}, theme), { colors: Object.assign(Object.assign({}, theme.colors), colors) }));
    };
    /**
     * Set screens
     *
     * Merges colors onto theme.
     */
    const setScreens = (screens) => {
        bud_support_1.mutate('theme', Object.assign(Object.assign({}, theme), { screens: [...theme.screens, ...screens] }));
    };
    return Object.assign(Object.assign({ col,
        bounds,
        screen }, theme), { setColors,
        setScreens,
        ctx });
};
exports.useStyle = useStyle;
//# sourceMappingURL=index.js.map