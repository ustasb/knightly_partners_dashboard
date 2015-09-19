import alt from "../alt"

function log(msg) {
  console.log(msg);
}

class DeviceUserActions {
  newOfficer(officer) {
    log(`officer ${officer.id} is on duty`);
    this.dispatch(officer);
  }

  officerInPursuit(officer, student) {
    log(`officer ${officer.id} is pursuing student ${student.id}`);
  }

  officerOffPursuit(officer, student) {
    log(`officer ${officer.id} is no longer pursuing student ${student.id}`);
  }

  officerRescue(officer, student) {
    log(`officer ${officer.id} rescued student ${student.id}`);
    this.dispatch(student);
  }

  newStudent(student) {
    log(`student ${student.id} has status: ${student.status}`);
    this.dispatch(student);
  }

  studentIsOkay(student) {
    log(`student ${student.id} is now okay`);
    this.dispatch(student);
  }

  updatePos(user) {
    this.dispatch(user);
  }
}

export default alt.createActions(DeviceUserActions);
