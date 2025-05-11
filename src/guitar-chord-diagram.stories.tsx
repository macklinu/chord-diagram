import type { Meta, StoryObj } from '@storybook/react-vite'

import { GuitarChordDiagram } from './guitar-chord-diagram'

const meta = {
  component: GuitarChordDiagram,
  title: 'GuitarChordDiagram',
  tags: ['autodocs'],
  args: {
    className: 'w-64',
  },
} satisfies Meta<typeof GuitarChordDiagram>

export default meta

type Story = StoryObj<typeof meta>

export const AMajor: Story = {
  name: 'A',
  args: {
    chord: 'x-0-2-2-2-0',
  },
}

export const AMajorBarre: Story = {
  name: 'A (Barre)',
  args: {
    chord: '5-7-7-6-5-5',
  },
}

export const AMajorSeven: Story = {
  name: 'AMaj7',
  args: {
    chord: 'x-0-2-1-2-0',
    name: 'AMaj7',
  },
}

export const CMajor: Story = {
  name: 'C',
  args: {
    chord: 'x-3-2-0-1-0',
  },
}

export const E9: Story = {
  name: 'E9',
  args: {
    chord: 'x-7-6-7-7-7',
  },
}

export const FMinor7: Story = {
  name: 'Fm7',
  args: {
    chord: '1-3-1-1-1-1',
  },
}

export const FSharpMinor7: Story = {
  name: 'F#m7',
  args: {
    chord: '2-4-2-2-2-2',
  },
}

export const GMinor7: Story = {
  name: 'Gm7',
  args: {
    chord: '3-5-3-3-3-3',
  },
}

export const AllMuted: Story = {
  args: {
    chord: 'x-x-x-x-x-x',
  },
}

export const AllOpen: Story = {
  args: {
    chord: '0-0-0-0-0-0',
  },
}
