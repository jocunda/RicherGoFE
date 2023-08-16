import React from "react";

// Hooks
import {
  useNavigate,
  // useParams
} from "react-router-dom";

//styles
import "../../styles/index.scss"
import styles from './styles.module.scss';

import {
  bundleIcon,
  ArrowCircleLeft24Regular,
  ArrowCircleLeft24Filled,
  // DocumentBulletList24Regular
  // Edit24Regular,
  // AppsAddIn24Regular,
  // DocumentAdd24Regular,
  // DrawerAdd24Regular,
  // Print24Regular,
  // DocumentTableArrowRight24Regular,
  // DeleteDismiss24Regular,
  // BoxMultiple24Regular,
  // BoxMultiple24Filled,
  // History24Regular,
  // History24Filled,
  // Bookmark24Regular,
  // Bookmark24Filled,
  MoreHorizontal20Filled,
  QrCode24Regular,
  Location24Regular,
  Notepad24Regular
} from "@fluentui/react-icons";

import {
  Badge,
  Image,
  Card,
  CardFooter,
  CardHeader,
  CardPreview,
  Body1,
  Button,
  // Tab,
  // TabList,
  // SelectTabData,
  // SelectTabEvent,
  // TabValue,
  Caption1,
  Text
} from "@fluentui/react-components";

const ArrowCircleLeft = bundleIcon(ArrowCircleLeft24Filled, ArrowCircleLeft24Regular);
// const BoxMultiple24 = bundleIcon(BoxMultiple24Filled, BoxMultiple24Regular);
// const History24 = bundleIcon(History24Filled, History24Regular);
// const Bookmark24 = bundleIcon(Bookmark24Filled, Bookmark24Regular);

export default function AppInventories() {

  //react-router
  // const { itemId } = useParams();
  let navigate = useNavigate();
  function handleBack() {
    navigate(`/items/`)
  }

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
              <h1>Whats</h1>
            </Body1>
          }
          description={
            < Caption1 >
              <Badge
                size="extra-large"
                appearance="tint"
                className={styles.classBadge}>No basgde</Badge>
            </Caption1>
          }
          action={
            <Button onClick={handleBack} appearance="outline" icon={<ArrowCircleLeft />}>
              Back
            </Button>
          }
        />

        <CardPreview className={styles.previewContainer}>

        </CardPreview>

        <CardFooter className={styles.buttonContainer}>
          {/* <Button icon={<Edit24Regular />}>Edit</Button>
          <Button icon={<AppsAddIn24Regular />}>Add Formula</Button>
          <Button icon={<DocumentAdd24Regular />}>Add Inventory</Button>
          <Button icon={<DrawerAdd24Regular />}>Bulk Add Inventory</Button>
          <Button icon={<Print24Regular />}>Print All Inventory</Button>
          <Button icon={<DocumentTableArrowRight24Regular />}>Export Result</Button>
          <Button icon={<DeleteDismiss24Regular />}>Delete</Button> */}
        </CardFooter>
      </Card>



      <Card className={styles.card} size="small" role="listitem">
        <CardHeader
          image={<Location24Regular />}
          header={<Text weight="semibold">Position</Text>}
          description={
            <Caption1 className={styles.caption}>
              Koklok
            </Caption1>
          }
          action={
            <Button
              appearance="transparent"
              icon={<MoreHorizontal20Filled />}
            />
          }
        />
      </Card>

      <Card className={styles.card} size="small" role="listitem">
        <CardHeader
          image={< QrCode24Regular />}
          header={<Text weight="semibold">QR Code</Text>}
          action={
            <Button
              appearance="transparent"
              icon={<MoreHorizontal20Filled />}
            />
          }
        />
      </Card>

      <Card className={styles.card} size="small" role="listitem">
        <CardHeader
          image={<Notepad24Regular />}
          header={<Text weight="semibold">Memo</Text>}
          description={
            <Caption1 className={styles.caption}>
              Koklok
            </Caption1>
          }
          action={
            <Button
              appearance="transparent"
              icon={<MoreHorizontal20Filled />}
            />
          }
        />
      </Card>

    </div >
  </>;
}