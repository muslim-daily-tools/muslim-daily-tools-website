export interface ParsedStat {
  value: number
  suffix: string
  grouped: boolean
}

const statPattern = /^(\d[\d,]*)(.*)$/

/** Splits a display stat such as "50,000+" into a number plus its suffix */
export function parseStat(display: string): ParsedStat | null {
  const match = statPattern.exec(display.trim())
  if (!match) return null
  const [, digits, suffix] = match
  return {
    value: Number(digits.replaceAll(',', '')),
    suffix,
    grouped: digits.includes(','),
  }
}

/** Formats an intermediate value in the same shape as the parsed target */
export function formatStat(stat: ParsedStat, current: number): string {
  const rounded = Math.round(current)
  const digits = stat.grouped
    ? rounded.toLocaleString('en-US')
    : String(rounded)
  return `${digits}${stat.suffix}`
}
