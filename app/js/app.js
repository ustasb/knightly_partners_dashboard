require("../css/app.scss");

import $ from "jquery"
import React from "react"

import { initAppView } from "./components/knightly_app"
import SimulationEngine from "./sim_engine/engine"
import Map from "./map"
import MapStyles from "./utils/map_styles"
import DeviceUserActions from "./actions/device_user_actions"
import DeviceUserStore from "./stores/device_user_store"

initAppView(document.getElementById("app"), initApp);

function initApp() {
  let map = mapInit();
  let engine = initEngine();

  DeviceUserStore.listen(map.render.bind(map));

  initDemoControls(engine);

  engine.start();
}

function initEngine() {
  return new SimulationEngine({
    newOfficer: (officer) => {
      DeviceUserActions.newOfficer(officer);
    },
    officerInPursuit: (officer, student) => {
      DeviceUserActions.officerInPursuit(officer, student);
    },
    officerOffPursuit: (officer, student) => {
      DeviceUserActions.officerOffPursuit(officer, student);
    },
    officerRescue: (officer, student) => {
      DeviceUserActions.officerRescue(officer, student);
    },
    newStudent: (student) => {
      DeviceUserActions.newStudent(student);
    },
    studentIsOkay: (student) => {
      DeviceUserActions.studentIsOkay(student);
    },
    updatePos: (user) => {
      DeviceUserActions.updatePos(user);
    }
  });
}

function mapInit() {
  return new Map("map-container", {
    center: SimulationEngine.CENTER_POS,
    zoom: 17,
    styles: MapStyles,
    disableDefaultUI: true,
    zoomControl: true,
    scaleControl: true,
    onMarkerClick: DeviceUserActions.showMoreInfoFor
  });
}

function initDemoControls(engine) {
  let prevUpdateDelay = null;
  let fired = false;

  const SPACE_KEY = 32;
  const S_KEY = 83;

  $(window).keydown((e) => {
    if (fired) return;

    switch(e.keyCode) {
      case SPACE_KEY:
        prevUpdateDelay = engine.updateDelayMs;
        engine.updateDelayMs = 30;
        break;
      case S_KEY:
        if (engine.running) {
          engine.stop();
        } else {
          engine.start();
        }
        break;
    }

    fired = true;
  }).keyup((e) => {
    switch(e.keyCode) {
      case SPACE_KEY:
        engine.updateDelayMs = prevUpdateDelay;
        break;
    }

    fired = false;
  });
}
