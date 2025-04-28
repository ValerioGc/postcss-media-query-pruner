# postcss-media-query-pruner

<p align="center">
  <img src="https://img.shields.io/npm/v/postcss-media-query-pruner?color=red&label=npm%20version&style=flat-square" alt="npm version" />
  <img src="https://img.shields.io/npm/dt/postcss-media-query-pruner?color=blue&label=npm%20downloads&style=flat-square" alt="npm downloads" />
</p>

**postcss-media-query-pruner** is a PostCSS plugin that **consolidates** and **cleans up** media queries in your CSS. It merges identical media queries into single blocks, removes duplicate rules, and optionally sorts them in “mobile-first” or “desktop-first” order if enabled through options. It helps reduce CSS file size and improves maintainability by ensuring that media queries are organized and efficient.


<br/>

## 📦 Installation

Install with npm:

```bash
npm install postcss-media-query-pruner --save-dev
```

## 🔧 Usage

Configure in your PostCSS setup (e.g., `postcss.config.js` or your build tool):

```js
import mediaQueryPruner from 'postcss-media-query-pruner';

module.exports = {
  plugins: [
    mediaQueryPruner({
      include: ['*'],      
      exclude: [],     
      sortingEnabled: true,          
      sort: 'mobileFirst', // or 'desktopFirst'
      logger: {
        info: msg => console.log('[Pruner]', msg),
        error: msg => console.error('[Pruner]', msg),
      },
    }),
  ],
};
```

## ⚙️ Options

| Option            | Type                 | Default        | Description                                                                    |
|-------------------|----------------------|----------------|--------------------------------------------------------------------------------|
| `include`         | `string[]`           | `['*']`        | Glob patterns or substrings to include files.                                  |
| `exclude`         | `string[]`           | `[]`           | Glob patterns or substrings to exclude files.                                  |
| `sortingEnabled`  | `boolean`            | `false`        | Enable sorting of media queries by width.                                      |
| `sort`            | `'mobileFirst'` \| `'desktopFirst'` | `'mobileFirst'` | Sorting strategy: ascending or descending by `min-width`.                    |
| `logger`          | `{info, error}`      | `console`      | Custom logger for info and error messages.                                     |


## 📋 Examples

### 1. Merge & Deduplicate

**Input:**

```css
@media (min-width: 600px) {
  .btn { color: blue; }
}
@media (min-width: 600px) {
  .btn { color: blue; }
  .card { padding: 1rem; }
}
```

**Output:**

```css
@media (min-width: 600px) {
  .btn { color: blue; }
  .card { padding: 1rem; }
}
```

### 2. Sorting Enabled (Desktop-first)

**Input:**

```css
@media (min-width: 300px) { .a { font-size: 14px; } }
@media (min-width: 800px) { .b { font-size: 16px; } }
```

**Config:**

```js
mediaQueryPruner({ sortingEnabled: true, sort: 'desktopFirst' });
```

**Output:**

```css
@media (min-width: 800px) { .b { font-size: 16px; } }
@media (min-width: 300px) { .a { font-size: 14px; } }
```

### 3. Include/Exclude Patterns

```js
mediaQueryPruner({
  include: ['src/components'],
  exclude: ['legacy.css'],
});
```

Only files in `src/components` will be pruned, skipping any path containing `legacy.css`.

<br/> 

## 🤝 Contributing

Contributions welcome! Please open issues or pull requests for bug fixes and features.

## 📄 License

This project is licensed under the **0BSD** License. See [LICENSE](LICENSE) for details.
