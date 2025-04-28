import { Plugin } from 'postcss';
export interface MediaQueryOptimizerOptions {
    enableLogging?: boolean;
    include?: string[];
    exclude?: string[];
    sortingEnabled?: boolean;
    sort?: 'mobileFirst' | 'desktopFirst';
    logger?: {
        info: (msg: string) => void;
        error: (msg: string) => void;
    };
}
declare const _default: ((opts?: MediaQueryOptimizerOptions) => Plugin) & {
    postcss: boolean;
};
export default _default;
