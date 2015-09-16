import _ from "lodash"
import User from "./user"

const BAD_STUDENT_STATUSES = ["panic", "distress"];

export default class Student extends User {
  constructor() {
    super();

    this.status = _.sample(BAD_STUDENT_STATUSES);
    this.previousPositions = [];
  }

  isOkay() {
    return this.status == "okay";
  }

  setStatus(status) {
    this.status = status;
  }

  update() {
    this.previousPositions.push(_.clone(this.pos));

    const dist = this.moveTo(this.end);

    if (dist <= 0.0001) {
      this.setNewEndPos();
    }

    if (Math.random() > 0.95) {
      this.setStatus("okay");
    }
  }
}
