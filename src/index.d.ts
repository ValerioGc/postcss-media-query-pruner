import { Plugin } from 'postcss';

/**
 * Configuration Options for PostCSS plugin
 * @see https://github.com/Valerioc/postcss-media-query-pruner to see all options
 */
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

export type Options = MediaQueryOptimizerOptions;

declare const mediaQueryOptimizer: (opts?: Options) => Plugin;
export default mediaQueryOptimizer;
