import _  from "lodash"
import alt from "../alt"
import DeviceUserActions from "../actions/device_user_actions"

const MAX_SAVED_STUDENTS_TO_STORE = 5;

class DeviceUserStore {
  constructor() {
    this.officers = {};
    this.students = {};
    this.showMoreInfoUserId = null;

    this.bindListeners({
      handleNewOfficer: DeviceUserActions.NEW_OFFICER,
      handleNewStudent: DeviceUserActions.NEW_STUDENT,
      handleUpdatePos: DeviceUserActions.UPDATE_POS,
      handleStudentIsOkay: [DeviceUserActions.STUDENT_IS_OKAY, DeviceUserActions.OFFICER_RESCUE],
      handleShowMoreInfo: DeviceUserActions.SHOW_MORE_INFO_FOR,
    });

    this.exportPublicMethods({
      getOfficers: this.getOfficers,
      getStudents: this.getStudents,
      getShowMoreInfoUser: this.getShowMoreInfoUser,
      getUserForId: this.getUserForId,
      getPanickedStudents: this.getPanickedStudents,
      getUncomfortableStudents: this.getUncomfortableStudents,
      getOkayStudents: this.getOkayStudents,
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

  handleShowMoreInfo(userId) {
    this.showMoreInfoUserId = userId;
  }

// Public Methods

  getOfficers() {
    return this.getState().officers;
  }

  getStudents() {
    return this.getState().students;
  }

  getShowMoreInfoUser() {
    return this.getUserForId(this.getState().showMoreInfoUserId);
  }

  getUserForId(userId) {
    return _.find(this.getStudents(), { id: userId }) ||
           _.find(this.getOfficers(), { id: userId });
  }

  getPanickedStudents() {
    return _.filter(this.getStudents(), (student) => {
      return student.status === "panic";
    });
  }

  getUncomfortableStudents() {
    return _.filter(this.getStudents(), (student) => {
      return student.status === "uncomfortable";
    });
  }

  getOkayStudents() {
    return _.filter(this.getStudents(), (student) => {
      return /(okay|rescued)/.test(student.status);
    });
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
