import { Loose } from '@roots/bud-typings';
declare type TerminateReturn = () => (err: Error) => void;
interface TerminateOptions extends Loose {
    dump?: boolean;
    timeout?: number;
}
declare type Terminate = (options?: TerminateOptions) => TerminateReturn;
declare const terminate: Terminate;
export { terminate, Terminate };
//# sourceMappingURL=terminate.d.ts.map