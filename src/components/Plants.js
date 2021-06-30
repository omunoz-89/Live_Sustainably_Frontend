import React, { useState, useEffect } from "react";
import axios from "axios"

const Plants = (props) => {
  console.log(props)
  const [plants, setPlants] = useState([]);
  const [data, setData] = useState();

  const searchPlants = async () => {
    const resp = await axios.get('http://127.0.0.1:8000/plants');
    const data = await resp.data
    setData(data)
    const plantList = await data.map((p, idx) =>{
      return <p key={idx}>{p.name}</p>
    })
    setPlants(plantList)
  }



  useEffect(() => {
    searchPlants();
  }, []);


  return (
    <div>
    {plants}
    </div>
  );
};
export default Plants;