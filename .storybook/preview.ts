import '../src/index.css'

import type { Preview } from '@storybook/react-vite'

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      grid: {
        cellAmount: 6,
        offsetX: 0,
        offsetY: 0,
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
