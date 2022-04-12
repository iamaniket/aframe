/* global AFRAME, THREE */

import React, { PureComponent } from "react";
import "antd/dist/antd.css";
import { Card } from "antd";
import "./ui.css";

function InfoPanel(props) {
  return (
    <div>
      <Card
        className="panel"
        title={props.title}
        bordered={false}
        style={{ width: 300 }}
      >
        <h4>{props.detail}</h4>
        <p>{props.moreDetail}</p>
      </Card>
    </div>
  );
}
export default InfoPanel;
