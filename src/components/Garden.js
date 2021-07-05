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

const handleBack = async (e) => {
  e.preventDefault();
  searchGarden()
};

const handleSave = async (e) => {
  e.preventDefault();
  let payload = {
    id: e.target.id.value,
    name: e.target.name.value,
  }
  try {
    let response = await axios.put(CONNECTION_URI + `/api/gardens/${id}`, payload)
    let { data } = response;
    console.log(data);
  } catch (error) {
    alert("Error occurred, please try again...");
  }
}

const handleUpdate = async (e) => {
  e.preventDefault();
  let id = e.target.id.value
  const getPlant = await axios.get(CONNECTION_URI + `/api/gardens/${id}`)
  console.log(getPlant)
  let plant = getPlant.data.garden[0] 
  setPlants(
    <div>
    <form onSubmit={handleBack}>
    <button id='back-button'><img src="https://img.icons8.com/material-rounded/48/000000/circled-chevron-left.png"/></button>
    </form>
    <form onSubmit={handleSave}>
      <input type="text" name="id" value={plant._id} hidden/>
      <input type="text" name="name" placeholder={plant.name}/>
      <input type="text" name="description" placeholder={ plant.description}/>
      <button className="button is-success">Save</button>
    </form>
      </div>
  )
}

const handleView = async (e) => {
  e.preventDefault();
  let id = e.target.id.value
  const getPlant = await axios.get(CONNECTION_URI + `/api/gardens/${id}`)
  console.log(getPlant)
  let plant = getPlant.data.garden[0]
  setPlants(
    <div>
    <form onSubmit={handleBack}>
    <button id='back-button'><img src="https://img.icons8.com/material-rounded/48/000000/circled-chevron-left.png"/></button>
    </form>
    <div id="plant-show">
        <div className="column is-10 is-offset-1">
        <div className="card">
          <div className="card-image">
            <figure className="image is-4by3">
              <img src={plant.image_url} alt="Placeholder image" />
            </figure>
          </div>
          <div className="card-content">
            <div className="media">
              <div className="media-content">
                <p className="title is-4" id="plant-name">
                  {plant.name}
                </p>
                <p className="subtitle is-6">{plant.scientific_name}</p>
              </div>
            </div>
          </div>
          <div class="plant-content content">
      {plant.description}
      <ul>
      <li>Sun Required: {plant.sun}</li>
      <li>Sowing Mehtod: {plant.sowing_method}</li>
      <li>Row Spacing: {plant.spacing}cm</li>
      </ul>
    </div>
          <footer class="card-footer">
          <form onSubmit={handleUpdate}>
          <input type="text" name='id' value={plant._id} hidden/>
            <button className="button is-info is light">Update</button>
          </form>
          </footer>
        </div>
      </div>
      </div>
      </div>
  )
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
  <footer class="card-footer columns">
  <form onSubmit={handleDelete} className='column is-2'>
  <input type="text" value={p._id} name="_id" hidden/>
  <div class="control">
  <button class="button is-danger is-light card-footer-item">Delete</button>
  </div>
  </form>
  <form onSubmit={handleView} className='column is-2 is-offset-1'>
  <input type="text" value={p._id} name="id" hidden/>
  <div class="control">
  <button class="button is-primary is-light card-footer-item">View</button>
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