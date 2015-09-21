import _ from "lodash"
import DeviceUserStore from "./stores/device_user_store"
import ProfileMarker from "./utils/profile_marker"

export default class Map {
  constructor(domId, opts) {
    this.map = new google.maps.Map(document.getElementById(domId), opts);
    this.markerCreator = new ProfileMarker();
    this.markers = {};
    this.trailMarkers = {};
    this.pursuingLines = [];
    this.onMarkerClick = opts.onMarkerClick;
    this.previousTrailMarkers = [];
  }

  render() {
    const students = DeviceUserStore.getStudents();
    const officers = DeviceUserStore.getOfficers();

    this.updatedMarkers = [];

    _.each(students, (student) => {
      this.createOrMoveMarker(student)
      this.renderTrail(student);
    });

    _.each(officers, (officer) => {
      this.createOrMoveMarker(officer)
    });

    this.drawPursuingLines(officers);
    this.removeStaleMarkers();
  }

  createOrMoveMarker(user) {
    let marker = this.markers[user.id];

    if (marker) {
      let latLng = new google.maps.LatLng(user.pos.lat, user.pos.lng);
      marker.setPosition(latLng);
    } else {
      marker = this.markers[user.id] = new google.maps.Marker({
        map: this.map,
        position: user.pos,
      });

      // Officer icons should sit above the rest.
      if (user.constructor.name === "Officer") {
        marker.setZIndex(1000 + user.id);
      }

      marker.addListener('click', (e) => {
        this.onMarkerClick(user.id);
      });
    }

    this.markerCreator.getProfileMarkerImage(user, (icon) => {
      if (marker.getIcon() === icon) return;

      let markerCenter = ProfileMarker.MARKER_SIZE / 2;

      marker.setIcon({
        url: icon,
        anchor: new google.maps.Point(markerCenter, markerCenter),
      });
    });

    this.updatedMarkers.push(user.id);
  }

  removeStaleMarkers() {
    const staleMarkersKeys = _.difference(_.map(_.keys(this.markers), _.parseInt), this.updatedMarkers);

    _.each(staleMarkersKeys, (key) => {
      this.markers[key].setMap(null);
      delete this.markers[key];

      let trailMarkers = this.trailMarkers[key];
      if (trailMarkers) {
        _.each(trailMarkers, (marker) => { marker.setMap(null); });
        delete this.trailMarkers[key];
      }
    });
  }

  drawPursuingLines(officers) {
    _.each(this.pursuingLines, (line) => {
      line.setMap(null);
    });

    this.pursuingLines = [];

    _.each(officers, (officer) => {
      if (!officer.targetStudent) { return; }

      let outterLine = new google.maps.Polyline({
        map: this.map,
        path: [officer.pos, officer.targetStudent.pos],
        strokeColor: this.markerCreator.getColorForProfileType(officer.targetStudent),
        strokeWeight: 7,
      });

      let innerLine = new google.maps.Polyline({
        map: this.map,
        path: [officer.pos, officer.targetStudent.pos],
        strokeColor: this.markerCreator.getColorForProfileType(officer),
        strokeWeight: 4,
      });

      this.pursuingLines.push(outterLine);
      this.pursuingLines.push(innerLine);
    });
  }

  renderTrail(student) {
    let len = student.previousPositions.length;

    if (len % 5 === 0) {
      let pos = student.previousPositions[len - 1];
      let color = this.markerCreator.getColorForProfileType(student);

      let marker = new google.maps.Circle({
        map: this.map,
        center: pos,
        radius: 5,
        strokeOpacity: 0.8,
        strokeWeight: 1.5,
        fillColor: color,
        fillOpacity: 1,
      });

      if (!this.trailMarkers[student.id]) {
        this.trailMarkers[student.id] = [];
      }

      this.trailMarkers[student.id].push(marker);
    }
  }
}
