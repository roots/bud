import { FunctionComponent } from 'react';
import { Options } from 'prettier';
interface PrettierProps extends Options {
    children: string;
}
declare type PrettierFunctionComponent = FunctionComponent<PrettierProps>;
declare const Prettier: PrettierFunctionComponent;
export { Prettier as default, PrettierFunctionComponent };
