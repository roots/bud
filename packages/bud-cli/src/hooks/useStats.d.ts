import { webpack } from '@roots/bud-support';
export declare namespace UseStats {
    /**
     * UseStats interface.
     */
    interface Hook {
        (options: any): {
            stats: Stats;
            errors: string[];
            handler: Handler;
        };
    }
    /**
     * Stats JSON
     */
    type Stats = webpack.Stats.ToJsonOutput;
    /**
     * Process raw webpack stats.
     */
    type Handler = (stats: webpack.Stats) => void;
    /**
     * Reported assets.
     */
    type Assets = Stats['assets'];
    /**
     * Reported warnings.
     */
    type Warnings = Stats['warnings'];
    /**
     * Reported errors.
     */
    type Errors = Stats['errors'];
}
//# sourceMappingURL=useStats.d.ts.map