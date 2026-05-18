export function cn(...c: (string | undefined | boolean)[]): string {
  return c.filter(Boolean).join(" ");
}
