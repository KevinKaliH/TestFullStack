export default [
  { column: "Id", propertyName: "id" },
  { column: "Nombre", propertyName: "name" },
  { column: "Teléfono", propertyName: "phone" },
  { column: "Correo", propertyName: "email" },
  {
    column: "Fecha creación",
    propertyName: "createdAt",
    columnFormat: (value: string) => new Date(value).toLocaleString(),
  },
  {
    column: "Fecha actualización",
    propertyName: "updatedAt",
    columnFormat: (value: string) => new Date(value).toLocaleString(),
  },
];
