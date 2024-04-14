import React, { useState, useEffect } from "react";
import CopVehicleCard from "./CopVehicleCard";
import ResultPage from "./ResultPage";
import "./VehicleSelection.css";

const VehicleSelectionPage = (props) => {
  const [selectedVehicles, setSelectedVehicles] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [next, setNext] = useState(false);
  const link = 'https://find-the-fugitive-server.onrender.com';
  const fetchVehicles = async () => {
    const response = await fetch(`${link}/vehicles`);
    const data = await response.json();
    const finalData = [];
    data.vehicles.forEach((element) => {
      let count = element.count;
      while (count !== 0) {
        finalData.push({ ...element });
        count--;
      }
    });
    setVehicles(finalData);
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleVehicleSelect = (index, copName) => {
    setSelectedVehicles((prevSelectedVehicles) => ({
      ...prevSelectedVehicles,
      [copName]: vehicles[index].kind,
    }));
    setVehicles((prevVehicles) => {
      let updateVehicle = [...prevVehicles]
      updateVehicle[index].selected = true;
      return updateVehicle;
    });
  };

  const handleNextClick = () => {
    if (Object.keys(selectedVehicles).length === 3) {
      setNext(true)
    } else {
      alert("Please select a vehicle for each cop.");
    }
  };

  return (
    <>
    {!next&&<div className="vehicle-selection-page">
      <h2>Select Vehicle Options for Each Cop</h2>
      <div className="cop-vehicle-selection">
        <div className="cop-vehicle-selection">
          {vehicles && vehicles.length && props.cops ?
            props.cops.map((cop, index) => (
              <div key={index} className="cop-container">
                <div className="vehicle-selection">
                  <CopVehicleCard
                    key={index}
                    copName={cop.name}
                    vehicles={vehicles}
                    onSelect={(vehicleKind) =>
                      handleVehicleSelect(vehicleKind, cop.name)
                    }
                  />
                </div>
              </div>
            )) : "Loading..."}
        </div>
      </div>
      <button className="next-button" onClick={handleNextClick}>Next</button>
    </div>}
    {next && <ResultPage cops={props.cops} selectedCities = {props.selectedCities} selectedVehicles={selectedVehicles} />}
    </>
  );
};

export default VehicleSelectionPage;
