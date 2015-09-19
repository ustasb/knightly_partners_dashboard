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

let canvas = document.getElementById("profile-marker-drawing-board");
let ctx = canvas.getContext("2d");

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

let cache = {};
const MAX_CACHE_SIZE = 50;

export function getProfileMarkerImage(user, profileImage) {
  let color = getColorForProfileType(user);
  let cacheKey = `${user.id}-${color}`;

  if (cache[cacheKey]) {
    return cache[cacheKey];
  } else {
    let keys = Object.keys(cache);

    // Don't let the cache get too big. Cut it in half when it does.
    if (keys.length > MAX_CACHE_SIZE) {
      keys = keys.sort();
      cache = _.omit(cache, ..._.take(keys, Math.ceil(MAX_CACHE_SIZE / 2)));
    }

    return cache[cacheKey] = makeProfileMarkerImage(user, profileImage);
  }
}

function makeProfileMarkerImage(user, profileImage) {
  let image = new Image();
  const center = CANVAS_SIZE / 2;

  image.src = profileImage; // Base64 only.

  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

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
