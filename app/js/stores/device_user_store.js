import _  from "lodash"
import alt from "../alt"
import DeviceUserActions from "../actions/device_user_actions"

const MAX_SAVED_STUDENTS_TO_STORE = 10;

class DeviceUserStore {
  constructor() {
    this.officers = {};
    this.students = {};

    this.bindListeners({
      handleNewOfficer: DeviceUserActions.NEW_OFFICER,
      handleNewStudent: DeviceUserActions.NEW_STUDENT,
      handleUpdatePos: DeviceUserActions.UPDATE_POS,
      handleStudentIsOkay: [DeviceUserActions.STUDENT_IS_OKAY, DeviceUserActions.OFFICER_RESCUE],
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

  handleUpdatePos(user) {}

  handleStudentIsOkay(student) {
    this.pruneOkayStudents();
  }

// Public Methods

  getOfficers() {
    return this.getState().officers;
  }

  getStudents() {
    return this.getState().students;
  }

// Helper Methods

  pruneOkayStudents() {
    let savedStudents = _(this.students).values().filter((student) => {
      return /(okay|rescued)/.test(student.status);
    }).sortBy("id").value();

    // Remove the old ones first.

    if (savedStudents.length > MAX_SAVED_STUDENTS_TO_STORE) {
      const studentToRemove = _.first(savedStudents);
      delete this.students[studentToRemove.id];
    }
  }

}

export default alt.createStore(DeviceUserStore, "DeviceUserStore");
