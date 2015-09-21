import User from "./user"
import { getOfficerAvatar } from "../utils/profile_avatar"

export default class Officer extends User {
  constructor() {
    super();

    this.targetStudent = null;

    // info
    this.avatar = getOfficerAvatar();
  }

  stopPursuing() {
    this.targetStudent = null;
  }

  update(onRescue) {
    if (this.targetStudent) {
      var end = this.targetStudent.pos;
    } else {
      var end = this.end;
    }

    const dist = this.moveTo(end, 0.00005);

    if (dist <= 0.0002) {
      if (this.targetStudent) {
        onRescue(this, this.targetStudent);
        this.stopPursuing();
      }

      this.setNewEndPos();
    }
  }
}
