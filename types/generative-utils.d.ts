declare module '@georgedoescode/generative-utils' {
  interface PatternOptions {
    width: number
    height: number
    seed: string
    color1: string
    color2: string
    pattern: 'triangles' | 'circles' | 'waves'
    density: number
    complexity: number
  }

  interface Pattern {
    toDataURL: () => string
  }

  export function generatePattern(options: PatternOptions): Pattern
} 