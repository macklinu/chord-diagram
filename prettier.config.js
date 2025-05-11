import config from '@macklinu/prettier-config'

/** @type {import("prettier").Config} */
export default {
  ...config,
  plugins: ['prettier-plugin-tailwindcss'],
}
