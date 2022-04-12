/* global AFRAME, THREE */

import React, { PureComponent } from "react";
import "./videoPlayer.css";
import "aframe";

// HACKS to save some time
var self;
let index = 0;
var vrMode = false;

class VideoPlayer extends PureComponent {
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
        const skipClickCount = 4;

        this.el.addEventListener("click", function (evt) {
          // HACK skipping first 5*2 events as I am not sure why they are here getting called.
          if (index >= skipClickCount) {
            // Show Ui component if VR mode is off
            self.props.showInfo(evt.target.id);
            console.log("clicked");
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
            if (evt.target.id === "close-info-btn") {
              // Hide the info panel and button
              document
                .querySelector("#video-detail")
                .setAttribute("opacity", 0);
              document
                .querySelector("#close-info-btn")
                .setAttribute("opacity", 0);
              return;
            }
            document.querySelector("#video-detail").setAttribute("opacity", 1);
            document
              .querySelector("#close-info-btn")
              .setAttribute("opacity", 1);
          } else {
            console.log("index :" + index);
            index++;
          }
        });
      },
    });

    /* global AFRAME */
    AFRAME.registerComponent("play-on-click", {
      init: function () {
        this.onClick = this.onClick.bind(this);
      },
      play: function () {
        window.addEventListener("click", this.onClick);
      },
      pause: function () {
        window.removeEventListener("click", this.onClick);
      },
      onClick: function (evt) {
        var videoEl = this.el.getAttribute("material").src;
        if (!videoEl) {
          return;
        }
        this.el.object3D.visible = true;
        videoEl.play();
      },
    });

    AFRAME.registerComponent("hide-on-play", {
      schema: { type: "selector" },
      init: function () {
        this.onPlaying = this.onPlaying.bind(this);
        this.onPause = this.onPause.bind(this);
        this.el.object3D.visible = !this.data.playing;
      },
      play: function () {
        if (this.data) {
          this.data.addEventListener("playing", this.onPlaying);
          this.data.addEventListener("pause", this.onPause);
        }
      },
      pause: function () {
        if (this.data) {
          this.data.removeEventListener("playing", this.onPlaying);
          this.data.removeEventListener("pause", this.onPause);
        }
      },
      onPlaying: function (evt) {
        this.el.object3D.visible = false;
      },
      onPause: function (evt) {
        this.el.object3D.visible = true;
      },
    });
  }
  onSceneLoad = () => {
    document.querySelector("a-scene").addEventListener("exit-vr", function () {
      vrMode = false;
      document
        .querySelector("a-camera")
        .removeChild(document.querySelector("a-camera").childNodes[1]); // HACK first entity is button to play
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
        <a-scene background="color: #FAFAFA" class="frame">
          <a-image
            id="360 Video"
            class="cursor-listener"
            cursor-listener
            src="url(./info.png)"
            cursor="fuse: true; fuseTimeout: 500"
            height="0.3"
            width="0.3"
            position="0 3 -3.7"
            show-on-click
          ></a-image>
          <a-entity
            cursor="fuse: true; rayOrigin: mouse"
            raycaster="objects: .cursor-listener"
          ></a-entity>

          <a-assets>
            <video id="video" loop src="sample.mp4"></video>
          </a-assets>
          <a-videosphere
            rotation="0 -90 0"
            src="#video"
            play-on-click
          ></a-videosphere>

          <a-image
            src="url(./Youtube.png)"
            id="video-detail"
            cursor="fuse: true; fuseTimeout: 500"
            opacity="0"
            height="2.5"
            position="1.1 2 -3.7"
          ></a-image>
          <a-image
            class="cursor-listener"
            cursor-listener
            src="url(./close.png)"
            opacity="0"
            id="close-info-btn"
            cursor="fuse: true; fuseTimeout: 500"
            position="1.6 3.2 -3.6"
            height="0.15"
            width="0.15"
          ></a-image>

          <a-camera>
            <a-entity
              position="0 0 -1.5"
              text="align:center;
                width:6;
                wrapCount:100;
                color: white;
                value: Click or tap to start video"
              hide-on-play="#video"
            ></a-entity>
          </a-camera>
        </a-scene>
      </div>
    );
  }
}
export default VideoPlayer;
