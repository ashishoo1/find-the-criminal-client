import React from "react";

const CopVehicleCard = ({ copName, vehicles, onSelect }) => {
  return (
    <div className="cop-vehicle-card">
      <h3>{copName}</h3>
      <select onChange={(e) => onSelect(e.target.value)}>
        <option value="">Select Vehicle</option>
        {vehicles.map((vehicle, index) => (
          <option key={index} value={index} disabled = {vehicle.selected}>
            {vehicle.kind} - Range: {vehicle.range} km
          </option>
        ))}
      </select>
    </div>
  );
};

export default CopVehicleCard;
