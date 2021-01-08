"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Console = void 0;
const bud_support_1 = require("@roots/bud-support");
const Console = () => {
    const [lastConsole, setLastConsole] = bud_support_1.useState(null);
    const [text, setText] = bud_support_1.useState('');
    bud_support_1.patchConsole((stream, data) => {
        setLastConsole(data);
        const frameOut = lastConsole !== data ? `${text}${data}` : text;
        setText(frameOut);
    });
    return bud_support_1.React.createElement(bud_support_1.Text, null, text !== null && text !== void 0 ? text : '');
};
exports.Console = Console;
//# sourceMappingURL=Console.js.map