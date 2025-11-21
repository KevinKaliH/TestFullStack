export default [
  { column: "Id", propertyName: "id" },
  { column: "Código de reserva", propertyName: "reservationCode" },
  { column: "Cliente", propertyName: "clientName" },
  { column: "Evento", propertyName: "eventTypeName" },
  {
    column: "Fecha de reservación",
    propertyName: "reservationDate",
    columnFormat: (value: string) => new Date(value).toLocaleString(),
  },
  {
    column: "Notas",
    propertyName: "notes",
    columnClassName: "text-truncate",
    maxWidth: "150px",
  },
  {
    column: "Fecha creación",
    propertyName: "reservationDate",
    columnFormat: (value: string) => new Date(value).toLocaleDateString(),
  },
  {
    column: "Fecha actualización",
    propertyName: "reservationDate",
    columnFormat: (value: string) => new Date(value).toLocaleDateString(),
  },
];
