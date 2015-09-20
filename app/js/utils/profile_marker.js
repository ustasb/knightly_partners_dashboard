import _ from "lodash"

const CANVAS_SIZE = 80;

const MARKER_RADIUS = (CANVAS_SIZE / 2) * 0.70; // Make room for the box shadow.

const PROFILE_COLORS = {
  police: "#57D3F1",
  distress: "#F5A623",
  panic: "#D0021B",
  okay: "#2ECC71",
  rescued: "#2ECC71",
};

export default class ProfileMarker {
  constructor() {
    this.canvas = document.getElementById("profile-marker-drawing-board");
    this.ctx = this.canvas.getContext("2d");
    this.cache = {};

    this.canvas.width = CANVAS_SIZE;
    this.canvas.height = CANVAS_SIZE;
  }

  // The demo won't have many profiles. This should suffice for now.
  getProfileMarkerImage(user, profileImage) {
    let color = this.getColorForProfileType(user);
    let cacheKey = `${user.id}-${color}`;

    if (this.cache[cacheKey]) {
      return this.cache[cacheKey];
    } else {
      return this.cache[cacheKey] = this.makeProfileMarkerImage(user, profileImage);
    }
  }

  makeProfileMarkerImage(user, profileImage) {
    let image = new Image();
    const center = CANVAS_SIZE / 2;

    image.src = profileImage; // Base64 only.

    this.ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    this.ctx.save();
    this.ctx.fillStyle = this.getColorForProfileType(user);

    this.ctx.shadowBlur = 6;
    this.ctx.shadowOffsetY = 3;
    this.ctx.shadowColor = "dimgray";

    this.ctx.beginPath();
    this.ctx.arc(center, center, MARKER_RADIUS, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.closePath();

    this.ctx.beginPath();
    this.ctx.arc(center, center, Math.ceil(MARKER_RADIUS * 0.80), 0, 2 * Math.PI);
    this.ctx.clip();

    this.ctx.drawImage(image, 0, 0, CANVAS_SIZE, CANVAS_SIZE);
    this.ctx.restore();

    return this.canvas.toDataURL();
  }

  getColorForProfileType(user) {
    if (user.status) {
      return PROFILE_COLORS[user.status];
    } else {
      return PROFILE_COLORS["police"];
    }
  }
}

ProfileMarker.MARKER_SIZE = CANVAS_SIZE;

