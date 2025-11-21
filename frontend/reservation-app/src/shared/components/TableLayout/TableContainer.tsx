import { useMediaQuery } from "react-responsive";
import TableLayout from "./TableTemplate";
import TableCardTemplate from "./TableCardTemplate";
import type { TableCommonProps } from "./tableProperties";

const TableContainer = (props: TableCommonProps) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return isMobile ? (
    <TableCardTemplate {...props} />
  ) : (
    <TableLayout {...props} />
  );
};

export default TableContainer;
