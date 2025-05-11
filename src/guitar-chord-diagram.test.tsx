import { render } from '@testing-library/react'
import { expect, test } from 'vitest'

import { GuitarChordDiagram } from './guitar-chord-diagram'

test('supports chord string syntax', () => {
  expect(() => render(<GuitarChordDiagram chord='x-0-2-2-2-0' />)).not.toThrow()
})

test('invalid chord format throws', () => {
  expect(() => render(<GuitarChordDiagram chord='xx0232' />)).toThrow()
})
