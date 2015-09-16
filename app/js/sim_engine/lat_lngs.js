import _ from "lodash"

const LOCATIONS = [
  { lat: 42.339110, lng: -71.092422 },
  { lat: 42.340449, lng: -71.088954 },
  { lat: 42.342851, lng: -71.085099 },
  { lat: 42.342623, lng: -71.090277 },
  { lat: 42.343222, lng: -71.093078 },
  { lat: 42.337362, lng: -71.091035 },
  { lat: 42.339262, lng: -71.083365 },
  { lat: 42.337179, lng: -71.086692 },
];

export function newPos() {
  return _.sample(LOCATIONS);
}
