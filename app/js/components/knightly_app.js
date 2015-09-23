import $ from "jquery"
import React from "react"
import Router from "react-router"

import { Modal } from 'react-bootstrap';

import Feed from "./feed"
import Incidents from "./incidents"
import Stats from "./stats"

import DeviceUserStore from "../stores/device_user_store"
import DeviceUserActions from "../actions/device_user_actions"

let DefaultRoute = Router.DefaultRoute;
let Link = Router.Link;
let Route = Router.Route;
let RouteHandler = Router.RouteHandler;
let Redirect = Router.Redirect;
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

  update() {
    this.forceUpdate();
  }

  componentWillMount() {
    DeviceUserStore.listen(this.update.bind(this));
  }

  componentWillUnmount() {
    DeviceUserStore.unlisten(this.update.bind(this));
  }

  render() {
    return (
      <div id="knightly-app" className="container-fluid">
        {this.renderUserInfoModal()}

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
          <div className="col-xs-3 right-part">
            <img className="avatar" src={require("../../images/avatars/signed_in_officer.png")} />
            <span className="welcome">
              Welcome,
              <span className="name"> Nancy</span>
            </span>
            <a className="header-button" href="http://www.northeastern.edu/nupd/">
              <div className="glyphicon glyphicon-log-out"></div>
            </a>
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

// Render Helpers

  renderUserInfoModal() {
    let user = DeviceUserStore.getShowMoreInfoUser();

    if (!user) { return null; }

    if (user.contact) {
      var emergencyContact = <div>
        <div className="emergency-contact">Emergency Contact</div>
        <div>{user.contact.name}</div>
        <div>{user.contact.cell}</div>
      </div>
    }

    return (
      <Modal show={true} className="user-info-modal" onHide={this.hideMoreInfo} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>User Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img className="avatar" src={user.avatar} />
          <div className="user-info">
            <div className="user-type">{user.constructor.name}</div>
            <div>{user.name}</div>
            <div>{user.cell}</div>
            <div>{user.school}</div>
            {emergencyContact}
          </div>
          <div className="clearfix"></div>
        </Modal.Body>
      </Modal>
    );
  }

  hideMoreInfo() {
    DeviceUserActions.showMoreInfoFor(null);
  }
}

let routes = (
  <Route name="app" path="/" handler={KnightlyApp}>
    <Route name="feed" handler={Feed} />
    <Route name="incidents" handler={Incidents} />
    <Route name="stats" handler={Stats} />
    <Redirect from="/" to="feed"/>
  </Route>
);

export function initAppView(mountEl, firstTimeCb) {
  firstTimeInitCb = firstTimeCb;

  Router.run(routes, function (Handler) {
    React.render(<Handler/>, mountEl);
  });
}
