import config from '@macklinu/eslint-config'
import { defineConfig, globalIgnores } from 'eslint/config'
import storybook from 'eslint-plugin-storybook'

export default defineConfig([
  globalIgnores(['dist/', 'playwright/']),
  ...config,
  ...storybook.configs['flat/recommended'],
])
