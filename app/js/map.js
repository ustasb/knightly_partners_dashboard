import _ from "lodash"
import DeviceUserStore from "./stores/device_user_store"

export default class Map {
  constructor(domId, opts) {
    this.map = new google.maps.Map(document.getElementById(domId), opts);
    this.markers = {};
  }

  render() {
    const students = DeviceUserStore.getStudents();
    const officers = DeviceUserStore.getOfficers();

    _.each(students, (student) => {
      this.createOrMoveMarker(student)

    });

    _.each(officers, (officer) => {
      this.createOrMoveMarker(officer)
    });
  }

  createOrMoveMarker(user) {
    let marker = this.markers[user.id];

    if (marker) {
      let latLng = new google.maps.LatLng(user.pos.lat, user.pos.lng);
      marker.setPosition(latLng);
    } else {
      this.markers[user.id] = new google.maps.Marker({
        map: this.map,
        position: user.pos,
      });
    }
  }
}


