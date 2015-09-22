require("../../css/feed.scss");

import React from "react"
import FeedStore from "../stores/feed_store"
import moment from "moment"

class FeedItem extends React.Component {
  render() {
    let className = `feed-item ${this.props.feedItem.type}`;

    return (
      <div className={className}>
        <img className="avatar" src={this.props.feedItem.avatar} />
        <div className="log">{this.props.feedItem.log}</div>
        <div className="time-ago">{moment().fromNow(this.props.feedItem.log)}</div>
        <div className="clearfix"></div>
      </div>
    );
  }
}

FeedItem.propTypes = {
  feedItem: React.PropTypes.object.isRequired
};

export default class Feed extends React.Component {
  update() {
    this.forceUpdate();
  }

  componentWillMount() {
    FeedStore.listen(this.update.bind(this));
  }

  componentWillUnmount() {
    FeedStore.unlisten(this.update.bind(this));
  }

  render() {
    var feedItems = FeedStore.getFeedItems();

    feedItems = _.map(feedItems, (item) => {
      return <FeedItem key={item.id} feedItem={item} />;
    });

    return (
      <div id="feed-menu" className="row">
        <h3>Live Feed</h3>
        <div className="feed-items">
          {feedItems}
        </div>
      </div>
    );
  }
}
