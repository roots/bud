export function manifest(bud: any): {
    options: {
        publicPath: string;
        filename: string;
        writeToFileEmit: boolean;
    };
    make: () => any;
};
