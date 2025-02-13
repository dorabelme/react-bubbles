import React, { useState, useEffect } from "react";
import axios from "axios";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const BubblePage = ({history}) => {
  const [colorList, setColorList] = useState([]);
   // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  const getColors = () => {
    axiosWithAuth()
      .get('http://localhost:5000/api/colors')
      .then(res => {
        console.log(res)
        setColorList(res.data)
      })
      .catch(e => {
        console.log(e.response.data);
        localStorage.removeItem("token");
        history.push("/");
      });
  }
  useEffect(() => {
   getColors()
  }, [history])
 

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} getColors={getColors} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
