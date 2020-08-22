/**
 * @roots/bud v.2.0.0-rc.7 {@link https://roots.io/bud}
 *
 * A friendly build tool to help manage your project assets.
 *
 * Issues? {@link https://github.com/roots/bud/issues}
 *
 * Consider funding our work 🙏🏽 {@link https://github.com/sponsors/roots}
 *
 * @copyright 2020 Roots {@link https://roots.io}
 * @license MIT
 */
import { shortCircuit } from './shortCircuit.js';
import { dump } from './dump.js';
import { fab } from './fab.js';
import { projectRoot } from './projectRoot.js';
import { terminate } from './terminate.js';
import { processHandler } from './processHandler.js';
import { fs } from './fs.js';
import { usedExt } from './usedExt.js';
export { logger } from './logger.js';

var util = {
    fs: fs,
    dump: dump,
    shortCircuit: shortCircuit,
    fab: fab,
    projectRoot: projectRoot,
    processHandler: processHandler,
    terminate: terminate,
    usedExt: usedExt,
};

export { util };
