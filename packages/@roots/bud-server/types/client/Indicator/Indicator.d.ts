export declare class Indicator extends HTMLElement {
    rendered: boolean;
    name: string;
    hideTimeout: any;
    get hasErrors(): boolean;
    get hasWarnings(): boolean;
    get isPending(): boolean;
    colors: {
        success: number[];
        error: number[];
        warn: number[];
        pending: number[];
    };
    render(): void;
    show(): void;
    hide(): void;
    pending(): void;
    success(): void;
    error(): void;
    warning(): void;
    update(): void;
    static get observedAttributes(): string[];
    attributeChangedCallback(): void;
    connectedCallback(): void;
}
//# sourceMappingURL=Indicator.d.ts.map