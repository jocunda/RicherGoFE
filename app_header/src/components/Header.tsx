import React from "react";

interface HeaderProps {
  count: number;
  onClear: () => void;
}

const Header = ({ count, onClear }: HeaderProps) => {
  return (
    <>
      <h1>This is Header</h1>
      <div>{count}</div>
      <button onClick={onClear}>Clear Cart</button>
    </>
  );
};

export default Header;
