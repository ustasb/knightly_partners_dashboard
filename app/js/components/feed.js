require("../../css/feed.scss");

import React from "react"
import FeedStore from "../stores/feed_store"

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
      return <div key={item.id}>{item.log}</div>;
    });

    return (
      <div id="feed-menu">
        <h3>Live Feed</h3>
        <div className="feed-items">
          {feedItems}
        </div>
      </div>
    );
  }


}
