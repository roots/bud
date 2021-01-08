"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Git = void 0;
const bud_support_1 = require("@roots/bud-support");
const ink_use_style_1 = require("@roots/ink-use-style");
const useGit_1 = require("../hooks/useGit");
const Git = () => {
    const git = useGit_1.useGit();
    const { colors } = ink_use_style_1.useStyle();
    return !(git === null || git === void 0 ? void 0 : git.hasError) ? (bud_support_1.React.createElement(bud_support_1.Box, { flexDirection: "row", justifyContent: "space-between" },
        git.branch ? (bud_support_1.React.createElement(bud_support_1.Text, { backgroundColor: colors.primary, color: colors.white },
            ' ',
            git.branch,
            ' ')) : (bud_support_1.React.createElement(bud_support_1.Text, { color: colors.white },
            ' ',
            bud_support_1.React.createElement(bud_support_1.Spinner, null),
            " Loading",
            ' ')),
        git.head ? (bud_support_1.React.createElement(bud_support_1.Text, { backgroundColor: git.status ? colors.warning : colors.success, color: colors.white },
            ' ',
            git.head,
            ' ')) : ([]),
        git.status ? (bud_support_1.React.createElement(bud_support_1.Text, { color: colors.white, backgroundColor: colors.error },
            ' ',
            git.status,
            ' ')) : ([]))) : (bud_support_1.React.createElement(bud_support_1.Text, null, "Git unreachable"));
};
exports.Git = Git;
//# sourceMappingURL=Git.js.map