import * as prettier from 'prettier';
import * as React from 'react';
interface Props extends prettier.Options {
    children: string;
    parser?: prettier.BuiltInParserName;
}
interface InkPrettier extends React.FunctionComponent<Props> {
}
declare const InkPrettier: InkPrettier;
export { InkPrettier };
//# sourceMappingURL=InkPrettier.d.ts.map