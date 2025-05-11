# @macklinu/chord-diagram

> React components for rendering SVG guitar chord diagrams

## Getting started

Install the package.

```bash
pnpm add @macklinu/chord-diagram
```

It's also required to use [Tailwind](https://tailwindcss.com/) with this component.

```bash
pnpm add tailwindcss @tailwindcss/vite -D
```

Wherever you will be using the chord diagram component, make sure to include this library's styles as a [Tailwind source](https://tailwindcss.com/docs/detecting-classes-in-source-files#explicitly-registering-sources)

```css
@import 'tailwindcss';
@source "../node_modules/@macklinu/chord-diagram";
```

Then render the guitar chord diagram using `note-note-note-note-note-note`, where `note` is either the literal `x` (muted string) or a numeric value (0-24) to indicate which fret should be played. For example, C Major (open) would look like this:

```tsx
import { GuitarChordDiagram } from '@macklinu/chord-diagram'

const MyComponent = () => {
  return <GuitarChordDiagram chord='x-3-2-0-1-0' />
}
```
