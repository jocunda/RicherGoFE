import React, {
  useEffect,
  useState
} from "react";

//styles
import "../../styles/index.scss"
import styles from './styles.module.scss';
import { useParams, useNavigate } from "react-router-dom";
import {
  TagSearch24Regular
} from "@fluentui/react-icons";

import {
  TableColumnDefinition,
  createTableColumn,
  useScrollbarWidth,
  useFluent,
  Input,
  Link
} from "@fluentui/react-components";

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
import { getInventoryList } from "@mimo/items";
// types
import type { Inventory } from "@mimo/items";

//Component
import AppDeleteInventory from "../AppDeleteInventory/Component";
import AppEditInventory from "../AppEditInventory/Component";
import AppWithdrawInventory from "../AppWithdrawInventory/Component";



export default function AppInventoryList() {

  const handleInventoryCallBack = async () => {
    // Call the function to retrieve the updated item data
    // await itemDataGet();
  };

  //router
  const navigate = useNavigate();

  //datagrid fluentUI
  const columns: TableColumnDefinition<Inventory>[] = [

    createTableColumn<Inventory>({
      columnId: "code",
      compare: (a, b) => {
        return a.no.localeCompare(b.no);
      },
      renderHeaderCell: () => {
        return "Code";
      },
      renderCell: (item) => {
        return <>
          <Link onClick={() => navigate(`/inventories/${item.id}`)}>
            {item.no}
          </Link>
        </>
      },
    }),

    createTableColumn<Inventory>({
      columnId: "quantity",
      compare: (a, b) => {
        return a.qty - b.qty;
      },
      renderHeaderCell: () => {
        return "Quantity";
      },
      renderCell: (item) => {
        // const itemQuantityFormatted = item.qty.toFixed(2);
        // console.log(itemQuantityFormatted) why?
        return item.qty
      },
    }),

    createTableColumn<Inventory>({
      columnId: "position",
      compare: (a, b) => {
        return a.positionTargetId.localeCompare(b.positionTargetId);
      },
      renderHeaderCell: () => {
        return "Position";
      },
      renderCell: (item) => {
        return item.positionTargetId;
      },
    }),

    createTableColumn<Inventory>({
      columnId: "source",
      compare: (a, b) => {
        return a.positionPreOwnerId.localeCompare(b.positionPreOwnerId);
      },
      renderHeaderCell: () => {
        return "Source";
      },
      renderCell: (item) => {
        return item.positionPreOwnerId;
      },
    }),

    createTableColumn<Inventory>({
      columnId: "createdBy",
      compare: (a, b) => {
        return a.employeeName.localeCompare(b.employeeName);
      },
      renderHeaderCell: () => {
        return "Created By";
      },
      renderCell: (item) => {
        return item.employeeName;
      },
    }),

    createTableColumn<Inventory>({
      columnId: "timestamp",
      compare: (a, b) => {
        return a.positionStartDate.localeCompare(b.positionStartDate);
      },
      renderHeaderCell: () => {
        return "Timestamp";
      },
      renderCell: (item) => {
        return item.positionStartDate;
      },
    }),

    createTableColumn<Inventory>({
      columnId: "actions",
      renderHeaderCell: () => {
        return "Actions";
      },
      renderCell: (item) => {
        return (
          <div className={styles.actionsContainer}>

            <AppWithdrawInventory onItemEditSuccess={handleInventoryCallBack} inventoryId={item.id} itemDataForForm={item} />
            <AppEditInventory onItemEditSuccess={handleInventoryCallBack} inventoryId={item.id} itemDataForForm={item} />
            <AppDeleteInventory onItemDeleteSuccess={handleInventoryCallBack} inventoryId={item.id} />
          </div>
        );
      },
    }),
  ];

  //datagrid fluentUI
  const renderRow: RowRenderer<Inventory[]> = ({ item, rowId }, style) => (
    <DataGridRow<Inventory[]> key={rowId} style={style} >
      {({ renderCell }) => <DataGridCell>{renderCell(item)}</DataGridCell>}
    </DataGridRow>
  );



  //react-router
  const { itemId } = useParams();

  //datagrid fluentUI
  const { targetDocument } = useFluent();
  const scrollbarWidth = useScrollbarWidth({ targetDocument });


  const [inventories, setInventories] = useState<Inventory[]>([]);

  //retrieve item data
  useEffect(() => {
    getInventoriesByItem();
  }, []);

  const getInventoriesByItem = async () => {
    const { data, error, errorMessage } = await getInventoryList(itemId);

    if (error) {
      const obj = JSON.stringify(errorMessage);
      const errMessage = JSON.parse(obj)
      console.log(errMessage);
    }
    if (data) {
      setInventories(data);
    }
  }

  return <>
    <Input
      className={styles.inputFilter}
      contentBefore={<TagSearch24Regular />} />
    <DataGrid
      items={inventories}
      columns={columns}
      getRowId={(item) => item.id}
      sortable
      selectionMode="multiselect"
    >
      <DataGridHeader style={{ paddingRight: scrollbarWidth }}>
        <DataGridRow>
          {({ renderHeaderCell }) => (
            <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
          )}
        </DataGridRow>
      </DataGridHeader>
      <DataGridBody<Inventory[]>
        itemSize={60}
        height={360}>
        {renderRow}
      </DataGridBody>
    </DataGrid>
  </>;
}