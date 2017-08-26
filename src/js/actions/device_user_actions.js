import alt from "../alt"

class DeviceUserActions {
  newOfficer(officer) {
    this.dispatch(officer);
  }

  officerInPursuit(officer, student) {
    this.dispatch({
      officer: officer,
      student: student,
    });
  }

  officerOffPursuit(officer, student) {
    this.dispatch({
      officer: officer,
      student: student,
    });
  }

  officerRescue(officer, student) {
    this.dispatch({
      officer: officer,
      student: student,
    });
  }

  newStudent(student) {
    this.dispatch(student);
  }

  studentIsOkay(student) {
    this.dispatch(student);
  }

  updatePos(user) {
    this.dispatch(user);
  }

  showMoreInfoFor(userId) {
    this.dispatch(userId);
  }
}

export default alt.createActions(DeviceUserActions);
