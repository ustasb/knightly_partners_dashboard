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
    this.addNewEvent(log);
  }

  handleNewStudent(student) {
    let log = `${student.name} is in ${student.status}!`;
    this.addNewEvent(log);
  }

  handleOfficerInPursuit(data) {
    let log = `Officer ${data.officer.name} is pursuing ${data.student.name}.`;
    this.addNewEvent(log);
  }

  handleOfficerOffPursuit(data) {
    let log = `Officer ${data.officer.name} is no longer pursuing ${data.student.name}.`;
    this.addNewEvent(log);
  }

  handleOfficerRescue(data) {
    let log = `Officer ${data.officer.name} rescued ${data.student.name}!`;
    this.addNewEvent(log);
  }

  handleStudentIsOkay(student) {
    let log = `${student.name} is now okay!`;
    this.addNewEvent(log);
  }

// Public Methods

  getFeedItems() {
    return this.getState().feedItems;
  }

// Helper Methods

  addNewEvent(log) {
    var event = {
      id: this.eventIdCounter++,
      log: log,
      time: _.now(),
    };

    this.feedItems.push(event);

    if (this.feedItems.length > 50) {
      this.feedItems.shift();
    }
  }
}

export default alt.createStore(FeedStore, "FeedStore");
