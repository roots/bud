var _a;
import path from 'path';
import postCss from './postcss';
import babelWp from './babel/preset-wp';
/**
 * Preset configurations for common webpack plugins.
 */
var presets = (_a = {
        postCss: {
            config: postCss,
            file: path.join(__dirname, 'repositories/presets/postcss')
        }
    },
    _a['babel-wp'] = {
        config: babelWp(),
        file: path.join(__dirname, 'repositories/presets/babel/preset-wp')
    },
    _a);
export { presets };
//# sourceMappingURL=index.js.map