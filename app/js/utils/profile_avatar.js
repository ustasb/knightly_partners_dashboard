import _ from "lodash"

var students = [
  { image: require("../../images/avatars/student_1.png"), gender: "female" },
  { image: require("../../images/avatars/student_2.png"), gender: "female" },
  { image: require("../../images/avatars/student_3.png"), gender: "female" },
  { image: require("../../images/avatars/student_4.png"), gender: "female" },
  { image: require("../../images/avatars/student_5.png"), gender: "male" },
  { image: require("../../images/avatars/student_6.png"), gender: "male" },
  { image: require("../../images/avatars/student_7.png"), gender: "male" },
  { image: require("../../images/avatars/student_8.png"), gender: "female" },
  { image: require("../../images/avatars/student_9.png"), gender: "female" },
  { image: require("../../images/avatars/student_10.png"), gender: "female" },
];

var officers = [
  { image: require("../../images/avatars/officer_1.png"), gender: "male" },
  { image: require("../../images/avatars/officer_2.png"), gender: "female" },
];

let officerCounter = 0;
let studentCounter = 0;

export function getStudentAvatar() {
  let avatar = students[studentCounter % students.length];
  studentCounter += 1;
  return avatar;
}

export function getOfficerAvatar() {
  let avatar = officers[officerCounter % officers.length];
  officerCounter += 1;
  return avatar;
}
