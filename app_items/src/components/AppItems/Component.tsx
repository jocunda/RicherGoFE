import React, { useEffect, useState } from "react";

//styles
import "../../styles/index.scss"
import styles from './styles.module.scss';
import {
  TableColumnDefinition,
  createTableColumn,
  Button,
  CompoundButton,
  useScrollbarWidth,
  useFluent,
  TableCellLayout,
  Badge,
  Input,
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  Field,
  Image
} from "@fluentui/react-components";
import {
  bundleIcon,
  EditRegular,
  DeleteRegular,
  DocumentAdd24Filled,
  DocumentAdd24Regular,
  FolderAdd24Filled,
  FolderAdd24Regular,
  BoxSearch24Regular,
  AddCircle24Regular,
  DismissCircle24Regular
} from "@fluentui/react-icons";

import {
  DataGridBody,
  DataGrid,
  DataGridRow,
  DataGridHeader,
  DataGridCell,
  DataGridHeaderCell,
  RowRenderer,
} from '@fluentui-contrib/react-data-grid-react-window';

//assets
import plus from "../../images/plusIcon.svg"

// APIs
import { getItem } from "@mimo/items";
// types
import type { Item, GetItemsResponse } from "@mimo/items";
import { useNavigate } from "react-router-dom";

const DocumentAddIcon = bundleIcon(DocumentAdd24Filled, DocumentAdd24Regular);
const FolderAddIcon = bundleIcon(FolderAdd24Filled, FolderAdd24Regular);

//datagrid fluentUI
const columns: TableColumnDefinition<Item>[] = [

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
      return <>
        <TableCellLayout className={styles.descriptionContainer}>
          {arraySplit.map((classify: string) =>
            <Badge
              appearance="tint"
              className={styles.classBadge}>{classify}</Badge>
          )}
        </TableCellLayout>
      </>
    },
  }),

  createTableColumn<Item>({
    columnId: "actions",
    renderHeaderCell: () => {
      return "Actions";
    },
    renderCell: (item) => {
      return (
        <div className={styles.actionsContainer}>
          <Button
            aria-label="Edit"
            appearance="subtle"
            icon={<EditRegular />} >Edit</Button>
          {item.deleteable ?
            <Button
              aria-label="Delete"
              appearance="subtle"
              icon={<DeleteRegular />} >Delete</Button > : ""}
        </div>
      );
    },
  }),
];

//datagrid fluentUI
const renderRow: RowRenderer<GetItemsResponse> = ({ item, rowId }, style) => (
  <DataGridRow<GetItemsResponse> key={rowId} style={style} >
    {({ renderCell }) => <DataGridCell>{renderCell(item)}</DataGridCell>}
  </DataGridRow>
);


export default function AppItems() {
  //datagrid fluentUI
  const { targetDocument } = useFluent();
  const scrollbarWidth = useScrollbarWidth({ targetDocument });

  //router
  const navigate = useNavigate();

  const [itemData, setItemData] = useState<GetItemsResponse>([]);

  //retrieve item data
  useEffect(() => {
    itemDataGet();
  }, []);

  const itemDataGet = async () => {
    const { data, error, errorMessage } = await getItem();
    if (error) {
      const obj = JSON.stringify(errorMessage);
      const errMessage = JSON.parse(obj)
      console.log(errMessage);
    }
    if (data) {
      setItemData(data);
    }
  }

  return <>
    <div className={styles.itemsContainer}>
      <div className={styles.itemsHeaderContainer}>
        <Input
          className={styles.inputFilter}
          contentBefore={<BoxSearch24Regular />} />
        <h2>Item List Total:{itemData.length}</h2>
        <div>
          <Dialog modalType="modal">
            <DialogTrigger disableButtonEnhancement>
              <Button
                appearance="primary"
                icon={<DocumentAddIcon />}>Add Item</Button>
            </DialogTrigger>
            <DialogSurface>
              <DialogBody>
                <DialogTitle>Add Item</DialogTitle>
                <DialogContent>
                  <form method="post">
                    <Image
                      alt="add Image"
                      shape="circular"
                      src={plus}
                      height={200}
                      width={200}
                      onClick={() => console.log("clickable")}
                    />
                    <Field
                      size="large"
                      label="Name"
                      required
                    >
                      <Input
                        size="large"
                      />
                    </Field>
                    <Field
                      size="large"
                      label="Code"
                      required
                    >
                      <Input
                        size="large"
                      />
                    </Field>
                    <Field
                      size="large"
                      label="Description"
                      required
                    >
                      <Input
                        size="large"
                      />
                    </Field>
                  </form>
                </DialogContent>
                <DialogActions>
                  <Button appearance="primary" icon={<AddCircle24Regular />}>Add</Button>
                  <DialogTrigger disableButtonEnhancement>
                    <Button appearance="secondary" icon={<DismissCircle24Regular />}>Cancel</Button>
                  </DialogTrigger>
                </DialogActions>
              </DialogBody>
            </DialogSurface>
          </Dialog>

          <CompoundButton
            appearance="secondary"
            secondaryContent="From Folder"
            icon={<FolderAddIcon />}>Add Item</CompoundButton>
        </div>

      </div>

      <DataGrid
        items={itemData}
        columns={columns}
        getRowId={(item) => item.id}
        sortable
        selectionMode="single"
        onSelectionChange={(_e, data) => {
          const selectedArray = Array.from(data.selectedItems);
          const selectedString = selectedArray[0];
          navigate(`/items/${selectedString}`);
        }}
        className={styles.itemsListContainer}
      >
        <DataGridHeader style={{ paddingRight: scrollbarWidth }}>
          <DataGridRow>
            {({ renderHeaderCell }) => (
              <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
            )}
          </DataGridRow>
        </DataGridHeader>
        <DataGridBody<GetItemsResponse>
          itemSize={60}
          height={700}>
          {renderRow}
        </DataGridBody>
      </DataGrid>

    </div >
  </>;
}