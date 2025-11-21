import { Button, Table } from "react-bootstrap";
import type { TableCommonProps } from "./tableProperties";

const TableLayout = ({
  columns,
  data,
  deleteAction,
  updateAction,
}: TableCommonProps) => {
  return (
    <Table className="table table-bordered" responsive>
      <thead className="thead-dark">
        <tr>
          {columns.map((col) => (
            <th key={col.column}>{col.column}</th>
          ))}
          <th style={{ position: "sticky", right: 0, background: "#fff" }}></th>
        </tr>
      </thead>
      <tbody>
        {data.length === 0 && (
          <tr>
            <td
              colSpan={columns.length}
              className="text-center py-4 text-muted"
            >
              Sin datos
            </td>
          </tr>
        )}
        {data.map((row, indexRow) => (
          <tr key={indexRow}>
            {columns.map(
              ({ propertyName, columnFormat, maxWidth }, colIndex) => {
                const value = row[propertyName];
                const cellContent = columnFormat ? columnFormat(value) : value;

                return (
                  <td
                    key={propertyName + colIndex}
                    className="text-truncate"
                    style={{ maxWidth: maxWidth }}
                  >
                    {cellContent}
                  </td>
                );
              }
            )}
            <td style={{ position: "sticky", right: 0, background: "#fff" }}>
              <div className="d-flex gap-2 flex-wrap">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => updateAction(row)}
                >
                  Update
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => deleteAction(row)}
                >
                  Delete
                </Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TableLayout;
