/* global AFRAME, THREE */

import React, { PureComponent } from "react";
import "./skeleton.css";
import "aframe";

// HACKS to save some time
var self;
let index = 0;
var vrMode = true;

class Skeleton extends PureComponent {
  constructor(props) {
    super(props);
    self = this;
  }

  componentDidMount() {
    document
      .querySelector("a-scene")
      .addEventListener("loaded", this.onSceneLoad);

    AFRAME.registerComponent("cursor-listener", {
      init: function () {
        const skipClickCount = 8;

        this.el.addEventListener("click", function (evt) {
          // HACK skipping first 4*2 events as I am not sure why they are here getting called.
          if (index >= skipClickCount) {
            if (vrMode) {
              // SHOW updated image info in vr mode using a image
              document
                .querySelector("#body-detail")
                .setAttribute("src", "url(./" + evt.target.id + ".png)");

              document.querySelector("#body-detail").setAttribute("opacity", 1);
            } else {
              // Show Ui component if VR mode is off
              self.props.showBodyInfo(evt.target.id);
            }
          } else {
            console.log("index :" + index);
            index++;
          }
        });
      },
    });
  }
  onSceneLoad = () => {
    document.querySelector("a-scene").addEventListener("enter-vr", function () {
      vrMode = true;
    });
  };
  render() {
    return (
      <div>
        <a-scene
          embedded
          background="color: #FAFAFA"
          loading-screen="dotsColor: red; backgroundColor: black"
          class="frame"
        >
          <a-image
            class="cursor-listener"
            cursor-listener
            src="url(./m_1.png)"
            id="Head"
            cursor="fuse: true; fuseTimeout: 500"
            height="0.15"
            width="0.15"
            position="0 3 -3.7"
          ></a-image>

          {
            <a-image
              src="url(./head.png)"
              id="body-detail"
              cursor="fuse: true; fuseTimeout: 500"
              opacity="0"
              height="2.5"
              position="1.1 2 -3.7"
            ></a-image>
          }

          <a-entity
            cursor="rayOrigin: mouse"
            raycaster="objects: .cursor-listener"
          ></a-entity>
          <a-entity gltf-model="url(./scene.gltf)" position="0 2 -4"></a-entity>
          <a-image
            class="cursor-listener"
            cursor-listener
            src="url(./m_2.png)"
            id="Neck"
            cursor="fuse: true; fuseTimeout: 500"
            height="0.15"
            width="0.15"
            position="0 2.7 -3.7"
          ></a-image>
          <a-image
            class="cursor-listener"
            cursor-listener
            src="url(./m_3.png)"
            cursor="fuse: true; fuseTimeout: 500"
            height="0.15"
            id="Rib"
            width="0.15"
            position="-0.25 2.5 -3.7"
          ></a-image>
          <a-image
            class="cursor-listener"
            cursor-listener
            src="url(./m_4.png)"
            id="Hand"
            cursor="fuse: true; fuseTimeout: 500"
            height="0.15"
            width="0.15"
            position="0.5 1.5 -3.9"
          ></a-image>
        </a-scene>
      </div>
    );
  }
}
export default Skeleton;