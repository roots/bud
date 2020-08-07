import { browserSync } from './browserSync';
import { cleanWebpack } from './cleanWebpack';
import { copy } from './copy';
import { define } from './define';
import { dependencyExtraction } from './dependencyExtraction';
import { fixStyleOnlyEntries } from './fixStyleOnlyEntries';
import { hotModuleReplacement } from './hotModuleReplacement';
import { limitChunkCount } from './limitChunkCount';
import { miniCssExtract } from './miniCssExtract';
import { manifest } from './manifest';
import { provide } from './provide';
import { stylelint } from './stylelint';
import { terser } from './terser';
import { writeFile } from './writeFile';
var plugins = [];
var adapters = [
    browserSync,
    cleanWebpack,
    copy,
    define,
    dependencyExtraction,
    fixStyleOnlyEntries,
    hotModuleReplacement,
    manifest,
    miniCssExtract,
    provide,
    limitChunkCount,
    stylelint,
    terser,
    writeFile,
];
export { plugins, adapters };
//# sourceMappingURL=index.js.map