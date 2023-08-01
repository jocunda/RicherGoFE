import React, { useEffect, useState } from "react";

//styles
import "../../styles/index.scss"
import styles from './styles.module.scss';
import {
  TableColumnDefinition,
  createTableColumn,
  useScrollbarWidth,
  useFluent,
  TableCellLayout,
  Badge,
  Input,
  Link
} from "@fluentui/react-components";
import {
  BoxSearch24Regular,
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
import { useNavigate } from "react-router-dom";

//Other Components
import AppAddItems from "../AppAddItems/Component";
import AppDeleteItems from "../AppDeleteItems/Component";
import AppEditItems from "../AppEditItems/Component";


export default function AppItems() {
  //datagrid fluentUI
  const { targetDocument } = useFluent();
  const scrollbarWidth = useScrollbarWidth({ targetDocument });

  const [itemData, setItemData] = useState<GetItemsResponse>([]);

  //retrieve item data
  useEffect(() => {
    itemDataGet();
  }, []);

  const handleItemCallBack = async () => {
    // Call the function to retrieve the updated item data
    await itemDataGet();
  };

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

  //router
  const navigate = useNavigate();

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
        return <>
          <Link onClick={() => navigate(`/items/${item.id}`)}>
            {item.value}
          </Link>
        </>
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
            <AppEditItems onItemEditSuccess={handleItemCallBack} itemId={item.id} itemDataForForm={item} />
            <AppDeleteItems onItemDeleteSuccess={handleItemCallBack} itemId={item.id} />
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

  return <>

    <div className={styles.itemsContainer}>
      <div className={styles.itemsHeaderContainer}>
        <Input
          className={styles.inputFilter}
          contentBefore={<BoxSearch24Regular />} />
        <h2>Item List Total:{itemData.length}</h2>
        <div>
          <AppAddItems onItemAddSuccess={handleItemCallBack} />
        </div>

      </div>

      <DataGrid
        items={itemData}
        columns={columns}
        // getRowId={(item) => item.id}
        sortable
        selectionMode="single"
        // onSelectionChange={(_e, data) => {
        //   const selectedArray = Array.from(data.selectedItems);
        //   const selectedString = selectedArray[0];
        //   navigate(`/items/${selectedString}`);
        // }}
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