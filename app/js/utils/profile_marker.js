const CANVAS_SIZE = 80;
const MARKER_RADIUS = (CANVAS_SIZE / 2) * 0.70; // Make room for the box shadow.
const PROFILE_COLORS = {
  "police": "blue",
  "distress": "orange",
  "panic": "red",
  "okay": "green",
};

let canvas = document.getElementById("profile-marker-drawing-board");
let ctx = canvas.getContext("2d");

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

export function getProfileMarkerImage(user, profileImage) {
  let image = new Image();
  const center = CANVAS_SIZE / 2;

  image.src = profileImage; // Base64 only.

  ctx.save();
  ctx.fillStyle = getColorForProfileType(user);

  ctx.shadowBlur = 6;
  ctx.shadowOffsetY = 3;
  ctx.shadowColor = "dimgray";

  ctx.beginPath();
  ctx.arc(center, center, MARKER_RADIUS, 0, 2 * Math.PI);
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.arc(center, center, Math.ceil(MARKER_RADIUS * 0.80), 0, 2 * Math.PI);
  ctx.clip();

  ctx.drawImage(image, 0, 0, CANVAS_SIZE, CANVAS_SIZE);
  ctx.restore();

  return canvas.toDataURL();
};

function getColorForProfileType(user) {
  if (user.status) {
    return PROFILE_COLORS[user.status];
  } else {
    return PROFILE_COLORS["police"];
  }
}
