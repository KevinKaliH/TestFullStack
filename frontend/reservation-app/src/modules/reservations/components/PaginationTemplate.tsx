import { Pagination } from "react-bootstrap";

interface PaginationProps {
  activePage: number;
  pagesNumber: number;
  handlePageChange: (index: number) => any;
}

const PaginationTemplate = ({
  pagesNumber,
  activePage,
  handlePageChange,
}: PaginationProps) => {
  return (
    <Pagination color="primary">
      {Array.from({ length: pagesNumber }).map((_, index) => {
        const indexValue = index + 1;
        return (
          <Pagination.Item
            key={indexValue}
            active={activePage == indexValue}
            onClick={() => handlePageChange(indexValue)}
          >
            {indexValue}
          </Pagination.Item>
        );
      })}
    </Pagination>
  );
};

export default PaginationTemplate;
