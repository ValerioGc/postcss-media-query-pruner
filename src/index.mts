// src/index.mts
import { atRule as _atRule, Plugin, Root, AtRule } from 'postcss';

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

// Main plugin function
const mediaQueryOptimizer = (opts: MediaQueryOptimizerOptions = {}): Plugin => {
  const {
    enableLogging = true,
    include = ['*'],
    exclude = [],
    sortingEnabled = false,
    sort = 'mobileFirst',
    logger = { info: console.log, error: console.error },
  } = opts;

  // Determine if current file should be processed based on include/exclude patterns
  function shouldProcessFile(filePath: string): boolean {
    if (!filePath) return true;
    if (include.length === 1 && include[0] === '*') {
      return !exclude.some(p => filePath.includes(p));
    }
    return include.some(p => filePath.includes(p)) &&
            !exclude.some(p => filePath.includes(p));
  }

  return {
    postcssPlugin: 'postcss-media-query-pruner',
    Once(root: Root) {
      const filePath = root.source?.input?.file || '';
      const logThisFile = enableLogging && shouldProcessFile(filePath);

      // Step 1: Collect and dedupe rules for each media query key
      const collections = new Map<string, AtRule>();
      const seenMap    = new Map<string, Set<string>>();

      root.walkAtRules('media', atRule => {
        const param = atRule.params;

        // Initialize collection for this media query if first time
        if (!collections.has(param)) {
          collections.set(param, _atRule({ name: 'media', params: param }));
          seenMap.set(param, new Set());
        }

        const newAt = collections.get(param)!;
        const seen  = seenMap.get(param)!;

        // Deduplicate based on node.toString() signature
        atRule.nodes?.forEach(node => {
          const sig = node.toString().trim();
          if (!seen.has(sig)) {
            seen.add(sig);
            newAt.append(node.clone());
          }
        });

        // Remove original media rule
        atRule.remove();
      });

      // Step 2: Determine order of media queries and sort if enabled
      let keys = Array.from(collections.keys());
      if (sortingEnabled) {
        keys.sort((a, b) => {
          const extractNumber = (s: string) =>
            parseFloat((s.match(/min-width:\s*(\d+)/) || [])[1] || '0');
          const numA = extractNumber(a);
          const numB = extractNumber(b);
          return sort === 'mobileFirst' ? numA - numB : numB - numA;
        });
      }

      // Step 3: Re-insert optimized media queries into the root
      keys.forEach(param => {
        root.append(collections.get(param)!);
      });

      // Step 4: Log completion once per run
      if (logThisFile && !(globalThis as any).__postcssMediaQuerySummaryLogged) {
        logger.info('✨[postcss-media-query-pruner] - Optimization completed');
        (globalThis as any).__postcssMediaQuerySummaryLogged = true;
      }
    }
  };
};

export default Object.assign(mediaQueryOptimizer, { postcss: true });
