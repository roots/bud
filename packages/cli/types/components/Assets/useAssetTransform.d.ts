import { Stats } from 'webpack';
interface Asset {
    chunks: Array<number | string>;
    chunkNames: string[];
    emitted: boolean;
    isOverSizeLimit?: boolean;
    name: string;
    size: number;
    hot: boolean;
}
interface BudStats {
    assets: Array<Asset>;
}
interface Transform {
    (assets: Stats.ToJsonOutput['assets']): BudStats['assets'];
}
declare const useTransform: Transform;
export { useTransform as default };
//# sourceMappingURL=useAssetTransform.d.ts.map