import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

const Plants = (props) => {
  console.log(props);
  const [plants, setPlants] = useState(<button className="button is-loading" id="loading" >Loading</button>
  );
  const [search, setSearch] = useState('empty');
  const [searchBar, setSearchBar] = useState();
  console.log(search);
  const [data, setData] = useState('empty');
  const CONNECTION_URI = process.env.REACT_APP_SERVER_URL;

  const handleAdd = async (e) => {
    e.preventDefault();
    console.log(e.target)
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
      console.log(payload);
      let url = CONNECTION_URI + "/api/gardens";
      try {
        let response = await axios.post(url, payload);
        let { data } = response;
        console.log(data);
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
    console.log(payload);
    let url = CONNECTION_URI + "/api/gardens";
    try {
      let response = await axios.post(url, payload);
      let { data } = response;
      console.log(data);
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
    console.log(e.target.plant_id.value)
    const resp = await axios.get(
      CONNECTION_URI + `/api/plants/search/${e.target.plant_id.value}`
    );
    const data = await resp.data;
    setData(data);
    setSearch(data)
    console.log(data);
  };

  const searchB = () => {
    if(search === 'empty'){
      setSearchBar(
        <div className='columns'>
        <div className='column is-10 is-offset-1'>
      <form onSubmit={handleSearch} class="search-bar ">
      <input
          class="input"
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
      <form onSubmit='handleBack' class="search-bar column is-2">
      <button id='back-button'><img src="https://img.icons8.com/material-rounded/48/000000/circled-chevron-left.png"/></button>
      </form>
        <form onSubmit={handleSearch} className='search-bar column is-9'>
        <input
          class="navbar-item input"
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
      console.log(data)
      const plantList = await data.map((p, idx) => {
        return (
          <div className="column is-3">
            <div className="card" key={idx}>
              <div className="card-image">
                <figure className="image is-4by3">
                  <img src={p.thumbnail_url} alt="Placeholder image" />
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
              <footer class="card-footer">
                <form onSubmit={handleAdd} className='card-form card-footer-item'>
                  <input type="text" value={p.name} name="name" hidden />
                  <input type="text" value={p._id} name="plant_id" hidden />
                  <input
                    type="text"
                    value={p.scientific_name}
                    name="scientific_name"
                    hidden
                  />
                  <input
                    type="text"
                    value={p.description}
                    name="description"
                    hidden
                  />
                  <input
                    type="text"
                    value={p.thumbnail_url}
                    name="image_url"
                    hidden
                  />
                  <div class="control">
                    <button class="card-view button">
                      Add
                    </button>
                  </div>
                </form>
                <form onSubmit={handleView} className='card-form card-footer-item'>
                  <input type="text" value={p._id} name="plant_id" hidden />
                  <div class="control">
                    <button class="card-view button">
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
              <img src="https://bulma.io/images/placeholders/1280x960.png"/>
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
            <div class="plant-content content">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Tempore dolorum excepturi, pariatur dolore fuga perferendis 
                mollitia deserunt a voluptas assumenda! Consequatur beatae qui 
                dolorem tempora possimus accusantium, fugit eius quidem?
            </p>
            </div>
          </div>
          <footer class="card-footer">
          </footer>
        </div>
      </div>
      </div>
          )
        } else {
      
      console.log(plant)
      setPlants(
        <div id="plant-show">
        <div className="column is-10 is-offset-1">
        <div className="card">
          <div className="card-image">
            <figure className="image is-4by3">
              <img src={plant.main_image_path} alt="Placeholder image" />
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
          <div class="plant-content content">
      {plant.description}
      <ul>
      <li>Sun Required: {plant.sun_requirements}</li>
      <li>Sowing Mehtod: {plant.sowing_method}</li>
      <li>Row Spacing: {plant.row_spacing}cm</li>
      </ul>
    </div>
          <footer class="card-footer">
            <form onSubmit={handleAdd}>
              <input type="text" value={plant.name} name="name" hidden />
              <input type="text" value={data.id} name="plant_id" hidden />
              <input
                type="text"
                value={plant.binomial_name}
                name="scientific_name"
                hidden
              />
              <input
                type="text"
                value={plant.description}
                name="description"
                hidden
              />
              <input
                type="text"
                value={plant.main_image_path}
                name="image_url"
                hidden
              />
              <input
                type="text"
                value={plant.sowing_method}
                name="sowing_method"
                hidden
              />
              <input
                type="text"
                value={plant.sun_requirements}
                name="sun"
                hidden
              />
              <input
                type="text"
                value={plant.row_spacing}
                name="spacing"
                hidden
              />
              <div class="control">
                <button class="button is-success is-light card-footer-item">
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
