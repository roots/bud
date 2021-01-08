/// <reference types="webpack" />
import { FunctionComponent } from '@roots/bud-support';
import type { Styles } from '@roots/ink-use-style';
import type { Webpack, Framework, Compiler } from '@roots/bud-typings';
import { Compilation } from '../hooks/useCompilation';
declare const Reporter: FunctionComponent<{
    bud: Framework;
    mode: Framework.Mode;
    pkg: {
        [key: string]: any;
    };
    bounds: Styles['bounds'];
    colors: Styles['colors'];
    col: Styles['col'];
    stats: Webpack.Stats.ToJsonOutput;
    progress: Compiler.Progress;
    errors: Compilation['errors'];
}>;
export { Reporter };
//# sourceMappingURL=Reporter.d.ts.map