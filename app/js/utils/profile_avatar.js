import _ from "lodash"

var students = [
  require("../../images/avatars/student_1.png"),
  require("../../images/avatars/student_2.png"),
  require("../../images/avatars/student_3.png"),
  require("../../images/avatars/student_4.png"),
  require("../../images/avatars/student_5.png"),
  require("../../images/avatars/student_6.png"),
  require("../../images/avatars/student_7.png"),
  require("../../images/avatars/student_8.png"),
  require("../../images/avatars/student_9.png"),
  require("../../images/avatars/student_10.png"),
];

var officers = [
  require("../../images/avatars/officer_1.png"),
  require("../../images/avatars/officer_2.png"),
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
