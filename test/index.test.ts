import { describe, it, expect } from 'vitest';
import postcss from 'postcss';
import mediaQueryOptimizer from '../dist/postcss-media-query-pruner.es.js';

// Helper to process CSS with plugin options and normalize whitespace
async function run(input: string, opts = {}) {
  const result = await postcss([ mediaQueryOptimizer(opts as any) ]).process(input, { from: undefined });
  return result.css.trim().replace(/\s+/g, ' ');
}

describe('postcss-media-query-pruner plugin', () => {
  const sampleCss = `
    @media (min-width: 600px) {
      .foo { color: red; }
    }
    @media (min-width: 600px) {
      .foo { background: blue; }
      .baz { padding: 10px; }
    }
    @media (min-width: 300px) {
      .bar { font-size: 14px; }
    }
  `;

  // Test merging of identical min-width media queries into a single block
  it('groups identical media queries under one rule', async () => {
    const css = await run(sampleCss);
    const matches = css.match(/@media \(min-width: 600px\)/g) || [];
    expect(matches.length).toBe(1);
    expect(css).toContain('.foo { color: red; }');
    expect(css).toContain('.foo { background: blue; }');
    expect(css).toContain('.baz { padding: 10px; }');
  });

  // Test that original query order remains when sorting is disabled
  it('preserves the original order of media queries when sorting is disabled', async () => {
    const css = await run(sampleCss, { sortingEnabled: false });
    const idx600 = css.indexOf('(min-width: 600px)');
    const idx300 = css.indexOf('(min-width: 300px)');
    expect(idx600).toBeLessThan(idx300);
  });

  // Test sorting media queries in ascending (mobile-first) order
  it('sorts media queries in mobileFirst order', async () => {
    const css = await run(sampleCss, { sortingEnabled: true, sort: 'mobileFirst' });
    const idx300 = css.indexOf('(min-width: 300px)');
    const idx600 = css.indexOf('(min-width: 600px)');
    expect(idx300).toBeLessThan(idx600);
  });

  // Test sorting media queries in descending (desktop-first) order
  it('sorts media queries in desktopFirst order', async () => {
    const css = await run(sampleCss, { sortingEnabled: true, sort: 'desktopFirst' });
    const idx300 = css.indexOf('(min-width: 300px)');
    const idx600 = css.indexOf('(min-width: 600px)');
    expect(idx600).toBeLessThan(idx300);
  });

  // Test removal of duplicate selector declarations within the same media query
  it('removes duplicate selectors within a media query', async () => {
    const dedupeCss = `
      @media (min-width: 500px) {
        .foo { color: red; }
        .foo { color: red; }
      }
    `;
    const css = await run(dedupeCss, { sortingEnabled: false });
    const fooCount = (css.match(/\.foo/g) || []).length;
    expect(fooCount).toBe(1);
  });

  // Test merging of identical max-width media queries into a single block
  it('groups identical max-width media queries under one rule', async () => {
    const input = `
      @media (max-width: 400px) { .a { color: black; } }
      @media (max-width: 400px) { .b { color: white; } }
    `;
    const css = await run(input);
    const matches = css.match(/@media \(max-width: 400px\)/g) || [];
    expect(matches.length).toBe(1);
    expect(css).toContain('.a { color: black; }');
    expect(css).toContain('.b { color: white; }');
  });

  // Test deduplication of identical declarations while keeping unique ones
  it('deduplicates only identical rule declarations not unique ones', async () => {
    const input = `
      @media (min-width: 500px) {
        .foo { color: red; }
        .foo { color: blue; }
        .foo { color: red; }
      }
    `;
    const css = await run(input);
    const redCount = (css.match(/color: red/g) || []).length;
    const blueCount = (css.match(/color: blue/g) || []).length;
    expect(redCount).toBe(1);
    expect(blueCount).toBe(1);
  });

  // Test that declaration order inside media queries is preserved
  it('preserves declaration order within a media query', async () => {
    const input = `
      @media (min-width: 500px) {
        .x { font-weight: bold; }
        .x { font-size: 16px; }
      }
    `;
    const css = await run(input);
    expect(css.indexOf('font-weight: bold')).toBeLessThan(css.indexOf('font-size: 16px'));
  });

  // Test plugin handles CSS without any media queries without error
  it('handles CSS without media queries gracefully', async () => {
    const input = `.a { margin: 0; } .b { padding: 0; }`;
    const css = await run(input);
    expect(css).toContain('.a { margin: 0; }');
    expect(css).toContain('.b { padding: 0; }');
  });
});
