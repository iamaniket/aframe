/* global AFRAME, THREE */

import React, { PureComponent } from "react";
import InfoPanel from "./InfoPanel";
import { Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import "./ui.css";
import { bodyDetails, bodyHeadings, parts } from "../../Utility";

function BodyInfo(props) {
  const bodyPart = props.part;

  const index = parts.indexOf(bodyPart);
  const detail =
    bodyHeadings.length > index ? bodyHeadings[index] : "Unknown body part";
  const moreDetail =
    bodyDetails.length > index
      ? bodyDetails[index]
      : "Unknown body part details";

  return (
    <div>
      <Button
        shape="circle"
        className="close-button"
        icon={<CloseOutlined />}
        onClick={props.onClose}
      ></Button>
      <InfoPanel title={bodyPart} detail={detail} moreDetail={moreDetail} />
    </div>
  );
}
export default BodyInfo;
