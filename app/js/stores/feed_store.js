import _  from "lodash"
import alt from "../alt"
import DeviceUserActions from "../actions/device_user_actions"

const MAX_FEED_ITEMS = 50;

class FeedStore {
  constructor() {
    this.eventIdCounter = 0;
    this.feedItems = [];

    this.bindListeners({
      handleNewOfficer: DeviceUserActions.NEW_OFFICER,
      handleNewStudent: DeviceUserActions.NEW_STUDENT,
      handleOfficerInPursuit: DeviceUserActions.OFFICER_IN_PURSUIT,
      handleOfficerOffPursuit: DeviceUserActions.OFFICER_OFF_PURSUIT,
      handleOfficerRescue: DeviceUserActions.OFFICER_RESCUE,
      handleStudentIsOkay: DeviceUserActions.STUDENT_IS_OKAY,
    });

    this.exportPublicMethods({
      getFeedItems: this.getFeedItems,
    });
  }

  // Action Handlers

  handleNewOfficer(officer) {
    let log = `${officer.name} is on duty.`;
    this.addNewEvent(log, officer.pos, officer.avatar, "officer");
  }

  handleNewStudent(student) {
    let log = `${student.name} is in ${student.status}!`;
    this.addNewEvent(log, student.pos, student.avatar, student.status);
  }

  handleOfficerInPursuit(data) {
    let log = `Officer ${data.officer.name} is pursuing ${data.student.name}.`;
    this.addNewEvent(log, data.officer.pos, data.officer.avatar, data.student.status);
  }

  handleOfficerOffPursuit(data) {
    let log = `Officer ${data.officer.name} is no longer pursuing ${data.student.name}.`;
    this.addNewEvent(log, data.officer.pos, data.officer.avatar, "officer");
  }

  handleOfficerRescue(data) {
    let log = `Officer ${data.officer.name} rescued ${data.student.name}!`;
    this.addNewEvent(log, data.officer.pos, data.officer.avatar, "okay");
  }

  handleStudentIsOkay(student) {
    let log = `${student.name} is now okay!`;
    this.addNewEvent(log, student.pos, student.avatar, "okay");
  }

// Public Methods

  getFeedItems() {
    return this.getState().feedItems;
  }

// Helper Methods

  addNewEvent(log, pos, avatar, type="") {
    var event = {
      id: this.eventIdCounter++,
      log: log,
      time: _.now(),
      avatar: avatar,
      type: type,
      pos: pos,
    };

    this.feedItems.unshift(event);

    if (this.feedItems.length > 50) {
      this.feedItems.pop();
    }
  }
}

export default alt.createStore(FeedStore, "FeedStore");
