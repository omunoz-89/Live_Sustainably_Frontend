import React, { useState, useEffect } from "react";
import axios from "axios";
import { Redirect, Route } from "react-router-dom";


const Garden = (props) => {
  const [plants, setPlants] = useState([]);
  const [data, setData] = useState();
  const id = props.user.id;
  const CONNECTION_URI = process.env.REACT_APP_SERVER_URL;
  console.log(id)

  const handleDelete = async (e) => {
    e.preventDefault();
    const deletePlant = await axios.delete(CONNECTION_URI + `/api/gardens/${e.target._id.value}`)
    setPlants([])
    searchGarden()
}

  const searchGarden = async () => {
    const resp = await axios.get(CONNECTION_URI + `/api/gardens/user/${id}`);
    const data = await resp.data;
    setData(data);
    const plantList = await data.gardens.map((p, idx) =>{
      return (
        <div className="column is-4">
        <div className="card" key={idx}>
  <div className="card-image">
    <figure className="image is-4by3">
      <img src={p.image_url} alt="Placeholder image"/>
    </figure>
  </div>
  <div className="card-content">
    <div className="media">
      <div className="media-content">
        <p className="title is-4" id='plant-name'>{p.name}</p>
        <p className="subtitle is-6">{p.scientific_name}</p>
      </div>
    </div>
  </div>
  <footer class="card-footer">
  <form onSubmit={handleDelete}>
  <input type="text" value={p._id} name="_id" hidden/>
  <div class="control">
  <button class="button is-danger is-light card-footer-item">Delete</button>
  </div>
  </form>
  </footer>
</div>
</div>
      )
    })
    setPlants(plantList)
  };

  if (id === undefined) return <Redirect to='/'></Redirect>
  
  useEffect(() => {
    searchGarden();
  }, []);

  return (
    <div className="columns is-multiline">
    {plants}
    </div>
  );
};
export default Garden;



// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const Garden = (props) => {
//   console.log(props)
//   const CONNECTION_URI = process.env.REACT_APP_SERVER_URL;
//   const searchGarden = async (props) => {
//     const resp = await axios.get(CONNECTION_URI + `/api/gardens/user/${props.user.id}`)
//     console.log(resp)
//   }
//   return (
//     <div className="columns is-multiline">
//     </div>
//   );
// };
// export default Garden;