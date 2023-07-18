import React, { useEffect, useState } from "react";

//styles
import "../../styles/index.scss"
import styles from './styles.module.scss';
import { useNavigate, useParams } from "react-router-dom";
import {
  bundleIcon,
  ArrowCircleLeft24Regular,
  ArrowCircleLeft24Filled,
  // DocumentBulletList24Regular
  EditRegular,
  DeleteRegular,
  Edit24Regular,
  AppsAddIn24Regular,
  DocumentAdd24Regular,
  DrawerAdd24Regular,
  Print24Regular,
  DocumentTableArrowRight24Regular,
  DeleteDismiss24Regular,
  // CalendarMonthRegular,
  // CalendarMonthFilled,
  BoxMultiple24Regular,
  BoxMultiple24Filled,
  History24Regular,
  History24Filled,
  Bookmark24Regular,
  Bookmark24Filled
} from "@fluentui/react-icons";

import {
  Badge,
  Image,
  Card,
  CardFooter,
  CardHeader,
  CardPreview,
  Body1,
  TableColumnDefinition,
  createTableColumn,
  Button,
  useScrollbarWidth,
  useFluent,
  TableCellLayout,
  Tab,
  TabList,
  SelectTabData,
  SelectTabEvent,
  TabValue,
  Caption1,
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

const ArrowCircleLeft = bundleIcon(ArrowCircleLeft24Filled, ArrowCircleLeft24Regular);
// const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);
const BoxMultiple24 = bundleIcon(BoxMultiple24Filled, BoxMultiple24Regular);
const History24 = bundleIcon(History24Filled, History24Regular);
const Bookmark24 = bundleIcon(Bookmark24Filled, Bookmark24Regular);

// APIs
import { getItemSingle } from "../../../../packages/items/src/apis";
// types
import type { Item } from "../../../../packages/items/src/types";

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
const renderRow: RowRenderer<Item> = ({ item, rowId }, style) => (
  <DataGridRow<Item> key={rowId} style={style} >
    {({ renderCell }) => <DataGridCell>{renderCell(item)}</DataGridCell>}
  </DataGridRow>
);

const item: Item[] = [
  {
    id: "01",
    value: "gdfdvv",
    code: "4573rdfgdgdg",
    description: "#rete5#gfdgdg",
    deleteable: true,
  },
  {
    id: "02",
    value: "gdfdvcbvcbvv",
    code: "457bvvn3rdfgdgdg",
    description: "#rete5#gfdgdg",
    deleteable: true,
  },
  {
    id: "02",
    value: "gdfdvcbvcbvv",
    code: "457bvvn3rdfgdgdg",
    description: "#rete5#gfdgdg",
    deleteable: true,
  },
  {
    id: "02",
    value: "gdfdvcbvcbvv",
    code: "457bvvn3rdfgdgdg",
    description: "#rete5#gfdgdg",
    deleteable: true,
  },
  {
    id: "02",
    value: "gdfdvcbvcbvv",
    code: "457bvvn3rdfgdgdg",
    description: "#rete5#gfdgdg",
    deleteable: true,
  },
  {
    id: "02",
    value: "gdfdvcbvcbvv",
    code: "457bvvn3rdfgdgdg",
    description: "#rete5#gfdgdg",
    deleteable: true,
  },
  {
    id: "03",
    value: "gdfresrsdvv",
    code: "457bcvbcb3rdfgdgdg",
    description: "#rete5#gfdgdg",
    deleteable: false,
  }];

export default function AppItem() {

  //react-router
  const { itemId } = useParams();
  let navigate = useNavigate();
  function handleBack() {
    navigate("/items")
  }

  //datagrid fluentUI
  const { targetDocument } = useFluent();
  const scrollbarWidth = useScrollbarWidth({ targetDocument });


  const [itemData, setItemData] = useState<Item>();

  //retrieve item data
  useEffect(() => {
    itemDataGet();
  }, []);

  const itemDataGet = async () => {
    const { data, error, errorMessage } = await getItemSingle(itemId);

    if (error) {
      const obj = JSON.stringify(errorMessage);
      const errMessage = JSON.parse(obj)
      console.log(errMessage);
    }
    if (data) {
      setItemData(data);

    }
  }
  const arraySplit = itemData?.description.split("#").filter(Boolean)


  const [selectedValue, setSelectedValue] =
    React.useState<TabValue>("conditions");

  const onTabSelect = (_event: SelectTabEvent, data: SelectTabData) => {
    setSelectedValue(data.value);
  };

  const renderTabs = () => {
    return (
      <>
        <Tab icon={<BoxMultiple24 />} value="inventory">
          Inventory
        </Tab>
        <Tab icon={<Bookmark24 />} value="attribute">
          Attribute
        </Tab>
        <Tab icon={<History24 />} value="history">
          History
        </Tab>
      </>
    );
  };

  const Inventory = React.memo(() => (
    <DataGrid
      items={item}
      columns={columns}
      getRowId={(item) => item.id}
      sortable
      selectionMode="multiselect"
      onSelectionChange={(_e, data) => {
        const selectedArray = Array.from(data.selectedItems);
        const selectedString = selectedArray[0];
        navigate(`/items/${selectedString}`);
      }}
    >
      <DataGridHeader style={{ paddingRight: scrollbarWidth }}>
        <DataGridRow>
          {({ renderHeaderCell }) => (
            <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
          )}
        </DataGridRow>
      </DataGridHeader>
      <DataGridBody<Item>
        itemSize={60}
        height={350}>
        {renderRow}
      </DataGridBody>
    </DataGrid>
  ));

  return <>
    <div className={styles.itemContainer}>
      <Card className={styles.card}>
        <CardHeader
          image={
            <Image
              alt="Erik's avatar"
              bordered
              shape="circular"
              src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/ErikNason.jpg"
              height={200}
              width={200}
            />
          }
          header={
            <Body1>
              <h1>{itemData?.value}</h1>
            </Body1>
          }
          description={
            < Caption1 >
              {arraySplit && arraySplit.map((classify: string) =>
                <Badge
                  size="extra-large"
                  appearance="tint"
                  className={styles.classBadge}>{classify}</Badge>
              )}
              <TabList
                className={styles.tabList}
                defaultSelectedValue=""
                onTabSelect={onTabSelect}
                selectedValue={selectedValue}>
                {renderTabs()}
              </TabList>
            </Caption1>
          }
          action={
            <Button onClick={handleBack} appearance="outline" icon={<ArrowCircleLeft />}>
              Back
            </Button>
          }
        />

        <CardPreview className={styles.previewContainer}>
          <div className={styles.panels}>
            {selectedValue === "inventory" && <Inventory />}
            {selectedValue === "departures" && <Inventory />}
            {selectedValue === "conditions" && <Inventory />}
          </div>
        </CardPreview>

        <CardFooter>
          <Button icon={<Edit24Regular />}>Edit</Button>
          <Button icon={<AppsAddIn24Regular />}>Add Formula</Button>
          <Button icon={<DocumentAdd24Regular />}>Add Inventory</Button>
          <Button icon={<DrawerAdd24Regular />}>Bulk Add Inventory</Button>
          <Button icon={<Print24Regular />}>Print All Inventory</Button>
          <Button icon={<DocumentTableArrowRight24Regular />}>Export Result</Button>
          <Button icon={<DeleteDismiss24Regular />}>Delete</Button>
        </CardFooter>
      </Card>
    </div >
  </>;
}