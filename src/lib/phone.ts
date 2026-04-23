// Phone utilities for forms that collect a phone number.
// See .claude/rules/forms-compliance-pattern.md

// Live client-side formatter. Bind to the phone input's onChange.
// Always returns '+1 (xxx) xxx-xxxx' form. Strips user-supplied +1 / leading 1.
// Partial input produces partial formatting (e.g. '555' → '+1 (555').
// Empty or '+1'-only input returns ''.
export function formatPhoneInput(input: string): string {
  if (!input) return "";
  let digits = input.replace(/\D/g, "");
  if (digits.startsWith("1")) digits = digits.slice(1);
  if (digits.length === 0) return "";
  if (digits.length <= 3) {
    return `+1 (${digits}`;
  }
  if (digits.length <= 6) {
    return `+1 (${digits.slice(0, 3)}) ${digits.slice(3)}`;
  }
  digits = digits.slice(0, 10);
  return `+1 (${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

// Server-side canonical producer. Only returns a formatted number for
// complete 10-digit input. Partial or empty input returns '' so the
// webhook payload never carries a half-typed phone.
export function normalizePhoneForSubmit(
  input: string | null | undefined
): string {
  if (!input) return "";
  let digits = String(input).replace(/\D/g, "");
  if (digits.startsWith("1")) digits = digits.slice(1);
  if (digits.length !== 10) return "";
  return `+1 (${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}
