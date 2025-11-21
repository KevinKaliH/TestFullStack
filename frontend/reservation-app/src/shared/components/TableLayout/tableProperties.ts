export interface ColumnDictionary {
  column: string;
  propertyName: string;
  maxWidth?: string;
  columnFormat?: (value: any) => React.ReactNode;
}

export interface TableCommonProps {
  columns: ColumnDictionary[];
  data: any[];
  deleteAction: (obj: any) => void;
  updateAction: (obj: any) => void;
}
