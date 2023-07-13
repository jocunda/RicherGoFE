import React from "react";

//styles
import "../../styles/index.scss"
import styles from './styles.module.scss';
// import { useNavigate, useParams } from "react-router-dom";

// import {
//   TableColumnDefinition,
//   createTableColumn,
//   Button,
//   useScrollbarWidth,
//   useFluent,
//   TableCellLayout,
//   Badge,
// } from "@fluentui/react-components";
// import {
//   EditRegular,
//   DeleteRegular,
// } from "@fluentui/react-icons";

// import {
//   DataGridBody,
//   DataGrid,
//   DataGridRow,
//   DataGridHeader,
//   DataGridCell,
//   DataGridHeaderCell,
//   RowRenderer,
// } from '@fluentui-contrib/react-data-grid-react-window';

// // APIs
// import { getItem } from "@mimo/items";
// // types
// import type { Item, GetItemsResponse } from "@mimo/items";

export default function AppItem() {
  // const { id } = useParams()
  // let navigate = useNavigate()

  // function handleBack() {
  //   navigate("/items")
  // }

  return <>
    <div className={styles.itemContainer}>
      <h1>AppItem</h1>

    </div>
  </>;
}