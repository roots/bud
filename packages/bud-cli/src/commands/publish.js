"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.builder = exports.describe = exports.aliases = void 0;
const bud_support_1 = require("@roots/bud-support");
const path_1 = require("path");
const __1 = require("../");
const Publish_1 = __importDefault(require("../containers/Publish"));
const cwd = process.cwd();
exports.aliases = 'publish <file>';
exports.describe = 'Publish an included template to your project.';
const builder = yargs => yargs
    .positional('file', {
    describe: 'template file to publish',
    type: 'string',
    choices: ['template.html', 'bud.config.js'],
})
    .usage('$0 publish <file>')
    .showHelpOnFail(true);
exports.builder = builder;
const handler = (args) => __awaiter(void 0, void 0, void 0, function* () {
    const selection = args._[1];
    /**
     * Bail early if command isn't proper.
     * Hit the user with an error message so they know what they did wrong
     */
    if (!selection || typeof selection !== 'string') {
        __1.Error(`Try \`bud publish --help\` for a list of available templates.`, `You must specify a template to publish`);
    }
    const template = path_1.join(path_1.dirname(require.resolve('@roots/bud-support')), `../publish/${selection}`);
    const dest = path_1.join(cwd, 'publish', selection);
    try {
        yield bud_support_1.fs.ensureDir(path_1.dirname(dest));
        yield bud_support_1.fs.copyFile(template, dest);
        bud_support_1.render(bud_support_1.React.createElement(Publish_1.default, { file: selection }));
    }
    catch (err) {
        __1.Error(`Are you sure you got the name right? Try \`bud publish --help\` for a list of available templates.`, `The requested template can't be published.`);
    }
});
exports.handler = handler;
//# sourceMappingURL=publish.js.map