/* global AFRAME, THREE */

import React, { PureComponent } from "react";
import "antd/dist/antd.css";
import "./home.css";
import { Card, Col, Row } from "antd";
const { Meta } = Card;

var self;
let index = 0;
var vrMode = false;

class Home extends PureComponent {
  constructor(props) {
    super(props);
    self = this;
  }

  componentDidMount() {
    index = 0;
    document
      .querySelector("a-scene")
      .addEventListener("loaded", this.onSceneLoad);

    AFRAME.registerComponent("cursor-listener-home", {
      init: function () {
        const skipClickCount = 4;

        this.el.addEventListener("click", function (evt) {
          // HACK skipping first 5*2 events as I am not sure why they are here getting called.
          if (index >= skipClickCount) {
            // Show Ui component if VR mode is off
            self.props.loadViewPort(evt.target.id);
          } else {
            console.log("index :" + index);
            index++;
          }
        });

        this.el.addEventListener("mouseenter", function (evt) {
          // HACK skipping first 5*2 events as I am not sure why they are here getting called.
          if (!vrMode) {
            return;
          }

          if (index >= skipClickCount) {
            self.props.loadViewPort(evt.target.id);
          } else {
            console.log("index :" + index);
            index++;
          }
        });
      },
    });
  }
  onSceneLoad = () => {
    document.querySelector("a-scene").addEventListener("exit-vr", function () {
      vrMode = false;
      document
        .querySelector("a-camera")
        .removeChild(document.querySelector("a-camera").childNodes[0]);
    });
    document.querySelector("a-scene").addEventListener("enter-vr", function () {
      vrMode = true;
      // Add cursor to pick entity at runtime
      var el = document.createElement("a-cursor");
      document.querySelector("a-camera").appendChild(el);
    });
  };

  render() {
    return (
      <div>
        <a-scene
          background="color: #FAFAFA"
          loading-screen="dotsColor: red; backgroundColor: black"
          class="frame"
        >
          {/* Home start here */}

          <a-image
            class="cursor-listener-home"
            cursor-listener-home
            src="url(./skeleton.png)"
            id="1"
            cursor="fuse: true; fuseTimeout: 500"
            height="2"
            width="2"
            position="2 1.5 -3.7"
          ></a-image>

          <a-image
            class="cursor-listener-home"
            cursor-listener-home
            src="url(./videoport.png)"
            id="2"
            cursor="fuse: true; fuseTimeout: 500"
            height="2"
            width="2"
            position="-2 1.5 -3.7"
          ></a-image>

          {/* Home ends here */}

          <a-entity
            cursor="fuse: true; rayOrigin: mouse"
            raycaster="objects: .cursor-listener-home"
          ></a-entity>
          <a-camera></a-camera>
        </a-scene>
      </div>
    );
  }
}
export default Home;
