require("../css/app.scss");

import View from "./view"
import SimulationEngine from "./sim_engine/engine"
import Map from "./map"
import MapStyles from "./utils/map_styles"
import DeviceUserActions from "./actions/device_user_actions"
import DeviceUserStore from "./stores/device_user_store"

View.init();

let map = new Map("map-container", {
  center: SimulationEngine.CENTER_POS,
  zoom: 17,
  styles: MapStyles
});

DeviceUserStore.listen(map.render.bind(map));

let engine = new SimulationEngine({
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

engine.start();
