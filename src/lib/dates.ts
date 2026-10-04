// Formats a date the way the site shows it everywhere, for example "April 28, 2026".
export function formatLongDate(date: Date): string {
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}
