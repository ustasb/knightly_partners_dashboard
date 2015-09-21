import _ from "lodash"
import faker from "faker"
import User from "./user"
import { getStudentAvatar } from "../utils/profile_avatar"

const BAD_STUDENT_STATUSES = ["panic", "distress"];

export default class Student extends User {
  constructor() {
    super();

    this.status = _.sample(BAD_STUDENT_STATUSES);
    this.previousPositions = [];

    // Info
    this.contact = this.genNewContact();
    this.avatar = getStudentAvatar();
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

    if (Math.random() > 0.99) {
      this.setStatus("okay");
    }
  }

  genNewContact() {
    return {
      name: faker.name.findName(),
      cell: faker.phone.phoneNumber(),
    };
  }
}
