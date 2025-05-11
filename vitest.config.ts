import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'happy-dom',
    setupFiles: ['config/vitest-cleanup-after-each.ts'],
    include: ['**/*.test.ts(x)?'],
  },
})
