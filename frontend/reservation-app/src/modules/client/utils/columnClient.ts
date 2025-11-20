export default [
  { column: "Nombre", propertyName: "name" },
  { column: "Teléfono", propertyName: "phone" },
  { column: "Correo", propertyName: "email" },
  {
    column: "Creado En",
    propertyName: "createdAt",
    columnFormat: (value: string) => new Date(value).toLocaleString(),
  },
  {
    column: "Actualizado En",
    propertyName: "updatedAt",
    columnFormat: (value: string) => new Date(value).toLocaleString(),
  },
];
