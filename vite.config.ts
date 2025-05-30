import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    emptyOutDir: true,
    target: 'node20', 
    lib: {
      entry: 'src/index.mts',
      name: 'postcss-media-query-pruner',
      formats: ['cjs', 'es'],
      fileName: (format: any) => `postcss-media-query-pruner.${format}.js`
    },
    reportCompressedSize: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.info', 'console.debug', 'console.log'],
        passes: 6
      },
      mangle: {
        toplevel: true
      },
      format: {
        comments: false,
        max_line_len: 80
      },
      keep_fnames: false,
      keep_classnames: false
    },
    rollupOptions: {
      external: ['fs', 'fs/promises', 'path'],
      output: {
        globals: {
          fs: 'fs', 'fs/promises': 'fs/promises',
          path: 'path'
        },
        exports: 'named'
      }
    },
  },
  plugins: [
    dts(),
    {
      name: 'log-output',
      generateBundle(_options: any, bundle: {}) {
        console.log('Generated files:');
        Object.keys(bundle).forEach(fileName => {
          console.log(fileName);
        });
      }
    }
  ]
});
