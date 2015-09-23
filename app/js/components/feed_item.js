import React from "react"
import Map from "../map"
import moment from "moment"

export default class FeedItem extends React.Component {
  render() {
    let className = `feed-item ${this.props.feedItem.type}`;

    return (
      <div className={className} onClick={this.handleClick.bind(this)}>
        <img className="avatar" src={this.props.feedItem.avatar} />
        <div className="log">{this.props.feedItem.log}</div>
        <div className="time-ago">{moment().fromNow(this.props.feedItem.log)}</div>
        <div className="clearfix"></div>
      </div>
    );
  }

  handleClick() {
    let map = Map.getCurrentMap()
    map.setCenter(this.props.feedItem.pos);
    map.setZoom(18);
  }
}

FeedItem.propTypes = {
  feedItem: React.PropTypes.object.isRequired
};
