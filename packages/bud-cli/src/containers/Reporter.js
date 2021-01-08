"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reporter = void 0;
const bud_support_1 = require("@roots/bud-support");
const Assets_1 = require("../components/Assets");
const Errors_1 = require("../components/Errors");
const Progress_1 = require("../components/Progress");
const Git_1 = require("../components/Git");
const Console_1 = require("../components/Console");
const Reporter = ({ bud, pkg, bounds, col, colors, errors, mode, stats, progress, }) => {
    var _a, _b;
    const debug = bud.get().store.enabled('features.debug');
    return debug ? (bud_support_1.React.createElement(Console_1.Console, null)) : (bud_support_1.React.createElement(bud_support_1.Box, { display: "flex", flexDirection: "column", height: debug ? null : bounds === null || bounds === void 0 ? void 0 : bounds.height, alignItems: "center", justifyContent: "space-between" },
        bud_support_1.React.createElement(bud_support_1.Box, { flexDirection: "column", justifyContent: "space-between" },
            bud_support_1.React.createElement(bud_support_1.Box, { flexDirection: "row", marginTop: 1, marginBottom: 1 },
                bud_support_1.React.createElement(bud_support_1.Box, { flexDirection: "row" },
                    bud_support_1.React.createElement(bud_support_1.Text, { backgroundColor: (_a = colors === null || colors === void 0 ? void 0 : colors.primary) !== null && _a !== void 0 ? _a : 'transparent', color: (_b = colors === null || colors === void 0 ? void 0 : colors.white) !== null && _b !== void 0 ? _b : 'transparent' },
                        ' ',
                        (progress === null || progress === void 0 ? void 0 : progress.message) ? (bud_support_1.React.createElement(bud_support_1.Spinner, null)) : (stats === null || stats === void 0 ? void 0 : stats.hash) ? ('✓') : (''),
                        ' ', pkg === null || pkg === void 0 ? void 0 :
                        pkg.name,
                        ' '),
                    bud_support_1.React.createElement(bud_support_1.Text, { dimColor: true, color: colors === null || colors === void 0 ? void 0 : colors.white, italic: true },
                        ' ',
                        (progress === null || progress === void 0 ? void 0 : progress.message) ? (bud_support_1.React.createElement(bud_support_1.Text, { italic: true, color: colors === null || colors === void 0 ? void 0 : colors.subdued }, progress === null || progress === void 0 ? void 0 : progress.message)) : (stats === null || stats === void 0 ? void 0 : stats.hash) ? (bud_support_1.React.createElement(bud_support_1.Text, { italic: true, color: colors === null || colors === void 0 ? void 0 : colors.subdued }, stats === null || stats === void 0 ? void 0 : stats.hash)) : (bud_support_1.React.createElement(bud_support_1.React.Fragment, null))))),
            bud_support_1.React.createElement(bud_support_1.Box, { flexDirection: "column" },
                bud_support_1.React.createElement(bud_support_1.Box, { flexDirection: "column", marginBottom: 1 },
                    bud_support_1.React.createElement(Assets_1.Assets, { assets: stats === null || stats === void 0 ? void 0 : stats.assets })),
                errors && bud_support_1.React.createElement(Errors_1.Errors, { errors: errors }),
                (stats === null || stats === void 0 ? void 0 : stats.warnings) && (stats === null || stats === void 0 ? void 0 : stats.warnings[0]) && (bud_support_1.React.createElement(Errors_1.Errors, { errors: stats === null || stats === void 0 ? void 0 : stats.warnings })),
                (stats === null || stats === void 0 ? void 0 : stats.time) && (bud_support_1.React.createElement(bud_support_1.React.Fragment, null,
                    bud_support_1.React.createElement(bud_support_1.Text, null,
                        "Compiled in",
                        ' ',
                        bud_support_1.React.createElement(bud_support_1.Text, { bold: true, color: colors.success },
                            (stats === null || stats === void 0 ? void 0 : stats.time) / 1000,
                            "s")))))),
        bud_support_1.React.createElement(bud_support_1.Box, { flexDirection: "column" },
            bud_support_1.React.createElement(Progress_1.Progress, { progress: progress, colors: colors, bounds: bounds, col: col }),
            bud_support_1.React.createElement(bud_support_1.Box, { marginTop: 1, flexDirection: "row", justifyContent: "space-between" },
                (mode === null || mode === void 0 ? void 0 : mode.is('development')) && (bud_support_1.React.createElement(bud_support_1.Text, { bold: true, color: colors.accent },
                    '🌐  ',
                    bud.store.get('server.ssl')
                        ? 'https://'
                        : 'http://',
                    bud.store.get('server.host'),
                    ":",
                    bud.store.get('server.port'))),
                (mode === null || mode === void 0 ? void 0 : mode.is('development')) && bud_support_1.React.createElement(Git_1.Git, null)))));
};
exports.Reporter = Reporter;
//# sourceMappingURL=Reporter.js.map