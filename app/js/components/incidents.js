require("../../css/incidents.scss");

import _ from "lodash"
import React from "react"
import FeedItem from "./feed_item"
import DeviceUserStore from "../stores/device_user_store"

export default class Incidents extends React.Component {
  onChange() {
    this.forceUpdate();
  }

  componentWillMount() {
    DeviceUserStore.listen(this.onChange.bind(this));
  }

  componentWillUnmount() {
    DeviceUserStore.unlisten(this.onChange.bind(this));
  }

  render() {
    let panicked = this.renderInPanic();
    let uncomfortable = this.renderUncomfortable();
    let okay = this.renderIsOkay();

    if (!panicked && !uncomfortable && !okay) {
      okay = <div className="all-safe">There are no incidents right now. Everyone's safe!</div>;
    }

    return (
      <div id="incidents-menu" className="row">
        {panicked}
        {uncomfortable}
        {okay}
      </div>
    );
  }

  renderInPanic() {
    let panicked = DeviceUserStore.getPanickedStudents();

    if (panicked.length === 0) {
      return null;
    }

    return (
      <div>
        <h3>In Panic</h3>
        {this.renderFeedItems(panicked)}
      </div>
    );
  }

  renderUncomfortable() {
    let uncomfortable = DeviceUserStore.getUncomfortableStudents();

    if (uncomfortable.length === 0) {
      return null;
    }

    return (
      <div>
        <h3>Uncomfortable</h3>
        {this.renderFeedItems(uncomfortable)}
      </div>
    );
  }

  renderIsOkay() {
    let okay = DeviceUserStore.getOkayStudents();

    if (okay.length === 0) {
      return null;
    }

    return (
      <div>
        <h3>Resolved</h3>
        {this.renderFeedItems(okay)}
      </div>
    );
  }

  renderFeedItems(students) {
    let feedItems =  _.map(students, (student) => {

      let feedItem = {
        log: student.name,
        time: _.now(),
        avatar: student.avatar,
        type: student.status,
        pos: student.pos,
      };

      return <FeedItem key={student.id} feedItem={feedItem} />;
    });

    return <div className="feed-items">{feedItems}</div>;
  }
}
