export default [
  { column: "Id", propertyName: "id" },
  { column: "Nombre", propertyName: "name" },
  { column: "Descripción", propertyName: "description" },
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
