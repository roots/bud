/// <reference types="webpack" />
import { Framework, Webpack } from '@roots/bud-typings';
export declare type Entry = Webpack.Configuration['entry'];
export declare namespace Entry {
    type Build = (this: Framework) => {
        entry: Entry;
    };
}
export declare const entry: Entry.Build;
//# sourceMappingURL=entry.d.ts.map