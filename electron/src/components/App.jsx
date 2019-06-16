import React, { useState, useEffect, useRef } from "react";
import Status from "./Status";
import Selector from "./Selector";
import Labels from "./Labels";
import GoButton from "./GoButton";
import { buildFeatureExtractor } from "../utils/ml5";
import { StatusContext, LabelContext } from "../contexts";

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  height: "800px"
};
const mainStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "210px"
};

function App() {
  const videoEl = useRef(null);
  const [status, setStatus] = useState("status.ready");
  const [labelCount, setLabelCount] = useState(2);
  const [targetLabel, setTargetLabel] = useState(null);
  const [classifier, setClassifier] = useState(null);

  useEffect(() => {
    const setVideo = async () => {
      videoEl.current.srcObject = await navigator.mediaDevices.getUserMedia({
        video: true
      });
      setClassifier(buildFeatureExtractor(videoEl.current));
    };
    setVideo();
  }, []);

  return (
    <StatusContext.Provider
      value={{
        status,
        setStatus
      }}
    >
      <LabelContext.Provider
        value={{
          labelCount,
          setLabelCount,
          targetLabel,
          setTargetLabel
        }}
      >
        <div style={containerStyle}>
          <video ref={videoEl} width="480px" height="360px" autoPlay />
          <div style={mainStyle}>
            <Status />
            <Selector />
            <Labels classifier={classifier} />
            <GoButton classifier={classifier} />
          </div>
        </div>
      </LabelContext.Provider>
    </StatusContext.Provider>
  );
}

export default App;
