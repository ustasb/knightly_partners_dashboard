import _ from "lodash";
import Student from "./student"
import Officer from "./officer"

const EVENTS = {
  officerOnDuty: (officer) => {},
  officerInPursuit: (officer, student) => {},
  officerOffPursuit: (officer, student) => {},
  officerRescue: (officer, student) => {},
  newStudent: (student) => {},
  studentIsOkay: (student) => {},
};

export default class SimulationEngine {
  constructor(eventCbs = {}) {
    this.maxStudents = 2;
    this.maxOfficers = 2;
    this.updateDelayMs = 2000;

    this.eventCbs = _.merge(_.clone(EVENTS), eventCbs);

    this.running = false;
    this.students = [];
    this.officers = [];
  }

  rescueStudent(officer, student) {
    student.setStatus("rescued");
    _.pull(this.students, student);
    this.eventCbs.officerRescue(officer, student);
  }

  updateOfficers() {
    _.each(this.officers, (officer) => {
      if (!officer.targetStudent) {
        // Get a student not currently being pursued.
        officer.targetStudent = _.sample(_.difference(
          this.students,
          _.compact(_.map(this.officers, (officer) => { return officer.targetStudent; }))
        ));

        if (officer.targetStudent) {
          this.eventCbs.officerInPursuit(officer, officer.targetStudent);
        }
      }

      officer.update(this.rescueStudent.bind(this));
    });
  }

  updateStudents() {
    _.eachRight(this.students, (student) => {
      if (student.isOkay()) {
        _.pull(this.students, student);
        this.eventCbs.studentIsOkay(student);

        let officer = _.find(this.officers, (officer) => { return officer.targetStudent === student; });
        if (officer) {
          this.eventCbs.officerOffPursuit(officer, officer.targetStudent);
          officer.stopPursuing();
        }
      } else {
        student.update();
      }
    });
  }

  update() {
    if (this.officers.length < this.maxOfficers) {
      let officer = new Officer()
      this.officers.push(officer);
      this.eventCbs.officerOnDuty(officer);
    }

    if (this.students.length < this.maxStudents) {
      let student = new Student();
      this.students.push(student);
      this.eventCbs.newStudent(student);
    }

    this.updateOfficers();
    this.updateStudents();
  }

  tick() {
    if (!this.running) return;
    this.update();
    setTimeout(this.tick.bind(this), this.updateDelayMs);
  }

  start() {
    this.running = true;
    this.tick();
  }

  stop() {
    this.running = false;
  }
}
