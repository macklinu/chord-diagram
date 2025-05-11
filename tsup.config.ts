import fs from 'node:fs'

import { defineConfig } from 'tsup'

export default defineConfig((options) => ({
  entryPoints: ['src/index.ts'],
  format: ['cjs', 'esm'],
  outDir: 'dist',
  dts: true,
  clean: true,
  sourcemap: true,
  watch: options.watch,
  minify: !options.watch,
  onSuccess: () => fs.promises.copyFile('./src/index.css', './dist/index.css'),
}))
