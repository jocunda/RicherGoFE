import React from "react";
import { Button } from "@fluentui/react-components";
import {
  Dismiss24Filled
} from "@fluentui/react-icons";
interface HeaderProps {
  count: number;
  onClear: () => void;
}

const Header = ({ count, onClear }: HeaderProps) => {
  return (
    <>
      <h1>This is Header</h1>
      <div>{count}</div>
      <Button
        icon={<Dismiss24Filled />}
        onClick={onClear}
        size="large"
      >Clear Cart</Button>
    </>
  );
};

export default Header;
