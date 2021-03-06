import "./App.css";
//import du package Axios
import axios from "axios";
import React, { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("useEffect déclenché...");
    const fetchData = async () => {
      const response = await axios.get("http://localhost:3200/");
      setData(response.data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return isLoading ? (
    <div>En cours de chargement...</div>
  ) : (
    <>
      <header>
        {/* NAVIGATION */}
        <div className="navigation">
          <div className="logo"></div>
        </div>

        {/* COVER */}
        <div className="cover-description">
          {/* Cover description */}
          <div className="description">
            <h1>{data.restaurant.name}</h1>
            <p>{data.restaurant.description}</p>
          </div>

          {/* Cover image */}
          <div className="cover-image">
            <img src={data.restaurant.picture} alt="" />
          </div>
        </div>
      </header>

      {/* SECTION */}
      {data.categories.map((mealType, index) => {
        return (
          <section>
            <h1>{mealType.name}</h1>
            {/* {mealType.categories.map((mealType, index) => { */}
            {mealType.meals.map((meals, index) => {
              return (
                <div>
                  <h3 className="dish-title">{meals.title}</h3>
                  <span className="dish-descritpion">{meals.description}</span>
                  <span className="dish-price">{meals.price}</span>
                </div>
              );
            })}
          </section>
        );
      })}
    </>
  );
}

export default App;
