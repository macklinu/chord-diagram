import { expect, test } from '@playwright/experimental-ct-react'

import {
  GuitarChordDiagram,
  type GuitarChordDiagramProps,
} from './guitar-chord-diagram'

const testCases = [
  {
    name: 'all muted',
    props: { chord: 'x-x-x-x-x-x' },
  },
  {
    name: 'all open',
    props: { chord: '0-0-0-0-0-0' },
  },
  {
    name: 'a major',
    props: { chord: 'x-0-2-2-2-0' },
  },
  {
    name: 'c major',
    props: { chord: 'x-3-2-0-1-0' },
  },
  {
    name: 'e major',
    props: { chord: '0-2-2-1-0-0' },
  },
  {
    name: 'e9',
    props: { chord: 'x-7-6-7-7-7' },
  },
] satisfies { name: string; props: GuitarChordDiagramProps }[]

for (const { name, props } of testCases) {
  test(name, async ({ mount }) => {
    const component = await mount(<GuitarChordDiagram {...props} />)
    await expect(component).toHaveScreenshot()
  })
}
