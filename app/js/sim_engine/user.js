import _ from "lodash"
import faker from "faker"

import { newPos } from "./lat_lngs"

export default class User {
  constructor() {
    this.id = _.parseInt(_.uniqueId());
    this.pos = newPos();
    this.end = newPos();

    // Info
    this.name = faker.name.findName();
    this.cell = faker.phone.phoneNumber();
    this.school = "Northeastern University";
    this.avatar = faker.image.avatar();
  }

  moveTo(newPos, speed = 0.00005) {
    let dx = newPos.lng - this.pos.lng;
    let dy = newPos.lat - this.pos.lat;
    const angle = Math.atan2(dy, dx);

    this.pos.lng += Math.cos(angle) * speed;
    this.pos.lat += Math.sin(angle) * speed;

    // Distance to the newPos.
    dx = newPos.lng - this.pos.lng;
    dy = newPos.lat - this.pos.lat;
    return Math.sqrt(dx * dx + dy * dy);
  }

  setNewEndPos() {
    this.end = newPos();
  }
}
