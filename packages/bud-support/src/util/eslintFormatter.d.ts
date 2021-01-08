export declare type ESLintOptions = import('eslint').ESLint.Options;
export declare type LintResult = import('eslint').ESLint.LintResult;
export declare type LintResultData = import('eslint').ESLint.LintResultData;
export declare type FormatterFunction = (results: LintResult[], data?: LintResultData | undefined) => string;
/**
 * eslint formatter
 */
declare const formatter: FormatterFunction;
export default formatter;
//# sourceMappingURL=eslintFormatter.d.ts.map