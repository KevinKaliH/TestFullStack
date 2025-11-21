export function validateDateRange(initial?: Date, end?: Date) {
  if (!initial || !end) return true;

  if (initial > end) return "Fecha inicio no puede ser mayor a fecha final";
  if (end < initial) return "Fecha final no puede ser menor a fecha inicio";

  return true;
}

export function greaterThanOrEqualsTo(value?: Date) {
  if (!value) return true;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return (
    new Date(value) >= today || "La fecha reservación debe ser hoy o mayor"
  );
}
