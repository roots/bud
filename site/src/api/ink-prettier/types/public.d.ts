/**
 * Ink component to prettify code presented in CLI
 *
 * @packageDocumentation
 */

import * as prettier from 'prettier';

export declare interface InkPrettier extends React_2.FunctionComponent<Props> {
}

export declare const InkPrettier: InkPrettier;

declare interface Props extends prettier.Options {
    children: string;
    parser?: prettier.BuiltInParserName;
}

declare namespace React_2 {
    export {

    }
}

export { }
