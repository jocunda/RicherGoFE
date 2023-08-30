import React from "react";


//router
import { useNavigate } from "react-router-dom";

//styles
import "../../styles/index.scss"

//component
import { Button } from "@fluentui/react-components";
import {
  Cart24Regular
} from "@fluentui/react-icons";

// import styles from './styles.module.scss';

export default function AppCartPreview() {

  const navigate = useNavigate();

  return <>
    <div>Your cart is empty</div>
    <Button
      appearance="primary"
      shape="circular"
      onClick={() => navigate("/cart")}
      icon={<Cart24Regular />}>Go to Cart</Button>
  </>;
}