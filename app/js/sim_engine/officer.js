import User from "./user"

export default class Officer extends User {
  constructor() {
    super();

    this.targetStudent = null;
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

    const dist = this.moveTo(end, 0.0001);

    if (dist <= 0.0002) {
      if (this.targetStudent) {
        onRescue(this, this.targetStudent);
        this.stopPursuing();
      }

      this.setNewEndPos();
    }
  }
}
