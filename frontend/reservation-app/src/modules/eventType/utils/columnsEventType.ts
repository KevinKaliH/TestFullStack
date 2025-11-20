export default [
  { column: "Nombre", propertyName: "name" },
  { column: "Descripción", propertyName: "description" },
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
