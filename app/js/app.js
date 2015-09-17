import SimulationEngine from "./sim_engine/engine"

require("../css/app.scss");

let engine = new SimulationEngine({
  officerOnDuty: (officer) => {
    console.log(`officer ${officer.id} is on duty`);
  },
  officerInPursuit: (officer, student) => {
    console.log(`officer ${officer.id} is pursuing student ${student.id}`);
  },
  officerOffPursuit: (officer, student) => {
    console.log(`officer ${officer.id} is no longer pursuing student ${student.id}`);
  },
  officerRescue: (officer, student) => {
    console.log(`officer ${officer.id} rescued student ${student.id}`);
  },
  newStudent: (student) => {
    console.log(`student ${student.id} has status: ${student.status}`);
  },
  studentIsOkay: (student) => {
    console.log(`student ${student.id} is now okay`);
  },
  updatePos: (user) => { }
});

engine.start();
