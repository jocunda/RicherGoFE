import React from "react";

//styles
import "../../styles/index.scss"
import styles from './styles.module.scss';
import {
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
  // Avatar,
  AvatarGroupPopover,
  AvatarGroup,
  AvatarGroupItem,
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


type Item = {
  file: FileCell;
  code: string;
  value: string;
  description: string;
};

const items: Item[] = [
  {
    file: { label: "Meeting notes", icon: <DocumentRegular /> },
    code: "345Red",
    value: "DR01雙色膠套",
    description: "#成品#光榮",
  },
  {
    file: { label: "Thursday presentation", icon: <FolderRegular /> },
    code: "123Red",
    value: "DR01雙色膠套",
    description: "#成品#光榮",
  },
  {
    file: { label: "Training recording", icon: <VideoRegular /> },
    code: "122Red",
    value: "DR01雙色膠套",
    description: "#成品#光榮",
  },
  {
    file: { label: "Purchase order", icon: <DocumentPdfRegular /> },
    code: "121Red",
    value: "DR01雙色膠套",
    description: "#成品#Green#BLue#tyui",
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
    columnId: "code",
    compare: (a, b) => {
      return a.code.localeCompare(b.code);
    },
    renderHeaderCell: () => {
      return "Code";
    },
    renderCell: (item) => {
      return item.code;
    },
  }),

  createTableColumn<Item>({
    columnId: "value",
    compare: (a, b) => {
      return a.value.localeCompare(b.value);
    },
    renderHeaderCell: () => {
      return "Value";
    },
    renderCell: (item) => {
      return item.value;
    },
  }),

  createTableColumn<Item>({
    columnId: "description",
    compare: (a, b) => {
      return a.description.localeCompare(b.description);
    },
    renderHeaderCell: () => {
      return "Classification";
    },
    renderCell: (item) => {
      const arraySplit = item.description.split("#").filter(Boolean)
      console.log(arraySplit)
      return <>
        <TableCellLayout>
          {/* {arraySplit.map((classify: string) =>
            // <Button
            //   color="colorful"
            //   idForColor="id-123"
            //   className={styles.classButton}
            //   aria-label="Class"
            //   appearance="primary">{classify}</Button>
            
            // <Avatar color="colorful" name={classify} />
          )} */}

          <AvatarGroup>
            {arraySplit.map((name) => (
              <AvatarGroupItem name={name} key={name} />
            ))}
            {arraySplit && (
              <AvatarGroupPopover>
                {arraySplit.map((name) => (
                  <AvatarGroupItem name={name} key={name} />
                ))}
              </AvatarGroupPopover>
            )}
          </AvatarGroup>
        </TableCellLayout>

      </>
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
          <Button
            aria-label="Edit"
            appearance="transparent"
            icon={<EditRegular />} >Edit</Button>
          <Button
            aria-label="Delete"
            appearance="transparent"
            icon={<DeleteRegular />} >Delete</Button >
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
        getRowId={(item) => item.file.label}
        onSelectionChange={(_event, data) => console.log(data)}
      >
        <DataGridHeader>
          <DataGridRow>
            {({ renderHeaderCell }) => (
              <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
            )}
          </DataGridRow>
        </DataGridHeader>
        <DataGridBody<Item>>
          {({ item, rowId }) => (
            <DataGridRow<Item> key={rowId}>
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