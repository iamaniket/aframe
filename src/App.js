/* global AFRAME, THREE */

import React, { PureComponent, useState } from "react";
import Skeleton from "./components/frame/skeleton/Skeleton";
import InfoWrapper from "./components/UI/InfoWrapper";
import VideoPlayer from "./components/frame/video360/VideoPlayer";
import "./styles.css";
import "aframe";
function App() {
  const [info, setInfo] = useState("");
  const [bodyInfo, setBodyInfo] = useState(false);
  const [videoInfo, setVideoInfo] = useState(false);

  const showBodyInfo = function (part) {
    setInfo(part);
    setBodyInfo(true);
  };

  const showVideoInfo = function (part) {
    setVideoInfo(true);
    setInfo(part);
  };

  const closeInfo = function () {
    setInfo("");
    setBodyInfo(false);
    setVideoInfo(false);
  };

  return (
    <div>
      <div className="info">
        {bodyInfo || videoInfo ? (
          <InfoWrapper
            part={info}
            isVideo={videoInfo}
            onClose={closeInfo}
          ></InfoWrapper>
        ) : (
          <span />
        )}
      </div>
      {/* {<Skeleton showInfo={showBodyInfo} />} */}
      {/* {<VideoPlayer showInfo={showVideoInfo} />} */}
    </div>
  );
}
export default App;
