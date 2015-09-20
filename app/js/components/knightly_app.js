import $ from "jquery"
import React from "react"

export default class KnightlyApp extends React.Component {
  componentDidMount() {
    let $window = $(window);
    let $topBarContainer = $("#top-bar-container");
    let $bottomBarContainer = $("#bottom-bar-container");

    function onResize() {
      let bottomHeight = $window.height() - $topBarContainer.height();
      $bottomBarContainer.height(bottomHeight);
    }

    onResize();
    $window.resize(onResize);
  }

  render() {
    return (
      <div id="knightly-app" className="container-fluid">

        <div id="top-bar-container" className="row">
          <div className="logo-box"></div>
        </div>

        <div id="bottom-bar-container" className="row">
          <div id="map-container" className="col-xs-9">
          </div>
          <div id="right-menu-container" className="col-xs-3">
          </div>
        </div>

        <canvas id="profile-marker-drawing-board"></canvas>
      </div>
    );
  }
}
