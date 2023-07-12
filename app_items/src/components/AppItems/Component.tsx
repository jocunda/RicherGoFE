import React, { useEffect, useState } from "react";

//styles
import "../../styles/index.scss"
import styles from './styles.module.scss';
import {
  TableColumnDefinition,
  createTableColumn,
  Button,
  useScrollbarWidth,
  useFluent,
  TableCellLayout,
  Badge,
} from "@fluentui/react-components";
import {
  EditRegular,
  DeleteRegular,
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

// APIs
import { getItem } from "@mimo/items";
// types
import type { Item, GetItemsResponse } from "@mimo/items";


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
        <>
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
        </>
      );
    },
  }),
];

const renderRow: RowRenderer<GetItemsResponse> = ({ item, rowId }, style) => (
  <DataGridRow<GetItemsResponse> key={rowId} style={style}>
    {({ renderCell }) => <DataGridCell>{renderCell(item)}</DataGridCell>}
  </DataGridRow>
);


export default function AppItems() {
  const { targetDocument } = useFluent();
  const scrollbarWidth = useScrollbarWidth({ targetDocument });

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
  console.log(itemData)

  // const items: GetItemsResponse[] = [
  //   {
  //     id: "01ab",
  //     code: "JS-00172-28018-v1",
  //     value: "DR01雙色膠套",
  //     description: "#成品#光榮",
  //     deleteable: true,
  //   },
  //   {
  //     id: "02ab",
  //     code: "123Red",
  //     value: "DR01雙色膠套",
  //     description: "#成品#光榮",
  //     deleteable: true,
  //   },
  //   {
  //     id: "03ab",
  //     code: "122Red",
  //     value: "052-11雙片夾底座 黑(MM) 052-11MO-LA-000-0",
  //     description: "#成品#光榮",
  //     deleteable: false,
  //   },

  // ];

  // console.log(items)

  return <>
    <div className={styles.itemsContainer}>
      <h2>Item List</h2>
      {itemData && (
        <DataGrid
          items={itemData}
          columns={columns}
          focusMode="cell"
          sortable
          onSelectionChange={(_event, data) => console.log(data)}
        >
          <DataGridHeader style={{ paddingRight: scrollbarWidth }}>
            <DataGridRow>
              {({ renderHeaderCell }) => (
                <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
              )}
            </DataGridRow>
          </DataGridHeader>
          <DataGridBody<GetItemsResponse> itemSize={60} height={700}>
            {renderRow}
          </DataGridBody>
        </DataGrid>)
      }

    </div>
  </>;
}