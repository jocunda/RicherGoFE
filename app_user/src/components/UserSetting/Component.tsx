import React from "react";

import { useLoaderData } from "react-router-dom";


import "../../styles/index.scss"
// import styles from './styles.module.scss';


export default function UserSetting() {



  //router things
  const data = useLoaderData();
  console.log('userSetting data: ', data);


  return <>
    <h1>User Setting</h1>
  </>
};