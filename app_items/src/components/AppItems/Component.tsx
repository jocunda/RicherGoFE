import React from "react";

//styles
import "../../styles/index.scss"
import styles from './styles.module.scss';
import {
  PresenceBadgeStatus,
  Avatar,
  DataGridBody,
  DataGridRow,
  DataGrid,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridCell,
  TableCellLayout,
  TableColumnDefinition,
  createTableColumn,
  Button,
} from "@fluentui/react-components";
import {
  FolderRegular,
  EditRegular,
  DocumentRegular,
  DocumentPdfRegular,
  VideoRegular,
  DeleteRegular,
} from "@fluentui/react-icons";

type FileCell = {
  label: string;
  icon: JSX.Element;
};

type LastUpdatedCell = {
  label: string;
  timestamp: number;
};

type AuthorCell = {
  label: string;
  status: PresenceBadgeStatus;
};

type Item = {
  file: FileCell;
  author: AuthorCell;
  lastUpdated: LastUpdatedCell;
};

const items: Item[] = [
  {
    file: { label: "Meeting notes", icon: <DocumentRegular /> },
    author: { label: "Max Mustermann", status: "available" },
    lastUpdated: { label: "7h ago", timestamp: 1 },
  },
  {
    file: { label: "Thursday presentation", icon: <FolderRegular /> },
    author: { label: "Erika Mustermann", status: "busy" },
    lastUpdated: { label: "Yesterday at 1:45 PM", timestamp: 2 },
  },
  {
    file: { label: "Training recording", icon: <VideoRegular /> },
    author: { label: "John Doe", status: "away" },
    lastUpdated: { label: "Yesterday at 1:45 PM", timestamp: 2 },
  },
  {
    file: { label: "Purchase order", icon: <DocumentPdfRegular /> },
    author: { label: "Jane Doe", status: "offline" },
    lastUpdated: { label: "Tue at 9:30 AM", timestamp: 3 },
  },
];

const columns: TableColumnDefinition<Item>[] = [
  createTableColumn<Item>({
    columnId: "file",
    compare: (a, b) => {
      return a.file.label.localeCompare(b.file.label);
    },
    renderHeaderCell: () => {
      return "File";
    },
    renderCell: (item) => {
      return (
        <TableCellLayout media={item.file.icon}>
          {item.file.label}
        </TableCellLayout>
      );
    },
  }),
  createTableColumn<Item>({
    columnId: "author",
    compare: (a, b) => {
      return a.author.label.localeCompare(b.author.label);
    },
    renderHeaderCell: () => {
      return "Author";
    },
    renderCell: (item) => {
      return (
        <TableCellLayout
          media={
            <Avatar
              aria-label={item.author.label}
              name={item.author.label}
              badge={{ status: item.author.status }}
            />
          }
        >
          {item.author.label}
        </TableCellLayout>
      );
    },
  }),
  createTableColumn<Item>({
    columnId: "lastUpdated",
    compare: (a, b) => {
      return a.lastUpdated.timestamp - b.lastUpdated.timestamp;
    },
    renderHeaderCell: () => {
      return "Last updated";
    },

    renderCell: (item) => {
      return item.lastUpdated.label;
    },
  }),
  createTableColumn<Item>({
    columnId: "actions",
    renderHeaderCell: () => {
      return "Actions";
    },
    renderCell: () => {
      return (
        <>
          <Button aria-label="Edit" icon={<EditRegular />} />
          <Button aria-label="Delete" icon={<DeleteRegular />} />
        </>
      );
    },
  }),
];

export default function AppItems() {

  return <>
    <div className={styles.itemsContainer}>
      <DataGrid
        items={items}
        columns={columns}
        sortable
        selectionMode="multiselect"
        getRowId={(item) => item.file.label}
        onSelectionChange={(_event, data) => console.log(data)}
      >
        <DataGridHeader>
          <DataGridRow selectionCell={{ "aria-label": "Select all rows" }}>
            {({ renderHeaderCell }) => (
              <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
            )}
          </DataGridRow>
        </DataGridHeader>
        <DataGridBody<Item>>
          {({ item, rowId }) => (
            <DataGridRow<Item>
              key={rowId}
              selectionCell={{ "aria-label": "Select row" }}
            >
              {({ renderCell }) => (
                <DataGridCell focusMode="group">{renderCell(item)}</DataGridCell>
              )}
            </DataGridRow>
          )}
        </DataGridBody>
      </DataGrid>
    </div>
  </>;
}