import { Button, Card } from "react-bootstrap";
import type { TableCommonProps } from "./tableProperties";

const TableCardTemplate = ({
  columns,
  data,
  deleteAction,
  updateAction,
}: TableCommonProps) => {
  if (data.length == 0)
    return (
      <Card className="mb-3 shadow-sm">
        <Card.Body>
          <p className="text-muted text-center mb-2">
            No hay información disponible.
          </p>
        </Card.Body>
      </Card>
    );

  return (
    <div className="d-md-none">
      {data.map((row, index) => (
        <Card key={index} className="mb-3 shadow-sm">
          <Card.Body>
            {columns.map(({ column, propertyName, columnFormat }, indexCol) => (
              <p key={propertyName + indexCol} className="mb-1">
                <strong>{column}: </strong>
                {columnFormat
                  ? columnFormat(row[propertyName])
                  : row[propertyName]}
              </p>
            ))}
            <div className="d-flex gap-2 flex-wrap mt-2">
              <Button
                variant="primary"
                size="sm"
                onClick={() => updateAction(row)}
              >
                Actualizar
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => deleteAction(row)}
              >
                Borrar
              </Button>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default TableCardTemplate;
