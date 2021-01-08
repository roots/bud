declare const useProgress: UseProgress.Hook;
export declare namespace UseProgress {
    /**
     * UseProgress
     */
    interface Hook {
        (): HookInterface;
    }
    type HookInterface = [Progress, Handler];
    /**
     * Process webpack progress Return.
     */
    type Handler = (percentage: number, msg: string) => void;
    /**
     * Compiler progress
     */
    type Progress = {
        percentage: Percentage;
        msg: string;
    };
    /**
     * Percentage as a nicely formatted display string
     * and a decimal number for rendering, etc.
     */
    interface Percentage {
        display: string;
        decimal: number;
    }
}
export { useProgress };
//# sourceMappingURL=useProgress.d.ts.map