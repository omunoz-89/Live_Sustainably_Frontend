/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";

const Plants = (props) => {
  const [plants, setPlants] = useState(<button className="button is-loading" id="loading" >Loading</button>
  );
  const [search, setSearch] = useState('empty');
  const [searchBar, setSearchBar] = useState();
  const [data, setData] = useState('empty');
  const CONNECTION_URI = process.env.REACT_APP_SERVER_URL;
  const { handleLogout } = props;
  const { exp } = props.user;
  const expirationTime = new Date(exp * 1000);
  let currentTime = Date.now();

  if (currentTime >= expirationTime) {
      handleLogout();
      alert('Session has ended. Please login again.');
  }

  const handleAdd = async (e) => {
    e.preventDefault();
    if(!e.target.sowing_method && !e.target.sun && !e.target.spacing){
      let payload = {
        name: e.target.name.value,
        plant_id: e.target.plant_id.value,
        scientific_name: e.target.scientific_name.value,
        description: e.target.description.value,
        image_url: e.target.image_url.value,
        user_id: props.user.id,
        sowing_method: 'sowing method',
        sun: 'sun needed',
        spacing: 'space needed',
      };
      let url = CONNECTION_URI + "/api/gardens";
      try {
        await axios.post(url, payload);
        // let { data } = response;
      } catch (error) {
        alert("Error occurred, please try again...");
      }
    } else {
    let payload = {
      name: e.target.name.value,
      plant_id: e.target.plant_id.value,
      scientific_name: e.target.scientific_name.value,
      description: e.target.description.value,
      image_url: e.target.image_url.value,
      user_id: props.user.id,
      sowing_method: e.target.sowing_method.value,
      sun: e.target.sun.value,
      spacing: e.target.spacing.value,
    };
    let url = CONNECTION_URI + "/api/gardens";
    try {
      await axios.post(url, payload);
    } catch (error) {
      alert("Error occurred, please try again...");
    }
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    let value = e.target.search.value.split(' ').join('-');
    const resp = await axios.get(
      CONNECTION_URI + `/api/plants/search/${value}`
    );
    const data = await resp.data;
    setSearch(data)
  };

  const handleBack = async (e) => {
    e.preventDefault();
    setSearch('empty')
  };

  const handleView = async (e) => {
    e.preventDefault();
    const resp = await axios.get(
      CONNECTION_URI + `/api/plants/search/${e.target.plant_id.value}`
    );
    const data = await resp.data;
    setData(data);
    setSearch(data)
  };

  const searchB = () => {
    if(search === 'empty'){
      setSearchBar(
        <div className='columns'>
        <div className='column is-10 is-offset-1'>
      <form onSubmit={handleSearch} className="search-bar ">
      <input
          className="input"
          id="search"
          name="search"
          type="text"
          placeholder="Search for plant"
        ></input>
      </form>
      </div>
      </div>)
    } else {
      setSearchBar(
        <div className='columns' >
      <form onSubmit={handleBack} className="search-bar column is-2">
      <button id='back-button'><img src="https://img.icons8.com/material-rounded/48/000000/circled-chevron-left.png" alt="back_button" /></button>
      </form>
        <form onSubmit={handleSearch} className='search-bar column is-9'>
        <input
          className="navbar-item input"
          id="search"
          name="search"
          type="text"
          placeholder="Search for plant"
        ></input>
      </form>
        </div>
      )
    }
  }

  const searchPlants = async () => {
    if (search === 'empty') {
      const resp = await axios.get(CONNECTION_URI + "/api/plants");
      const data = await resp.data;
      setData(data);
      const plantList = await data.map((p, idx) => {
        return (
          <div className="column is-3">
            <div className="card" key={idx}>
              <div className="card-image">
                <figure className="image is-4by3">
                  <img src={p.thumbnail_url} alt={p.name} />
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
              <footer className="card-footer">
                <form onSubmit={handleAdd} className='card-form card-footer-item'>
                  <input type="text" defaultValue={p.name} name="name" hidden />
                  <input type="text" defaultValue={p._id} name="plant_id" hidden />
                  <input
                    type="text"
                    defaultValue={p.scientific_name}
                    name="scientific_name"
                    hidden
                  />
                  <input
                    type="text"
                    defaultValue={p.description}
                    name="description"
                    hidden
                  />
                  <input
                    type="text"
                    defaultValue={p.thumbnail_url}
                    name="image_url"
                    hidden
                  />
                  <div className="control">
                    <button className="card-view button">
                      Add
                    </button>
                  </div>
                </form>
                <form onSubmit={handleView} className='card-form card-footer-item'>
                  <input type="text" defaultValue={p._id} name="plant_id" hidden />
                  <div className="control">
                    <button className="card-view button">
                      View
                    </button>
                  </div>{" "}
                </form>
              </footer>
            </div>
          </div>
        );
      });
      setPlants(plantList);
    
    } else{
      const plant = search.openfarm_data.attributes
        if(plant === undefined){
          setPlants(
            <div id="plant-show">
        <div className="column is-10 is-offset-1">
        <div className="card">
          <div className="card-image">
            <figure className="image is-4by3">
              <img src="https://bulma.io/images/placeholders/1280x960.png" alt='blank_image'/>
            </figure>
          </div>
          <div className="card-content">
            <div className="media">
              <div className="media-content">
                <p className="title is-4" id="plant-name">
                  {search.name}
                </p>
              </div>
            </div>
            <div className="plant-content content">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Tempore dolorum excepturi, pariatur dolore fuga perferendis 
                mollitia deserunt a voluptas assumenda! Consequatur beatae qui 
                dolorem tempora possimus accusantium, fugit eius quidem?
            </p>
            </div>
          </div>
          <footer className="card-footer">
          </footer>
        </div>
      </div>
      </div>
          )
        } else {
      
      setPlants(
        <div id="plant-show">
        <div className="column is-10 is-offset-1">
        <div className="card">
          <div className="card-image">
            <figure className="image is-4by3">
              <img src={plant.main_image_path} alt={plant.name} />
            </figure>
          </div>
          <div className="card-content">
            <div className="media">
              <div className="media-content">
                <p className="title is-4" id="plant-name">
                  {plant.name}
                </p>
                <p className="subtitle is-6">{plant.binomial_name}</p>
              </div>
            </div>
          </div>
          <div className="plant-content content">
      {plant.description}
      <ul>
      <li>Sun Required: {plant.sun_requirements}</li>
      <li>Sowing Mehtod: {plant.sowing_method}</li>
      <li>Row Spacing: {plant.row_spacing}cm</li>
      </ul>
    </div>
          <footer className="card-footer">
            <form onSubmit={handleAdd}>
              <input type="text" defaultValue={plant.name} name="name" hidden />
              <input type="text" defaultValue={data.id} name="plant_id" hidden />
              <input
                type="text"
                defaultValue={plant.binomial_name}
                name="scientific_name"
                hidden
              />
              <input
                type="text"
                defaultValue={plant.description}
                name="description"
                hidden
              />
              <input
                type="text"
                defaultValue={plant.main_image_path}
                name="image_url"
                hidden
              />
              <input
                type="text"
                defaultValue={plant.sowing_method}
                name="sowing_method"
                hidden
              />
              <input
                type="text"
                defaultValue={plant.sun_requirements}
                name="sun"
                hidden
              />
              <input
                type="text"
                defaultValue={plant.row_spacing}
                name="spacing"
                hidden
              />
              <div className="control">
                <button className="button is-success is-light card-footer-item">
                  Add
                </button>
              </div>
            </form>
          </footer>
        </div>
      </div>
      </div>
      )
        }
    }
  };

  useEffect(() => {
    searchPlants();
    searchB()
  }, [search]);

  return (
    <div>
      {searchBar}
      <div className="columns is-multiline">{plants}
      </div>
    </div>
  );
};
export default Plants;
