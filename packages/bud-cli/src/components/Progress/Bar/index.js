"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bar = void 0;
const bud_support_1 = require("@roots/bud-support");
const Bar = ({ character = '█', colors = ['white', 'white'], backgroundCharacter = '░', backgroundColor = 'white', percent, maxWidth, }) => {
    const fill = Math.min(Math.floor(maxWidth * percent), maxWidth);
    const background = maxWidth - fill;
    return percent <= 0 ? null : (bud_support_1.React.createElement(bud_support_1.Text, null,
        bud_support_1.React.createElement(bud_support_1.Gradient, { colors: colors }, character.repeat(fill)),
        bud_support_1.React.createElement(bud_support_1.Text, { backgroundColor: backgroundColor, dimColor: true }, backgroundCharacter.repeat(background))));
};
exports.Bar = Bar;
//# sourceMappingURL=index.js.map