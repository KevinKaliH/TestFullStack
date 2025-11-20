export function formatFluentValidatorError(errors: object): string[] {
  return Object.values(errors).flat();
}
