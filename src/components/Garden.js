import React, { useState, useEffect } from "react";
import axios from "axios";

const Garden = (props) => {
  const [plants, setPlants] = useState([]);
  const [data, setData] = useState();
  const CONNECTION_URI = process.env.REACT_APP_SERVER_URL;
  const { handleLogout } = props;
  const { exp, id } = props.user;
  const expirationTime = new Date(exp * 1000);
  let currentTime = Date.now();

  if (currentTime >= expirationTime) {
      handleLogout();
      alert('Session has ended. Please login again.');
  }

  const handleDelete = async (e) => {
    e.preventDefault();
    const deletePlant = await axios.delete(
      CONNECTION_URI + `/api/gardens/${e.target._id.value}`
    );
    setPlants([]);
    searchGarden();
  };

  const handleBack = async (e) => {
    e.preventDefault();
    searchGarden();
  };

  const handleSave = async (e) => {
    e.preventDefault();
    let plantImg;
    let plantName;
    let sciName;
    let desc;
    let sunReq;
    let sow;
    let space;
    let newNote;
    if (e.target.image.value === "") {
      plantImg = e.target.image.placeholder;
    } else {
      plantImg = e.target.image.value;
    }
    if (e.target.name.value === "") {
      plantName = e.target.name.placeholder;
    } else {
      plantName = e.target.name.value;
    }
    if (e.target.scientific_name.value === "") {
      sciName = e.target.scientific_name.placeholder;
    } else {
      sciName = e.target.scientific_name.value;
    }
    if (e.target.description.value === "") {
      desc = e.target.description.placeholder;
    } else {
      desc = e.target.description.value;
    }
    if (e.target.sun.value === "") {
      sunReq = e.target.sun.placeholder;
    } else {
      sunReq = e.target.sun.value;
    }
    if (e.target.sowing_method.value === "") {
      sow = e.target.sowing_method.placeholder;
    } else {
      sow = e.target.sowing_method.value;
    }
    if (e.target.spacing.value === "") {
      space = e.target.spacing.placeholder;
    } else {
      space = e.target.spacing.value;
    }
    if (e.target.note.value === "") {
      newNote = null;
    } else {
      newNote = e.target.note.value;
    }
    let payload = {
      id: e.target.id.value,
      image_url: plantImg,
      name: plantName,
      scientific_name: sciName,
      description: desc,
      sun: sunReq,
      sowing_method: sow,
      spacing: space,
      newNote: newNote,
    };
    try {
      let response = await axios.put(
        CONNECTION_URI + `/api/gardens/${id}`,
        payload
      );
      let { data } = response;
      handleView(e);
    } catch (error) {
      alert("Error occurred, please try again...");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    let id = e.target.id.value;
    const getPlant = await axios.get(CONNECTION_URI + `/api/gardens/${id}`);
    let plant = getPlant.data.garden[0];
    setPlants(
      <div>
        <form onSubmit={handleBack}>
          <button id="back-button">
            <img src="https://img.icons8.com/material-rounded/48/000000/circled-chevron-left.png" alt="back_button"/>
          </button>
        </form>
        <div>
          <form id="plant-show" onSubmit={handleSave}>
            <div className="column is-10 is-offset-1">
              <div className="card">
                <div className="card-image">
                  <figure className="image is-4by3">
                    <img src={plant.image_url} alt={plant.name}/>
                  </figure>
                </div>
                <label htmlFor="image">Image URL:</label>
                <textarea
                  id="url"
                  type="text"
                  name="image"
                  placeholder={plant.image_url}
                />
                <div className="card-content">
                  <div className="media">
                    <div className="media-content">
                      <label htmlFor="name">Name:</label>
                      <input
                        type="text"
                        name="name"
                        placeholder={plant.name}
                      ></input>
                      <br />
                      <label htmlFor="scientific_name">Scientific Name:</label>
                      <input
                        type="text"
                        name="scientific_name"
                        placeholder={plant.scientific_name}
                      ></input>
                    </div>
                  </div>
                </div>
                <div>
                  <p>Description</p>
                  <textarea
                    id="desc"
                    type="text"
                    name="description"
                    placeholder={plant.description}
                  ></textarea>
                </div>
                <label htmlFor="sun">Sun Needed:</label>
                <input name="sun" type="text" placeholder={plant.sun}></input>
                <br />
                <label htmlFor="sowing_method">Sowing Mehtod:</label>
                <textarea
                  id="sowing"
                  name="sowing_method"
                  type="text"
                  placeholder={plant.sowing_method}
                ></textarea>
                <br />
                <label htmlFor="spacing">Spacing:</label>
                <input name="spacing" type="text" placeholder={plant.spacing} />
                <br />
                <label htmlFor="note">Add Notes:</label>
                <textarea id="note" type="text" name="note"></textarea>

                <footer className="card-footer">
                  <input type="text" name="id" value={plant._id} hidden />
                  <button className="button is-success">Save</button>
                </footer>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const handleView = async (e) => {
    e.preventDefault();
    let id = e.target.id.value;
    const getPlant = await axios.get(CONNECTION_URI + `/api/gardens/${id}`);
    let plant = getPlant.data.garden[0];
    const noteList = await plant.notes.map((n, idx) => {
      return <li key={idx}>{n}</li>;
    });
    setPlants(
      <div>
        <form onSubmit={handleBack}>
          <button id="back-button">
            <img src="https://img.icons8.com/material-rounded/48/000000/circled-chevron-left.png" alt="back_button" />
          </button>
        </form>
        <div id="plant-show">
          <div className="column is-10 is-offset-1">
            <div className="card">
              <div className="card-image">
                <figure className="image is-4by3">
                  <img src={plant.image_url} alt={plant.name} />
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
              <div className="plant-content content">
                {plant.description}
                <ul>
                  <li>Sun Required: {plant.sun}</li>
                  <li>Sowing Mehtod: {plant.sowing_method}</li>
                  <li>Row Spacing: {plant.spacing}cm</li>
                </ul>
                <h5>Notes:</h5>
                <ul>{noteList}</ul>
              </div>
              <footer className="card-footer">
                <form onSubmit={handleUpdate}>
                  <input type="text" name="id" value={plant._id} hidden />
                  <button className="button is-info is light">Update</button>
                </form>
              </footer>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const searchGarden = async () => {
    const resp = await axios.get(CONNECTION_URI + `/api/gardens/user/${id}`);
    const data = await resp.data;
    setData(data);
    const plantList = await data.gardens.map((p, idx) => {
      return (
        <div className="column is-3">
          <div className="card" key={idx}>
            <div className="card-image">
              <figure className="image is-4by3">
                <img src={p.image_url} alt={p.name} />
              </figure>
            </div>
            <div className="card-content">
              <div className="media">
                <div className="media-content">
                  <p className="title is-4" id="plant-name">
                    {p.name}
                  </p>
                  <p className="subtitle is-6">{p.scientific_name}</p>
                </div>
              </div>
            </div>
            <footer className="card-footer columns">
            <form onSubmit={handleView} className="card-form card-footer-item">
                <input type="text" value={p._id} name="id" hidden />
                <div className="control">
                  <button type='submit' className="card-view button">
                  <p>{''}View{''}</p>
                  </button>
                </div>
              </form>
              <form onSubmit={handleDelete} className="card-form card-footer-item">
                <input type="text" value={p._id} name="_id" hidden />
                <div className="control">
                  <button className="card-del button">
                    Delete
                  </button>
                </div>
              </form>
            </footer>
          </div>
        </div>
      );
    });
    setPlants(plantList);
  };
  
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
