require("../css/app.scss");

import View from "./view"
import SimulationEngine from "./sim_engine/engine"
import DeviceUserActions from "./actions/device_user_actions"
import DeviceUserStore from "./stores/device_user_store"

View.init();

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
    console.log(DeviceUserStore.getOfficers());
    console.log(DeviceUserStore.getStudents());
  }
});

engine.start();
