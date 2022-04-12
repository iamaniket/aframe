/* global AFRAME, THREE */

import React, { PureComponent } from "react";
import InfoPanel from "./InfoPanel";
import { Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import "./ui.css";
import {
  bodyDetails,
  bodyHeadings,
  parts,
  videoInfo,
  videoLink,
} from "../../Utility";

function InfoWrapper(props) {
  var detail = "";
  var moreDetail = "";
  const title = props.part;
  if (!props.isVideo) {
    const index = parts.indexOf(props.part);
    detail =
      bodyHeadings.length > index ? bodyHeadings[index] : "Unknown body part";
    moreDetail =
      bodyDetails.length > index
        ? bodyDetails[index]
        : "Unknown body part details";
  } else {
    detail = videoLink;
    moreDetail = videoInfo;
  }

  return (
    <div>
      <Button
        shape="circle"
        className="close-button"
        icon={<CloseOutlined />}
        onClick={props.onClose}
      ></Button>
      <InfoPanel title={title} detail={detail} moreDetail={moreDetail} />
    </div>
  );
}
export default InfoWrapper;
