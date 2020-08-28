declare type Format = {
    [key: string]: Formatter;
};
declare type Formatter = (any: any) => string;
declare const format: Format;
export { format, Format };
//# sourceMappingURL=format.d.ts.map