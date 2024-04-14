import React, { useCallback, useState } from "react";
import "./LandingPage.css";
import CitySelectionPage from "./CitySelectionPage";

const LandingPage = () => {
  const [next, setNext] = useState(false);
  const handleStartClick = useCallback(() => {
    setNext(true);
  }, []);

  return (
    <>
      {" "}
      {!next && (
        <div className="landing-page-container">
          <div className="landing-page-content">
            <h1 className="landing-page-heading">
              Welcome to the Fugitive Hunt
            </h1>
            <p className="landing-page-text">
              Help the fearless cops capture the notorious escape artist!
            </p>
            <div className="landing-page-button" onClick={handleStartClick}>
              Start
            </div>
          </div>
        </div>
      )}
      <>{next && <CitySelectionPage />}</>
      
    </>
  );
};

export default LandingPage;
