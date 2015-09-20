import $ from "jquery"
import React from "react"
import Router from "react-router"

import Feed from "./feed"
import Incidents from "./incidents"
import Stats from "./stats"

let DefaultRoute = Router.DefaultRoute;
let Link = Router.Link;
let Route = Router.Route;
let RouteHandler = Router.RouteHandler;
let firstTimeInitCb = null;

class KnightlyApp extends React.Component {
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

    firstTimeInitCb && firstTimeInitCb();
  }

  render() {
    return (
      <div id="knightly-app" className="container-fluid">

        <div id="top-bar-container" className="row">
          <div className="col-xs-9 left-part">
            <Link className="logo-button" to="feed">
              <img src={require("../../images/logo.png")} />
            </Link>

            <div className="brand-name">Knightly</div>

            <Link className="header-button" to="stats">
              <div className="glyphicon glyphicon glyphicon-stats"></div>
            </Link>
            <Link className="header-button" to="incidents">
              <div className="glyphicon glyphicon-exclamation-sign"></div>
            </Link>
            <Link className="header-button" to="feed">
              <div className="glyphicon glyphicon-time"></div>
            </Link>
          </div>
        </div>

        <div id="bottom-bar-container" className="row">
          <div id="map-container" className="col-xs-9">
          </div>
          <div id="right-menu-container" className="col-xs-3">
            <RouteHandler />
          </div>
        </div>

        <canvas id="profile-marker-drawing-board"></canvas>
      </div>
    );
  }
}

let routes = (
  <Route name="app" path="/" handler={KnightlyApp}>
    <Route name="feed" handler={Feed} />
    <Route name="incidents" handler={Incidents} />
    <Route name="stats" handler={Stats} />
    <DefaultRoute handler={Feed} />
  </Route>
);

export function initAppView(mountEl, firstTimeCb) {
  firstTimeInitCb = firstTimeCb;

  Router.run(routes, function (Handler) {
    React.render(<Handler/>, mountEl);
  });
}
