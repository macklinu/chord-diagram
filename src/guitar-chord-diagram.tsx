import { cx } from '@macklinu/cx'
import { CircleSmallIcon, XIcon } from 'lucide-react'
import {
  createContext,
  type ReactNode,
  useContext,
  useId,
  useMemo,
} from 'react'
import invariant from 'tiny-invariant'
import { z } from 'zod/v4'

export interface GuitarChordDiagramProps {
  /**
   * The serialized chord in the format `note-note-note-note-note-note`,
   * where `note` is either `x` to represent a muted string or a fret number like `2` to indicate the fret that should be held on that string.
   *
   * Strings are indicated from lowest to highest (left-to-right).
   *
   * @example 'x-0-2-1-2-0'
   */
  chord: string
  /**
   * An optional chord name to display above the diagram.
   *
   * @example 'AMaj7'
   */
  name?: string
  className?: string
}

type Note = 'x' | number

type Chord = Note[]
type NumericChord = Extract<Note, number>[]

const isMusicalNote = (note: Note): note is number => typeof note === 'number'

const isBarreChord = (chord: Chord): chord is number[] =>
  chord.every((note) => isMusicalNote(note) && note !== 0)

const containsNote = (chord: Chord) => chord.some(isMusicalNote)

const lowestFret = (chord: NumericChord) => Math.min.apply(null, chord)

const highestFret = (chord: NumericChord) => Math.max.apply(null, chord)

const strings = ['E', 'A', 'D', 'G', 'B', 'E']

const kebab = (...parts: (number | string)[]): string => parts.join('-')

const ChordContext = createContext<
  | {
      id: string
      scale: { x: number; y: number }
      chord: Chord
    }
  | undefined
>(undefined)

const useChordContext = () => {
  const context = useContext(ChordContext)
  invariant(
    context,
    'useChordContext must be used inside a ChordContext.Provider'
  )
  return context
}

const ChordContextProvider = ({
  chord,
  children,
}: {
  chord: Chord
  children: ReactNode
}) => {
  const id = useId()

  const value = useMemo(
    () => ({
      id,
      scale: { x: 12, y: 16 },
      chord,
    }),
    [id, chord]
  )

  return <ChordContext.Provider value={value}>{children}</ChordContext.Provider>
}

const FretAnnotation = ({
  note,
  fretNumber,
}: {
  note: Note
  fretNumber: number
}) => {
  const { scale } = useChordContext()
  switch (note) {
    case 'x':
      return (
        <XIcon
          x={scale.x * (fretNumber + 1) + scale.y / 2}
          y={scale.y + scale.y / 2}
          width={8}
          height={8}
          className='stroke-3'
        />
      )
    case 0:
      return (
        <CircleSmallIcon
          x={scale.x * (fretNumber + 1) + scale.y / 2}
          y={scale.y + 8}
          width={8}
          height={8}
          className='stroke-3'
        />
      )
    default:
      return (
        <CircleSmallIcon
          x={scale.x * (fretNumber + 1) + scale.y / 4}
          y={scale.y + scale.y * note}
          width={16}
          height={16}
          className='fill-black'
        />
      )
  }
}

const requiresOffset = (chord: Chord) =>
  (isBarreChord(chord) && highestFret(chord) > 4) ||
  (containsNote(chord) && highestFret(chord.filter(isMusicalNote)) > 4)

const barreChordFontSize = 10

const FretAnnotations = () => {
  const { id, chord, scale } = useChordContext()
  const noteOffset = requiresOffset(chord)
    ? lowestFret(chord.filter(isMusicalNote)) - 1
    : 0

  return (
    <g id={kebab('fret-annotations', id)}>
      {requiresOffset(chord) ? (
        <text
          x={scale.x - scale.x / 4}
          y={scale.y + scale.y * 2 - barreChordFontSize / 2}
          className='stroke-none text-[0.625rem] tabular-nums'
        >
          {lowestFret(chord.filter(isMusicalNote))}
        </text>
      ) : null}
      {chord.map((note, i) => (
        <FretAnnotation
          key={kebab(note, i)}
          note={typeof note === 'number' ? note - noteOffset : note}
          fretNumber={i}
        />
      ))}
    </g>
  )
}

const VerticalLine = ({ fretNumber }: { fretNumber: number }) => {
  const { scale } = useChordContext()
  return (
    <line
      x1={scale.x * (fretNumber + 1) + scale.x}
      x2={scale.x * (fretNumber + 1) + scale.x}
      y1={scale.y * 2}
      y2={scale.y * 6}
    />
  )
}

const VerticalLines = () => {
  const { id } = useChordContext()
  return (
    <g id={kebab('vertical-lines', id)} className='stroke-linecap-round'>
      {strings.map((string, i) => (
        <VerticalLine key={kebab(string, i)} fretNumber={i} />
      ))}
    </g>
  )
}

const HorizontalLine = ({ yOffset }: { yOffset: number }) => {
  const { scale } = useChordContext()
  return (
    <line
      x1={scale.x * 2}
      x2={scale.x * 7}
      y1={scale.y * yOffset}
      y2={scale.y * yOffset}
    />
  )
}

const HorizontalLines = () => {
  const { id } = useChordContext()
  return (
    <g id={kebab('horizontal-lines', id)} className='stroke-linecap-round'>
      <HorizontalLine yOffset={2} />
      <HorizontalLine yOffset={3} />
      <HorizontalLine yOffset={4} />
      <HorizontalLine yOffset={5} />
      <HorizontalLine yOffset={6} />
    </g>
  )
}

const Title = ({ children }: { children: string }) => {
  const { scale } = useChordContext()
  return (
    <text
      textAnchor='middle'
      x={128 / 2 - 12 / 2}
      y={scale.y}
      className='stroke-none text-xs font-bold'
    >
      {children}
    </text>
  )
}

const guitarChordSchema = z
  .string()
  .regex(/[(\d|x)-]+/)
  .transform((s) => s.split('-'))
  .transform((parts) =>
    parts.map((part) => {
      if (part === 'x') {
        return part
      }
      return z.coerce
        .number()
        .refine((arg) => !Number.isNaN(arg))
        .parse(part)
    })
  )

export const GuitarChordDiagram = (props: GuitarChordDiagramProps) => {
  const chord = z.parse(guitarChordSchema, props.chord)

  return (
    <ChordContextProvider chord={chord}>
      <svg
        className={cx('stroke-black text-base', props.className)}
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 108 116'
      >
        {props.name ? <Title>{props.name}</Title> : null}
        <HorizontalLines />
        <VerticalLines />
        <FretAnnotations />
      </svg>
    </ChordContextProvider>
  )
}
