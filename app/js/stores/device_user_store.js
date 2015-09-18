import alt from "../alt"
import DeviceUserActions from "../actions/device_user_actions"

class DeviceUserStore {
  constructor() {
    this.officers = {};
    this.students = {};

    this.bindListeners({
      handleNewOfficer: DeviceUserActions.NEW_OFFICER,
      handleNewStudent: DeviceUserActions.NEW_STUDENT,
      handleUpdatePos: DeviceUserActions.UPDATE_POS,
      handleStudentIsOkay: DeviceUserActions.STUDENT_IS_OKAY,
    });

    this.exportPublicMethods({
      getOfficers: this.getOfficers,
      getStudents: this.getStudents,
    });
  }

  // Action Handlers

  handleNewOfficer(officer) {
    this.officers[officer.id] = officer;
  }

  handleNewStudent(student) {
    this.students[student.id] = student;
  }

  handleUpdatePos(user) {
    return true; // Emit that user position has changed.
  }

  handleStudentIsOkay(student) {
    return true;
  }

  // Public Methods

  getOfficers() {
    return this.getState().officers;
  }

  getStudents() {
    return this.getState().students;
  }
}

export default alt.createStore(DeviceUserStore, "DeviceUserStore");
