/* global AFRAME, THREE */

import React, { PureComponent, useState } from "react";
import Skeleton from "./components/frame/skeleton/Skeleton";
import BodyInfo from "./components/UI/BodyInfo";
import "./styles.css";
import "aframe";
function App() {
  const [body, setBody] = useState("");

  const showBodyInfo = function (part) {
    setBody(part);
  };

  const closeBodyInfo = function () {
    setBody("");
  };

  return (
    <div>
      <div className="bodyInfo">
        {body.length > 0 ? (
          <BodyInfo part={body} onClose={closeBodyInfo}></BodyInfo>
        ) : (
          <span />
        )}
      </div>
      <Skeleton showBodyInfo={showBodyInfo} />
    </div>
  );
}
export default App;
