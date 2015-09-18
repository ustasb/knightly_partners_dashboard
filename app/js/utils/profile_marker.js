const CANVAS_SIZE = 40;
const MARKER_RADIUS = CANVAS_SIZE / 2;
const PROFILE_COLORS = {
  "police": "blue",
  "distress": "orange",
  "panic": "red",
};

let canvas = document.getElementById("profile-marker-drawing-board");
let ctx = canvas.getContext("2d");

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

export function getProfileMarkerImage(id, profileImage, type) {
  let image = new Image();
  const center = CANVAS_SIZE / 2;

  image.src = profileImage; // Base64 only.

  ctx.fillStyle = getColorForProfileType(type);
  ctx.beginPath();
  ctx.arc(center, center, MARKER_RADIUS, 0, 2 * Math.PI);
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.arc(center, center, MARKER_RADIUS * 0.80, 0, 2 * Math.PI);
  ctx.clip();

  ctx.drawImage(image, 0, 0, CANVAS_SIZE, CANVAS_SIZE);

  return canvas.toDataURL();
};

function getColorForProfileType(type) {
  return PROFILE_COLORS[type];
}
