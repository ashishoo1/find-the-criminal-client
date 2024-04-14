import React, { useCallback, useEffect, useState } from "react";
import VehicleSelectionPage from "./VehicleSelection";
import "./CitySelectionPage.css";

const CitySelectionPage = () => {
  const [cities, setCities] = useState([]);
  const [cops, setCops] = useState([]);
  const link = 'https://find-the-fugitive-server.onrender.com';
  const fetchCities = async () => {
    const response = await fetch(`${link}/cities`);
    const data = await response.json();
    setCities(data.cities);
  };
  const fetchCops = async () => {
    const response = await fetch(`${link}/cops`);
    const data = await response.json();
    setCops(data.cops);
  };

  useEffect(() => {
    fetchCities();
    fetchCops();
  }, []);

  const [next, setNext] = useState(false);

  const [selectedCities, setSelectedCities] = useState({});

  const handleCitySelect = (cop_name, cityName) => {
    setSelectedCities((prevSelectedCities) => {
      const updatedSelectedCities = { ...prevSelectedCities };
      if (!updatedSelectedCities[cop_name]) {
        let checkInd = Object.entries(updatedSelectedCities).findIndex(([key,value])=>value === cityName)
        if (checkInd === -1) {
          updatedSelectedCities[cop_name] = cityName;
        }else {
          alert("Invalid Selection! city selected for other cop")
        }
      } else {
        alert("you have already made selection for this cop")
        let checkInd = Object.entries(updatedSelectedCities).findIndex(([key,value])=>value === cityName)
        if (checkInd === -1) {
          updatedSelectedCities[cop_name] = cityName;
        } else {
          alert("city selected for other cop")
        }
      }
      return updatedSelectedCities;
    });
  };

  const handleNextClick = useCallback(
    (selectedCities) => {
      if (
        selectedCities &&
        Object.keys(selectedCities).length === cops.length
      ) {
        setNext(true);
      }
    },
    [cops]
  );

  return (
    <>
      {!next && (
        <div className="city-selection-page">
          <h2>City Selection</h2>
          <div className="cop-city-selection">
            {cops &&
              cops.map((cop, index) => (
                <div key={index} className="cop-container">
                  <h2 className="cop-title">Select City for Cop {cop.name}</h2>
                  <div className="city-selection">
                    {cities.map((city) => (
                      <div
                        className={`city-card ${
                          selectedCities &&
                          selectedCities[cop.name] === city.name
                            ? "selected"
                            : ""
                        }`}
                        key={city.id}
                        onClick={() => handleCitySelect(cop.name, city.name)}
                      >
                        <h3>{city.name}</h3>
                        <p>{city.description}</p>
                        <button
                          className="select-button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCitySelect(cop.name, city.name);
                          }}
                        >
                          {selectedCities &&
                          selectedCities[cop.name] === city.name
                            ? "Selected"
                            : "Select"}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
          <button
            className="next-button"
            onClick={() => handleNextClick(selectedCities)}
          >
            Next
          </button>
        </div>
      )}
      {next && <VehicleSelectionPage selectedCities={selectedCities} cops={cops} />}
    </>
  );
};

export default CitySelectionPage;
