import { FunctionComponent } from '@roots/bud-support';
declare namespace Error {
    type Component = FunctionComponent<{
        title?: string;
        body: string;
    }>;
}
declare const Error: Error.Component;
export { Error };
//# sourceMappingURL=Error.d.ts.map