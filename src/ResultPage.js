import React, { useCallback, useEffect, useState } from "react";
import "./ResultPage.css";
const ResultPage = (props) => {
  const [captureResult, setCaptureResult] = useState("");
  const link = 'https://find-the-fugitive-server.onrender.com';
  const handleCapture = useCallback(async () => {
    const captureResults = [];

    for (const selectedCop of props.cops) {
      const response = await fetch(`${link}/capture`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          copCity: props.selectedCities[selectedCop.name],
          copVehicle: props.selectedVehicles[selectedCop.name],
        }),
      });
      const data = await response.json();
      captureResults.push(data);
    }

    const successfulCapture = captureResults.find((result) => result.success);

    if (successfulCapture) {
      setCaptureResult(successfulCapture);
    } else {
      setCaptureResult({ success: false });
    }
  },[props.cops, props.selectedCities, props.selectedVehicles]);
  useEffect(() => {
    handleCapture();
  }, [handleCapture]);
  console.log(captureResult)
  return (
    <>
    <div className="result-container">
      <h2 className="result-heading">Result</h2>
      {captureResult && captureResult.success && captureResult.capturingCop ? (
        <div className="result-success">
          <p className="result-message">{captureResult.capturingCop.name} caught the fugitive!</p>
        </div>
      ) : captureResult && !captureResult.success && (
        <div className="result-failure">
          <p className="result-message">No cop was able to capture the fugitive.</p>
        </div>
      )}
    </div>
    </>
  );
};

export default ResultPage;
