import React from "react";

//styles
import "../../styles/index.scss"
import styles from './styles.module.scss';

//component
import {
  Caption1,
  Checkbox,
  Text,
  Card,
  CardHeader,
} from "@fluentui/react-components";

const resolveAsset = (asset: string) => {
  const ASSET_URL =
    "https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/assets/";

  return `${ASSET_URL}${asset}`;
};

export default function AppCart() {

  const [selected3, setSelected3] = React.useState(false);
  const [selected4, setSelected4] = React.useState(false);

  interface StateType {
    selected: boolean;
    checked: boolean;
  }

  const setCheckboxState = React.useCallback(
    ({ selected, checked }: StateType, setFn: React.Dispatch<React.SetStateAction<boolean>>) => setFn(!!(selected || checked)),
    []
  );

  const onSelected3Change = React.useCallback(
    (_: React.ChangeEvent<HTMLInputElement>, state: StateType) => setCheckboxState(state, setSelected3),
    [setCheckboxState]
  );
  const onSelected4Change = React.useCallback(
    (_: React.ChangeEvent<HTMLInputElement>, state: StateType) => setCheckboxState(state, setSelected4),
    [setCheckboxState]
  );

  return <>
    <div className={styles.row}>
      <Card
        className={styles.card}
        selected={selected3}
        onSelectionChange={onSelected3Change}
        floatingAction={
          <Checkbox onChange={onSelected3Change} checked={selected3} />
        }
      >
        <CardHeader
          image={
            <img src={resolveAsset("docx.png")} alt="Microsoft Word Logo" />
          }
          header={<Text weight="semibold">Secret Project Briefing</Text>}
          description={
            <Caption1 className={styles.caption}>
              OneDrive &gt; Documents
            </Caption1>
          }
        />
      </Card>

      <Card
        className={styles.card}
        selected={selected4}
        onSelectionChange={onSelected4Change}
        floatingAction={
          <Checkbox onChange={onSelected4Change} checked={selected4} />
        }
      >
        <CardHeader
          image={
            <img src={resolveAsset("xlsx.png")} alt="Microsoft Excel Logo" />
          }
          header={<Text weight="semibold">Team Budget</Text>}
          description={
            <Caption1 className={styles.caption}>
              OneDrive &gt; Spreadsheets
            </Caption1>
          }
        />
      </Card>
    </div>
  </>;
}